# LintStaged x TSC

我相信大多数人是不太了解 `tsc`。`tsc` 本身是一个编译工具，它主要工作是将 `.ts` 转换为 `.js` 文件，但是大多数项目在打包时都会用 `babel` 来处理了，所以也就没 `tsc` 什么事了，大家也很少会用到。

回到我们项目，刚刚的配置为什么有问题呢？

```js
module.exports = {
  '**/*.{ts,tsx}': [
    "tsc", // 检查 TypeScript
    "eslint --cache --fix",
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

## tsc 的参数

这里单单一个 `tsc` 是不够的，因为我们需要的是只检查类型，但不输出，所以要加一个 `--noEmit` 参数，同时也不要去检查 node_modules 里的类型，要加 `--skipLibCheck` 参数。完整的命令为 `tsc --noEmit --skipLibCheck`。

```js
module.exports = {
  '**/*.{ts,tsx}': [
    "tsc --noEmit --skipLibCheck", // 检查 TypeScript
    "eslint --cache --fix",
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

![](https://files.mdnice.com/user/24913/9dbc7a42-bde4-4672-910a-1e2973b05545.png)

报错里说的是找不到 `Hello` 这个 interface。但是我们在写项目的时候，IDE 都会自动找到这个类型声明文件的呀，为什么这样就不行了呢？

这是因为 IDE 会自动读取读 `tsconfig.json` 文件，而这里 `tsc` 命令没有读取 `tsconfig.json` 导致找不到 `Hello` 这个 interface。那么，很自然我们就会想是否可以 `tsc -p tsconfig.json --noEmit --skipLibCheck` 这样写呢？**抱歉，依然报错：**

![](https://files.mdnice.com/user/24913/ed8e301c-5cf6-4c79-aaf5-10a2bb27623a.png)

**他奶奶地！为什么会报错？！**

![](https://files.mdnice.com/user/24913/2d0e0fb2-9a4f-4a39-955b-77fa33150b7e.png)

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

![](https://files.mdnice.com/user/24913/9dbc7a42-bde4-4672-910a-1e2973b05545.png)

这个问题在 [这个 Issue: Current version incorrectly analyzes @types/node](https://github.com/gustavopch/tsc-files/issues/20 "tsc-files 问题") 中又又又被疯狂讨论。

![这两段是该 Issue 的讨论核心](https://files.mdnice.com/user/24913/ff67e608-a930-4da8-8c17-f71088f8ef18.png)

累了，毁灭吧。真该颁个矛盾代码奖给 `tsc`。

## 最终方案

总的来说，要么扫描 `src` 里的所有 `.ts` 做类型检查，要么只扫描 Git 提交的文件，但是会报找不到类型的错误。

最终，有一位大哥提供了一种思路：**把你的 `.d.ts` 放到路径里。**

![](https://files.mdnice.com/user/24913/874f716f-0d43-410b-a141-0e14e0b84cbc.png)

**个人觉得这个方案应该是目前最好的解决方案了，不仅能加载 `tsconfig.json` 也可以显式地加载 `.d.ts` 声明文件，不会报错误。**

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
    "eslint --cache --fix",
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
