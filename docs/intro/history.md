# Linter的故事

不知道有多少同学和我一样，都知道 ESLint, TSLint, JSLint, Prettier, lint-staged 等这些代码检验工具（非常不专业的模糊统称），但是却说不清他们之间的关系。

使用的时候基本上就是随便找一篇 ESLint 相关的文章，也不管这些配置是啥意思，把 `.eslintrc.js` 文件一抄就算是 “给项目加上代码校验” 了。

![](https://files.mdnice.com/user/24913/4139800f-b7ad-4c52-8df2-3695147ce12d.png)

那今天就跟大家聊聊这些 linter, prettier 的发展史和它们之间的关系，以及它们提供了哪些功能。

## 静态代码分析

我们一直所说的 Linter 其实是 **静态代码分析器。它的主要工作就是阅读你的代码，通过一些校验规则来提高代码质量。**

它也是不是语法校验器，更像是找到有问题的代码，会跟你说：**“N行M列这里是屎山，里面有可能有 Bug，你自己小心点”。**

如果你写一个正则表达式，在回调里查到有人写了个 "Fuck" 然后报错，也可以成为一个 Linter。只是仅用正则来处理代码怕是要写到头都秃了。

![](https://files.mdnice.com/user/24913/e1135ed7-cfc2-4e1c-80bb-6b678f2f5964.jpg)

## JSLint

Linter 并不是一个新鲜的东西，早在 2002 年，Douglas Crockford 就为 JavaScript 写了第一个 Linter 工具：**JSLint**。

![Douglas Crockford](https://files.mdnice.com/user/24913/db4a6829-d61d-4f8e-ac95-dad3f26ce466.jpg)

你现在也可以在 https://www.jslint.com 这个网站上粘贴你的 JavaScript 代码来检查有没有问题。

![jslint.com](https://files.mdnice.com/user/24913/70025012-7f1c-4a39-bdb0-1918b53ecb92.png)

JSLint 的优点就是 **开箱即用**，不需要配置太多多东西，相当于拎包入住。但优点也是缺点，就是 **规则太严格，完全不可扩展和自定义配置，连配置文件都没有。**

说白了，你要改 JSLint 是不可能的，爱用用不用自己造。

## JSHint

既然 “爱用用，不用自己造” 是吧？2010 的，Anton Kovalyov 跟其它人就 fork 了 JSLint 然后造了 **JSHint**。

![jshint.com](https://files.mdnice.com/user/24913/119565ab-f4c3-45b0-ab9b-649825d61d7b.png)

这个工具与 JSLint 的思路正好相反，它的默认规则非常松散，自由度非常高了。但是也同样带来了问题：**你需要非常了解这些规则才能配出一个好用的规则表。因为规则太不严格，过于自由，所以单纯靠默认的规则跟没有配置 Linter 一样。**

## JSCS

前面的 JSLint 和 JSHint 主要功能都是检查代码质量问题的， **JSCS (JavaScript Coding Style) 则是一个代码风格检查器**。

它有超过 90 条规则，你也能自己创建规则，不过这些规则主要是和代码风格、代码格式化有关，它不会报任何和 JS 代码质量相关的错误。

![https://jscs-dev.github.io/](https://files.mdnice.com/user/24913/ae6405e8-c65d-475b-a66c-5b4b50a795d0.png)

当然这东西现在也凉凉了。

## EditorConfig

中间还出现了一个 [EditorConfig](https://editorconfig.org/blog/) 的工具，它的目的是为了规范不同编辑器下的格式化输出。

![](https://files.mdnice.com/user/24913/07574440-018b-4ca3-ba6f-f8bec1992147.png)

然而，如今随着 Prettier 这个更强大的格式化工具慢慢迭代更新，EditorConfig 也逐渐退出前端舞台了。**一般情况下如果配置了 ESLint + Prettier，EditorConfig 则不再需要了，因为目前 IDE 都能直接读取 Prettier 的配置来格式化代码。**

## ESlint

2013 年，一个叫 **JSChecker** 的小项目被改名成我们如今非常熟悉的 **ESLint**。

### ES6

说到 ESLint 就要说一说 ES6 了。在 2014 年的时候，JavaScript 有一个非常大的更新：ES6，也叫做 ES2015。这个更新引入了很多的 API、新语法和新功能。详情可看阮一峰的 [《ES6标准入门》](https://es6.ruanyifeng.com/)。

![《ES6标准入门》](https://files.mdnice.com/user/24913/bfc7e81c-737a-4eb8-be02-357a90167db0.jpg)

ES6 上线了之后，JSHint 受不了直接投降了，因为它不支持这些 ES6 新语法。而 ESLint 正好异军突起，马上用 Esprima （一个高性能的 ECMAScript parser）支持所有 ES6 新语法，并对新语法做好了校验。

除了基础的 ES6 代码质量校验，ESLint 还支持代码风格的规则。开发者不仅可以自定义项目要用哪些规则，也能直接无脑使用社区上制定的规则（比如 eslint-config-airbnb）。

这一波操作也让 ESLint 成为现在 JavaScript 的一个标准的 Linter 了。然而，关于 Linter 的故事还没结束。

### 代码风格修复带来的麻烦

相信大家都知道 `eslint src --fix` 这行命令，我们都想当然地觉得 eslint 会帮我们修复一些 “错误”，可是大家有没有想过这里的 “错误” 究竟是什么呢？

ESLint 把这里的 “错误” 分为两类：
1. 代码质量方面错误/建议
2. 代码风格方面的错误/建议

代码质量非常容易理解，比如 [eqeqeq](https://eslint.org/docs/rules/eqeqeq) 这个把双等改三等的规则： `==` 改成 `===`，这样的规则可以有效地避免一些 Magic Code Bug。

![](https://files.mdnice.com/user/24913/c1e22f68-9191-4c06-b6ca-865a13ea6946.jpg)

代码风格也是很容易理解，比如不喜欢加分号就加一条规则 [semi](https://eslint.org/docs/2.0.0/rules/semi) 规则：

```json
{
  "semi": [2, "never"]
}
```

一行 `eslint src --fix` 就能草飞整个项目的分号。但是，有一些规则是不能直接自动草飞的，比如 [max-len](https://eslint.org/docs/rules/max-len) 规则。

假如我们有下面非常长的一行代码，那么对下面的代码我们应该如何自动修复呢？

```js
const foo = { "bar": "This is a bar.", "baz": { "qux": "This is a qux" }, "difficult": "to read" };
```

可以改成下面这样：

```js
const foo = {
  bar: "This is a bar.",
  baz: { qux: "This is a qux" },
  difficult: "to read",
};
```

也能改成下面这样：

```js
const foo = {
  bar: "This is a bar.", baz: {
    qux: "This is a qux",
  }, difficult: "to read",
};
```

它们都没超过 max-len，都能 pass。可是这两种写法到底哪个好看一点，ESLint 是无法界定的。

### Linter 本职工作

如果你一直纠结为什么 ESLint 无法自动修复这个问题，那不妨再想想最初 JSLint 诞生的原因是什么——**通过规则来提高代码质量！**

没错，Linter 的本职工作其实用一些语法规则来约束开发者去写高质量代码，而非约束代码风格。虽然 ESLint 也提供了一些代码风格相关规则，比如 “写不写分号”，“每行不能超过多少字符” 等，但是它依然不是一个代码风格修正器。

**注意：我这里说的是修正器，不是检查器。Linter 的工作更多像检查器，主要功能是告诉你哪行哪列写得太拉了，大部分是需要手动去修正的，能自动修正的地方非常少。**

举个 [no-var](https://eslint.org/docs/rules/no-var) 的规则：

```js
var xxx = 1;
```

ESLint 根本无法自动修复这类的代码，因为 `xxx` 既可能是全局变量，也可能是局部变量，自动修复成 `const` 或者 `let` 或者 `window.xxx` 都可能引入 Bug，所以只能让开发者自己自己修正。

相信有的同学会说：不对呀，我在 IDE 经常看到 `ESLint: Fix xxx`：

![](https://files.mdnice.com/user/24913/5f373db6-8119-4437-bdf2-7d2d174dd3e8.png)

这里的 `ESLint: Fix xxx` 其实是用了 [Prettier](https://prettier.io/) 来做代码风格修复的。下面就来聊聊 [Prettier](https://prettier.io/) 这个工具。

## Prettier

Prettier 是一个代码风格的修正工具。

### 如何诞生

代码风格是所有程序员都要遇到的问题，不管是团队协作还是个人练习。有的喜欢有分号，代码更安全；有的喜欢没分号，能少打一个字符；有的喜欢单引号，能少按一下 Shift；有的喜欢反引号，扩展更高；camelCase, PascalCase, snake_case 总是在团队里无法统一，就算统一了，有些队员心里也不服，因为代码风格太主观了，根本无法让谁信服谁，每个程序最喜欢看的代码还是自己的代码。

这就导致团队里总会出现因为一两个符号而争吵，从而引发内部矛盾，从而大打出手，进而各起山头，争风吃醋，团队解散，公司破产（咳咳）。

![](https://files.mdnice.com/user/24913/d626d351-e1d6-4ebe-b872-748008523bf2.png)

前端程序员就会想：是否有一种非常标准且又好看的代码风格来停止这场代码风格的圣战呢？

**Prettier 这时就出来了：我格式化后的代码是最好看的，谁同意，谁反对？**

![Prettier](https://files.mdnice.com/user/24913/df84674c-5480-4b38-b71b-3afef1c3037b.jpg)

**“我反对！凭什么你说最好看就是最好看？”**

![某人](https://files.mdnice.com/user/24913/052ee691-a73d-4398-a805-97b48228c7d1.jpg)

**Pia！！！！**

![](https://files.mdnice.com/user/24913/13be86c9-df98-4c8e-b27d-0885167e4b5a.png)

Prettier 的作者 James 在这篇论文基础上再完善了一些代码风格规则，最终成为了 Prettier 格式化代码的最终方案。比如像下面的链式调用，Prettier 输出的就比原来论文描述的要好看一些：

```js
// 原版 "A prettier printer" 的实现
hello().then(() => {
  something()
}).catch(console.error)


// Prettier 的实现
hello()
  .then(() => {
    something()
  })
  .catch(console.error)
```

### 如何工作

首先，Prettier 会把代码转换成 AST (Abstract Syntax Tree)，这里用到的是一个叫 [Recast](https://github.com/benjamn/recast) 的库，而 Recase 实际上也用了 [Esprima](https://github.com/jquery/esprima) 来解析 ES6。

所以无论之前的代码怎么乱，怎么屎，Prettier 都抹掉之前的所有样式，抽成最本质的语法树。

然后再用 Prettier 的代码风格规则来输出格式化后的代码。

下面这图从左到右就是 Prettier 格式化代码的过程：`乱代码 -> AST -> 最终格式化后的结果`。

![乱代码-AST-格式化的代码](https://files.mdnice.com/user/24913/c582efd4-70fe-405c-8f6d-995386e790e0.png)

从 Prettier 的工作原理也可以看出 Prettier 其实不仅仅可以为 JS 服务，还可以为其它语言/文件服务：

![](https://files.mdnice.com/user/24913/42fb5c0c-45be-4ed5-8748-38baf6759a9b.png)


### 设计理念

Prettier 的官方文档里一直在强调自己是一个 Opinionated 的工具，这里想展开跟大家聊聊 Opinionated 。

其实不仅 Prettier，我们日常使用的一些库和框架都会标明自己是 opinionated 还是 unopinionated：

![Express 是 unopinionated](https://files.mdnice.com/user/24913/01ab0f5f-3942-46c7-aaf4-658488275a4e.png)

![Vue.js 是 opinionated](https://files.mdnice.com/user/24913/c42a4b86-90bb-47f0-8a87-f42f5a91ab4f.png)

![Spring Boot 是 opinionated](https://files.mdnice.com/user/24913/61137c9c-7548-4069-b735-efb39d428370.png)

按照框架/库的 opinionated 还是 unopinionated 思路来使用它们非常重要。

Opinionated 的思路是 **你的一切我全包了，使用者就别自己发明设计模式和轮子，用我的就行，有锅我背。** 个人非常喜欢这样的思路，因为我实在不喜欢 “发明” 轮子和设计模式。认识我的人都知道我是一个 Jetbrains 的狂热粉，这正是因为 Jetbrains 家的 IDE 是按 Opinionated 思路来开发的，所有的功能 Jetbrains 全包圆了，各种工具的使用和联动一体性非常高，有种专为当前 IDE 服务的感觉。

Unopinionated 的思路则是 **我就给你一堆零件，每个有优有劣，自己组装来玩了，相当于每人都是装机猿。** VSCode 就是类似这样的思路，平台非常开放，各种插件五花八门，你要 Vue，React，Ruby，Python 这些功能就得自己找插件来安装。对于喜欢个性化的玩家，自己的 VSCode 是可以玩出很多花样来，可是由于插件之间各自为政，要解决 Bug 和冲突就相对麻烦一些。

Prettier 属于 Opinionated 哲学，这意味着它提供的代码风格已经是最优的，不希望使用者做太多自定义的内容，而应该相信 Prettier 已经服务到位了。

### Prettier + ESLint

我们可以把 ESLint 的 linter 规则分为两类：

* 格式化规则：比如，max-len, no-mixed-spaces-and-tabs, keyword-spacing, comma-style... 等规则。在 ESLint 报错需要自动修复时，Prettier 可以将这些有代码风格有问题的代码统一按最好看的风格来格式化。
* 代码质量规则：比如，no-unused-vars, no-extra-bind, no-implicit-globals, prefer-promise-reject-errors... 等规则。在 ESLint 报错时，一般只能开发者自己手动处理。

刚刚说到 ESLint 对一些代码风格的自动修复束手无策，而 Prettier 正好是这方面的专家，所以我们可以让 Prettier 接管 ESLint 格式化代码的工作，自动修复违反格式化规则的代码，剩下的代码质量规则则还是交给 ESLint 自己上报错误。

**总的来说：Prettier 用来格式化，Linter 用来检查 Bug！**

### 实践教程

至于要怎么结合 Prettier 和 ESLint，以及怎么去写 `.eslintrc.js` 里那些令人蒙逼的配置，打算放下一篇来讲（附示例哦），因文章太长了，可以关注一下【写代码的海怪】。

## TSLint

好了我们再说回 Linter。2012 微软公布了第一版的 TypeScript。

TypeScript 无需多言，它有着非常强大的类型系统。但是这就带来了一个问题：ESLint 的底层是解析 ECMAScript 代码的，也即只能看 `.js` 文件，它看不懂 `.ts` 文件。

所以微软就整了一个 TSLint 出来，说我们自己检查自己的语法总行了吧。

在那段时间里，TSLint 是 TypeScript 的标准 Linter 工具，ESLint 则为 JavaScript 标准 Linter。它们各有自身特色：**ESLint 有 TSLint 所有没有的一些语法特性支持，而 TSLint 可以对代码进行静态分析和类型检查。**

可是，一份代码还要两个 Linter 并行检查属实有点让人不爽。TSLint 也经常和 ESLint 的人探讨应该用哪个作为主力 Linter。TS 的社区也有很多声音希望优先满足 JSer 的需求，毕竟 TS 是 JS 的超集嘛，还是以 ESLint 为主。

**最终，在 2019 年 TSLint 宣告不再维护，以后就是 ESLint 的天下了。**

![TSLint 在 2019 年就凉凉了](https://files.mdnice.com/user/24913/1788f6e6-d496-43cf-af34-151bcf8c3a8b.png)

TSLint 的静态分析和类型检查的功能则变成两个 NPM 包：[@typescript-eslint/parser](https://www.npmjs.com/package/@typescript-eslint/parser), [@typescript-eslint/eslint-plugin](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin)，前者主要处理 `.ts` 文件，解析 TS 语法，后者则是提供 TS 的相关 lint 规则以及类型检查。在 Lint `.ts` 时，需要在 `.eslintrc.js` 里配置这两个包的信息。

**在这场没有硝烟的 Linter 大战中，ESLint 最终吃鸡！**

## StyleLint

唯一没有被卷入这场大战中的就是 [StyleLint](https://stylelint.io/)。这是一个专为样式文件 `.css`, `.less`, `.scss` 做的 Linter。

虽然也有 lesslint, scss-lint 这些玩意，但是并没有击起太大的水花，StyleLint 可以说是直接一统江湖了。

## husky

如今已经来到 2022 年了，无论哪家的 IDE 还是编辑器都已经能够很好的支持 Linter 工具了。写代码时都能马上提示：

![](https://files.mdnice.com/user/24913/cf2738f7-edf6-45cc-8a41-207d2f6a56da.png)

除了直接快捷键修复，也能在保存的时候自动运行 `eslint --fix`。

可万一有些人不开 ESLint，或者忘记 ESLint 修复时，那些没有被 fix 过的代码也有可能会入库。所以我们希望在提交代码前能运行 `eslint --fix` 来自动修复有问题的代码。

![](https://files.mdnice.com/user/24913/0156e4a3-1eb9-4e24-8083-9666fb9f9521.png)

[husky](https://github.com/typicode/husky) 就是用来解决这样问题的一个工具，它在提交的时候执行一些 bash 命令。

![你在看什么](https://files.mdnice.com/user/24913/2b1a2622-e484-4f11-9147-b33f1f09c8c8.jpg)

比如，我们可以在每次提交时都 fix `/src` 下的所有代码。

```sh
# pre-commit
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx eslint src --fix
```

## lint-staged

如果每次都把整个 `/src` 都 fix 一遍感觉有点大可不必，不仅速度慢，还自动修复了很多没有改动过的文件，导致提交的文件变得更多。

更好的解决方法应该是只针对当前提交/改动过的文件进行 `eslint --fix`。

要实现这样的效果，Prettier 在官网的 [Pre-commit Hooks ](https://prettier.io/docs/en/precommit.html) 介绍了好几个工具。这里用 [lint-staged](https://github.com/okonet/lint-staged) 做例子，也是最多人熟悉的一个工具。

在刚刚的 `pre-commit.sh` 里改一下命令，每次提交前会执行 `lint-staged` 命令，而不是 `eslint --fix` 啦：

```sh
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx lint-staged
```

之后在 `package.json` 里可以指定对 **Git Commit** 上来的哪些文件执行哪些命令：

```json
"lint-staged": {
  "*.{js,jsx,ts,tsx}": [
    "eslint --cache --fix",
    "bash -c 'tsc --noEmit'"
  ],
  "*.vue": [
    "eslint --cache --fix"
  ],
  "**/*.{css,less}": [
    "stylelint --cache --fix"
  ]
}
```

配置好了之后在下次 commit 就可自动对提交的文件进行 lint fix 和 tsc 的检查了。

**这部分实践会在下一篇 Linter 实践详细说明，这里大家懂我说的意思就好了~**

## 总结

好了一下子又写了那么多字，来稍微总结一下吧：

市面上那么多的 linter，只需要看 ESLint 就可以了。

ESLint 主要负责处理两种规则：格式化和代码质量问题。格式化不是它的强项，需要用 Prettier 格式化大师来处理代码风格有问题的代码。

Prettier 格式化后的代码，理论上是最好看的（你觉得不是就写一篇论文出来驳它跑马场 doge）。正因为 Prettier 只关注格式化，所以它也可以格式化其它的文件，如 `.yml`, `.json`, `.md` 等。

TSLint 已经凉了，如果要 lint `.ts`，需要用到 [@typescript-eslint/parser](https://www.npmjs.com/package/@typescript-eslint/parser), [@typescript-eslint/eslint-plugin](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin) 两个 NPM 包，这两可以看成 ESLint 的附属插件/补丁包。
