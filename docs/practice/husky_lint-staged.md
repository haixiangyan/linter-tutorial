# 一只哈士奇

我们不能保证所有人提交的代码都是 fix 好的。比如有的人经常忘记开启 ESLint 插件，提交代码时还以为自己代码写的贼 6，没啥报错，但到队友那 `git pull` 满屏都是红的。

Git 提供了很多 [Git Hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks)：

* pre-commit: 提交代码前做一些事
* pre-push: 推代码前做一些事
* pre-merge: 合并代码前做一些事
* pre-rebase: rebase 前做一些事
* ...

这些 Hooks 可以使得我们在操作 Git 的某些阶段做一些事情。而 [Husky](https://github.com/typicode/husky) 可以让我们在这些阶段里执行 Bash 指令。

![](https://files.mdnice.com/user/24913/c8c88c27-e0bd-4eea-835f-75f26ddc1e56.jpg)

**注意：Husky v4 和 v7 有非常大的差异，大家一定要注意甄别，最好直接看官网，这里使用最新版跟大家讲解。**


```sh
# 安装哈士奇
npm install husky -D
# 添加 prepare 命令
npm set-script prepare "husky install"
# prepare 创建 bash 脚本，安装 git hooks
npm run prepare
# 添加 pre-commit 的 git hook 脚本
npx husky add .husky/pre-commit "npx eslint src --fix"
```

运行之后会发现在 `./.husky/pre-commit` 里看到 `git commit` 前会运行的脚本：

```sh
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# git commit 前先 eslint fix 一波
npx eslint src --fix
```

**但是这样的命令会让每次 commit 前都把整个 `src` 都扫描并 fix 一次，速度太慢了，而且很容易把别人的屎山也 fix 掉，然后提交上去。**

我们更希望只针对提交的文件进行 Lint 操作。

## lint-staged

Prettier 在 [文档的 Pre-commit Hook](https://prettier.io/docs/en/precommit.html) 已经介绍了很多只针对提交文件做 fix 的工具。这里以 [lint-staged](https://github.com/okonet/lint-staged) 做介绍。

```sh
# 安装
npm i -D lint-staged
```

然后添加 `.lintstagedrc.js` 配置文件：

```js
module.exports = {
  '**/*.{ts,tsx,js,jsx}': [
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

`lint-staged` 配置的含义是对提交上来不同类型的文件执行对应的 lint fix 命令。


最后在刚刚创建的 `./.husky/pre-commit` 里改成执行 `lint-staged` 命令：

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx lint-staged
```

以后每次 commit 前都会跑一次 `lint-staged`，而 `lint-staged` 又会对提交的文件进行 ESLint Fix。

## 命令行

如果细心的同学会发现上面提到关于 `eslint` 的自动修复命令一共有两条：`eslint src --fix` 以及 `eslint --cache --fix`。

如果你直接在命令行里跑 `eslint --fix`，那什么事都不会发生，因为你没有指定要 fix 的文件以及文件目录。

那为什么在 `lint-staged` 里就可以 `eslint --cache --fix` 呢？

**因为 `lint-staged` 会把前面的 `*.{js,jsx,ts,tsx}` 来匹配提交的文件，并把它们作为参数传到 `eslint --cache --fix` 后面。所以虽然写的是 `eslint --cache --fix` 时实际上是执行了 `eslint 要修复的文件 --cache --fix`。**

## lint-staged x TypeScript

哼？你以为到这就完了么？Too yong too simple！如果你在 `.d.ts` 定义一个 `interface`：

```ts
type Hello = {
  name: string;
  age: number;
};
```

然后在另一个 `.ts` 里错误地使用它：

```ts
// 注意：这里没有 import Hello 是正常的，因为 Hello 是在 .d.ts 里定义
const hello: Hello = {
  name: "xx",
  age: 11,
  xxx: 11, // Error
};
```

![](https://files.mdnice.com/user/24913/aa355bdf-d83b-4d2d-892d-9873168a5619.png)

**然后直接强行 `git add ./`, `git commit -m 'update'`，发现竟然可以直接通过而不报错！**

**让我们再来思考一下 Linter 的作用是什么——它是一个用来提高代码质量的工具。它并不负责 TypeScript 的编译、类型检查。**

![ESLint 和 TypeScript 依然是各论各的](https://files.mdnice.com/user/24913/246aa1e9-4cc0-4a37-a223-a405f95fe14c.jpg)

上面检查 TypeScript 的工作需要交由 `tsc` 来处理。有些同学估计都会抢答了：我知道我知道，直接在 `.lintstagedrc.js` 里添加一行 `tsc` 不就完事了？

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

**年轻人，依然 Too young too simple！**

## tsc

我相信大多数人是不太了解 `tsc` 工具的。`tsc` 本身是一个编译工具，它主要工作是将 `.ts` 转换为 `.js` 文件，但是大多数项目在打包时都会用 `babel` 来处理了，也就没 `tsc` 什么事了。

**这里单单一个 `tsc` 是不够的，因为我们需要的是只检查类型，但不输出，所以要加一个 `--noEmit` 参数，同时也不要去检查 node_modules 里的类型，要加 `--skipLibCheck` 参数。完整的命令为 `tsc --noEmit --skipLibCheck`**

但是这条命令在 `lint-staged` 调用时会报下面的错误：

![](https://files.mdnice.com/user/24913/9dbc7a42-bde4-4672-910a-1e2973b05545.png)

这是因为它没有读我们 `tsconfig.json` 文件，导致找不到 `Hello` 这个 interface。那很自然我们想是否可以 `tsc -p tsconfig.json --noEmit --skipLibCheck` 呢？抱歉，依然报错：

![](https://files.mdnice.com/user/24913/ed8e301c-5cf6-4c79-aaf5-10a2bb27623a.png)

这个报错是因为 `tsc` 只有两种调用方式：

* `tsc -p tsconfig.json`：加载 `tsconfig.json` 时，会编译 `tsconfig.json` 里 `include` 的文件
* `tsc hello.ts`：直接编译命令行里写的 TS 文件，但是不会加载 `tsconfig.json`

**而因为 `lint-staged` 会把提交的文件作为参数传给 `tsc` 命令，所以就会出现又要加载 `tsconfig.json` 编译 `include` 的 TS 文件，又要单独编译 `**/*.ts` 的文件，`tsc` 就蒙圈了。**

这个问题也在 `lint-staged` 的 [这个 Issue](https://github.com/okonet/lint-staged/issues/825 "lint-staged 中使用 tsc 的问题") 中有提到。这个 Issue 提供了两种解决方法：

忽略 `lint-staged` 传入的提交文件参数，直接加载 `tsconfig.json` 进行全项目扫描：

```js
module.exports = {
  '**/*.{ts,tsx}': [
    () => "tsc -p tsconfig.json --noEmit --skipLibCheck",
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

虽然这不是一个好方法，但是我们必须要加载 `tsconfig.json` 去做编译和类型检查。**所以我的解决方法是不要在 `pre-commit` 里做 TS 检查，而放在 `pre-push` 阶段，相当于降级操作。如果你有更好的方法也可以留言评论告诉我。**

```sh
husky add .husky/pre-push
```

在 pre-push 里添加：

```sh
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

tsc -p ./tsconfig.json --noEmit --skipLibCheck
```

最后 `.lintstagedrc.js` 里只需要 lint 就可以了：

```js
module.exports = {
  '**/*.{ts,tsx,js,jsx,vue}': [
    "eslint --cache --fix",
  ],
  "**/*.{css,less}": [
    "stylelint --cache --fix",
  ]
}
```

OKOK，终于大功告成了！这是我写的第二本小书，前一本是 [一天学习一个 npm 轮子](https://github.com/haixiangyan/one-day-one-npm-lib)，有兴趣可以看看，海怪又完成了一个小目标。

**如果喜欢我的文章，也可以关注【写代码的海怪】，每周周五准时更新技术文章，不会太干也不会太水，纯属和朋友聊天。**
