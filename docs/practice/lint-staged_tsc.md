# 🤥 LintStaged x TSC

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

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b1c0fd9f450e45fc8e24572506ef05f3~tplv-k3u1fbpfcp-zoom-1.image)

报错里说的是找不到 `Hello` 这个 interface。但是我们在写项目的时候，IDE 都会自动找到这个类型声明文件的呀，为什么这样就不行了呢？

这是因为 IDE 会自动读取读 `tsconfig.json` 文件，而这里 `tsc` 命令没有读取 `tsconfig.json` 导致找不到 `Hello` 这个 interface。那么，很自然我们就会想是否可以 `tsc -p tsconfig.json --noEmit --skipLibCheck` 这样写呢？**抱歉，依然报错：**

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e6fd478cf9ff497885c4bc72dfaaad4f~tplv-k3u1fbpfcp-zoom-1.image)

**他奶奶地！为什么会报错？！**

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8a6be60386b446eda6ea3ff02545c18c~tplv-k3u1fbpfcp-watermark.image?)
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

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/621ffad6e2ba4bd2ac838c94db9de295~tplv-k3u1fbpfcp-zoom-1.image)

这个问题在 [这个 Issue: Current version incorrectly analyzes @types/node](https://github.com/gustavopch/tsc-files/issues/20 "tsc-files 问题") 中又又又被疯狂讨论。
里面提出了一个想法：把 `typeRoots` 的路径放到 `include` 里，这样就可以用 `typeRoots` 自定义类型声明文件的路径来检测所有的 `.d.ts` 了，但是这还是有问题，具体看下面这段：

![这两段是该 Issue 的讨论核心](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ce4a6418679b46e8885ecf301d6606c4~tplv-k3u1fbpfcp-zoom-1.image)

> deanolium 的观点是：如果把 `typeRoots` 放在 `include` 里，我们不能保证所有人都会用 `tsconfig.json` 里的 `typeRoots`，因为不是所有人都是配置大神。
> 如果要在 `typeRoots` 里写自定义类型声明文件目录，那就要手动加上 `./node_modules/@types` 目录，不然不会自动 import node_modules 里的 `.d.ts`。
> 而且如果大家不了解 `tsc-files` 的原理和实现，根本就不知道有这个坑。`tsc-files` 升级版本后还需要用户手动去改 `tsconfig.json` 并不是一个好的实践。

> gustavopch（作者）的观点是：一方面使用 `tsc-files` 时不应该加上所有的文件，因为这会扫描整个项目，就违反 `lint-staged` 使用的初衷了。
> 另一方面就算 `include` 里能读取 `typeRoots` 目录也不能保证能自动检测到所有类型，因为有的人可能会在 `.ts` 也用 `declare` 来定义，也会有坑。

累了，毁灭吧。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ac607546a8664c3cb4d6353963209f11~tplv-k3u1fbpfcp-zoom-1.image)

## 我的方案

总的来说，要么扫描 `src` 里的所有 `.ts` 做类型检查，要么只扫描 Git 提交的文件，但是会报找不到类型的错误。

很抱歉，目前我能找到的资料都没有很好的解决方案，如果你有更好的 LintStaged x TypeScript 配置方案，可以 [提 Issue](https://github.com/haixiangyan/linter-guide/issues)。

不过我自己也想到了一个方法就是显式扫描 `.d.ts`。

```js
const declarationFiles = [
  './src/messyTypesInfo.d.ts'
]

module.exports = {
  '**/*.{ts,tsx}': [
    (filenames) => {
      const files = [...filenames, ...declarationFiles];
      return `tsc-files ${files.join(' ')} --noEmit --skipLibCheck`;
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

要么也可以在每次 Commit 前全面扫描：

```js
module.exports = {
  "**/*.{ts,tsx}": [
    () => "tsc -p tsconfig.json --noEmit",
    "eslint --cache --fix",
  ],
  "**/*.{js,jsx}": [
    "eslint --cache --fix",
  ],
  "**/*.vue": [
    "eslint --cache --fix",
  ],
  "**/*.{css,less}": ["stylelint --cache --fix"],
};
```

缺点是 pre-commit 的时候会慢一点。
