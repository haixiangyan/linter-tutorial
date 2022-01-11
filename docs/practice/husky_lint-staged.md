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

**年轻人，依然 Too young too naive！让我们走进最终章，看看 `tsc` 会给我们带来什么样的难题吧。**
