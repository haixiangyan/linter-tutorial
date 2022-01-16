# LintStaged x TSC

我相信大多数人是不太了解 `tsc`。`tsc` 本身是一个编译工具，它主要工作是将 `.ts` 转换为 `.js` 文件，但是大多数项目在打包时都会用 `babel` 来处理了，所以也就没 `tsc` 什么事了，大家也很少会用到。

回到我们项目，刚刚的配置为什么有问题呢？

```js
module.exports = {
  '**/*.{ts,tsx}': [
    "tsc", // 检查 TypeScript
    "prettier --write",
    "eslint --cache --fix --rule 'prettier/prettier: off'",
  ],
  '**/*.{js,jsx}': [
    "prettier --write",
    "eslint --cache --fix --rule 'prettier/prettier: off'",
  ],
  "**/*.vue": [
    "prettier --write",
    "eslint --cache --fix --rule 'prettier/prettier: off'",
  ],
  "**/*.{css,less}": [
    "stylelint --cache --fix",
  ]
}
```

## tsc 的参数

这里单单一个 `tsc` 是不够的，因为我们需要的是只检查类型，但不输出，所以要加一个 `--noEmit` 参数，同时也不要去检查 node_modules 里的类型，要加 `--skipLibCheck` 参数。完整的命令为 `tsc --noEmit --skipLibCheck`。

```js
module.exports = {
  '**/*.{ts,tsx}': [
    "tsc --noEmit --skipLibCheck", // 检查 TypeScript
    "prettier --write",
    "eslint --cache --fix --rule 'prettier/prettier: off'",
  ],
  ...
}
```

但是如果我们有这样的 `.ts` 文件：

```ts
// messyTS.ts
const hello: Hello = {
  name: 'hi'
}
```

以及对应的 `.d.ts` 类型声明文件：

```ts
// messyTypes.d.ts
interface Hello {
  name: string;
}
```

然后我们 **只在 `messyTS.ts` 做了改动并提交，** 这条命令在 `lint-staged` 调用时会报下面的错误：

![](https://img-blog.csdnimg.cn/img_convert/44ec76dc2bb67f064fd94d86a5950071.png)

报错里说的是找不到 `Hello` 这个 interface。但是我们在写项目的时候，IDE 都会自动找到这个类型声明文件的呀，为什么这样就不行了呢？

这是因为 IDE 会自动读取读 `tsconfig.json` 文件，而这里 `tsc` 命令没有读取 `tsconfig.json` 导致找不到 `Hello` 这个 interface。那么，很自然我们就会想是否可以 `tsc -p tsconfig.json --noEmit --skipLibCheck` 这样写呢？**抱歉，依然报错：**

![](https://img-blog.csdnimg.cn/img_convert/00f9ad77cfc42931e38f1b4cdf4df040.png)

**他奶奶地！为什么会报错？！**

![](https://img-blog.csdnimg.cn/img_convert/48dbfd9b9eb7a53a5e06f042b1957a4e.png)

这是因为 `tsc` 只有两种调用方式：

* `tsc -p tsconfig.json`：直接加载 `tsconfig.json` 时，会编译 `tsconfig.json` 里 `include` 的文件
* `tsc xxx.ts`：直接编译命令行里写的 TS 文件，但是会自动忽略 `tsconfig.json`

**这里因为 `lint-staged` 会把提交的文件作为参数传给 `tsc` 命令，实际执行的命令是 `tsc xxx.ts -p tsconfig.json --noEmit --skipLibCheck`，所以就会出现又要加载 `tsconfig.json` 编译 `include` 的 TS 文件，又要单独编译 `**/*.ts` 的文件，`tsc` 就蒙圈了。**

这个问题也在 `lint-staged` 的 [这个 Issue: Allow tsconfig.json when input files are specified](https://github.com/microsoft/TypeScript/issues/27379 "lint-staged 中使用 tsc 的问题") 中有提到。里面对如何解决这样的冲突讨论的非常激烈。其中有一位大哥想了一个方法：**我把 tsconfig.json 的 JSON 拿出来，再把里面的 key-value 对转化成 --xxx 的 bash 参数不就算加载了 tsconfig.json 了么？最后，他造了一个轮子 [tsc-files](https://github.com/gustavopch/tsc-files#readme)。**

## tsc-files 的问题

然而问题依然存在，因为我们一般在 `tsconfig.json` 里都会把 `src` 放在 `include` 里：

```json
{
  "include": ["src"],
  "exclude": ["node_modules"]
}
```

**这样一来，运行 `tsc-files --noEmit` 就会扫描整个 `src` 的 `.ts` 文件，无法达到 `lint-staged` 的目的了。**

所以 `tsc-files` 在 `v1.1.3` 这个版本会把 `include` 设置成空数组 `[]`，然后把 `lint-staged` 的文件放在 `files: ["xxx.ts"]`。

但是这又回到刚刚无法检测 `messyTypes.d.ts` 里 `Hello` interface 的问题，因为 `messyTypes.d.ts` 没有被放到 `files` 中：

![](https://img-blog.csdnimg.cn/img_convert/44ec76dc2bb67f064fd94d86a5950071.png)

这个问题在 [这个 Issue: Current version incorrectly analyzes @types/node](https://github.com/gustavopch/tsc-files/issues/20 "tsc-files 问题") 中又又又被疯狂讨论。
里面提出了一个想法：把 `typeRoots` 的路径放到 `include` 里，这样就可以用 `typeRoots` 自定义类型声明文件的路径来检测所有的 `.d.ts` 了，但是这还是有问题，具体看下面这段：

![这两段是该 Issue 的讨论核心](https://img-blog.csdnimg.cn/img_convert/27e855e1349058d32f258d3447d733ff.png)

> deanolium 的观点是：如果把 `typeRoots` 放在 `include` 里，我们不能保证所有人都会用 `tsconfig.json` 里的 `typeRoots`，因为不是所有人都是配置大神。
> 如果要在 `typeRoots` 里写自定义类型声明文件目录，那就要手动加上 `./node_modules/@types` 目录，不然不会自动 import node_modules 里的 `.d.ts`。
> 而且如果大家不了解 `tsc-files` 的原理和实现，根本就不知道有这个坑。`tsc-files` 升级版本后还需要用户手动去改 `tsconfig.json` 并不是一个好的实践。

> gustavopch（作者）的观点是：一方面使用 `tsc-files` 时不应该加上所有的文件，因为这会扫描整个项目，就违反 `lint-staged` 使用的初衷了。
> 另一方面就算 `include` 里能读取 `typeRoots` 目录也不能保证能自动检测到所有类型，因为有的人可能会在 `.ts` 也用 `declare` 来定义，也会有坑。

累了，毁灭吧。

![](https://img-blog.csdnimg.cn/d143f175e1664f23995869564ba56a96.png)

## 最终方案

总的来说，要么扫描 `src` 里的所有 `.ts` 做类型检查，要么只扫描 Git 提交的文件，但是会报找不到类型的错误。

最终，有一位大哥提供了一种思路：**可以不用 `tsc-files`，用 `tsc` ，不过需要把你自己写的 `.d.ts` 放到路径里。**

![](https://img-blog.csdnimg.cn/img_convert/e3538347b02c3f75b11d6f8c54a31552.png)

**个人觉得这个方案应该是目前最好的解决方案了，虽然也是做了妥协，但是这可以让开发者很清楚地知道每次要扫哪些 `.d.ts`，
不会遇到 "都配置了，但为什么没扫到" 的问题，也减少一些 "黑盒" 的坑。**

在此方案基础上，我们可以加一个数组来维护项目里的 `.d.ts` 文件：

```js
const declarationFiles = [
  './src/messyTypesInfo.d.ts'
]

module.exports = {
  '**/*.{ts,tsx}': [
    (filenames) => {
      const files = [...filenames, ...declarationFiles];
      return `tsc ${files.join(' ')} --noEmit --skipLibCheck`;
    },
    "prettier --write",
    "eslint --cache --fix --rule 'prettier/prettier: off'",
  ],
  '**/*.{js,jsx}': [
    "eslint --cache --fix",
  ],
  "**/*.vue": [
    "eslint --cache --fix",
  ],
  "**/*.{css,less}": [
    "stylelint --cache --fix",
  ]
}
```

或者用 `fs` 模块来读取项目中 `./src/typings` 下的所有 `.d.ts` 声明文件，然后再放到命令中。

## 结语

OK，终于大功告成了！这是我写的第二本小书，前一本是 [一天学习一个 npm 轮子](https://github.com/haixiangyan/one-day-one-npm-lib)，有兴趣可以看看，海怪又完成了一个小目标。

**如果喜欢我的文章，也可以关注【写代码的海怪】，每周周五准时更新技术文章，不会太干也不会太水，纯属和朋友聊天。**

<img src="https://img-blog.csdnimg.cn/6ce461cc24c44ca58c698722d6549fe5.gif#pic_center" alt="公众号" width="500" >
