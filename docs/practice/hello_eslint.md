# Hello ESLint

首先，我们来配置一下 ESLint，在 `src` 下创建一个 `./src/messyJS.js` 文件：

```js
// 需要报 for-direction Linter error
for (let i = 0; i < 10; i--) {
  console.log(i);
}

// 需要报 max-len Linter error
const longFunction = (somethingVeryLong1) => {console.log(1)}
longFunction(1, 2, 3, 4, 5);

// 需要格式化的代码
let   x   = 1;
const     hi   =       2
const   aa   = 333;
let y = {
  name: 'Jack', age: 11 }

console.log('result'
  ,x,
  y)

console.log(hi,        aa)
```

接下来安装 `eslint`：

```sh
npm i -D eslint
```

## IDE 集成

现在很多 IDE 的插件都和 ESLint 配合得非常好了：

![](https://img-blog.csdnimg.cn/img_convert/ee6a47549124b02e824de2f21f19e220.png)

> **温馨提示：下面在配置 eslint 过程中，如果会出现 “他奶奶地，我明明配置好了，为什么不生效？”的问题，你可以多刷新一下 ESLint（Disable 再 Enable）来使其生效。**

## 指定环境

回到项目，我们新建一个 `.eslintrc.js` 配置文件，里面什么都不写：

```js
module.exports = {};
```

这里就体现了 ESLint 一个非常好的设计：**解耦**。如果里面什么都不配置，那么默认啥规都不会有，当然，也看不懂你的代码......

![它看不懂 let 是啥](https://img-blog.csdnimg.cn/img_convert/bce4ec60aa18e2693e2b54ddad786a18.png)

所以需要添加一个 `env` 来告诉 ESLint 现在你的代码要在什么场景下跑：

```js
module.exports = {
  env: {
    // 识别 ES 的代码，使用 ECMAScript 2021 自动设置 ecmaVersion parser 为 12，
    es2021: true,
  }
};
```

设置了 `env` 之后，ESLint 就会识别这个场景下一些预设好的变量，比如 jQuery 的 `$`，CommonJS 里的 `module` 等。

其它具体环境可以看官网的 [Environments 章节](https://eslint.org/docs/user-guide/configuring/language-options#specifying-environments)，里面介绍了 ESLint 在不同环境下的 key 是啥：

![env 的配置](https://img-blog.csdnimg.cn/img_convert/6b3af992a47fa4d4d5de66ce11b40db5.png)

其中的 `esxxxx` 环境会让 ESLint 除了添加预设好的 20xx 全局变量外，它还会自动设定 `ecmaVersion` parser 版本，让对应的 parser 来解析代码：

```js
module.exports = {
  env: {
    // 识别 ES 的代码，使用 ECMAScript 2021 自动设置 ecmaVersion parser 为 12，
    es2021: true,
  }
}
```

配置完了就发现 `let` 可以正常解析了。

## 规则（集）

同样的，如果不配置任何规则，那么 ESLint 不会报任务警告和错误。我们可以在 `rules` 里去配置自己想要 lint 的规则：

```js
module.exports = {
  env: {
    // 识别 ES 的代码，使用 ECMAScript 2021 自动设置 ecmaVersion parser 为 12，
    es2021: true,
  },
  rules: {
    // 每行不能超过 80 个字符
    "max-len": ["error", { "code": 80 }],
  },
};
```

配置完后就可以看到 ESLint 的报错信息了：

![](https://img-blog.csdnimg.cn/img_convert/b670837eb289248d9bd223dd0880b51c.png)

可是，如果要我一个个规则来配，那不得配到天荒地老？

**ESLint 给出的解决方案是 “规则集”。公司部门或者社区会制定一些规则集，开发者只需要在 `.eslintrc.js` 里添加一行代码就能继承这些规则了。**

在安装 `eslint` 后，默认就有一个装一送一的 `eslint:recommended` 规则集：

```js
module.exports = {
  env: {
    // 识别 ES 的代码，使用 ECMAScript 2021 自动设置 ecmaVersion parser 为 12，
    es2021: true,
  },
  // 继承 ESLint 的规则集
  extends: "eslint:recommended",
};
```

添加了这个规则集之后，你会发现 `.eslintrc.js` 的 `module.exports` 报错了：

![](https://img-blog.csdnimg.cn/img_convert/8b14ff6e8befc8804b8d847bac6048d8.png)

这里的 `no-undef` 正是该规则集里的其中一条规则。ESLint 会默认处理所有的 `.js`，所以当处理自身 `.eslintrc.js` 配置文件时，它会按普通 JS 来阅读，无法看懂 `module` 从哪来的。

记不记得刚刚我们说要用 `env` 来让 ESLint 识别对应环境的语法？所以这里的 `env` 要加上 `node: true`，这样就可以让 ESLint 看懂 CommonJS 啦，为了能覆盖浏览器场景，我们也可以把 `"browser": true` 给打开。

```js
module.exports = {
  env: {
    // 支持浏览器环境
    browser: true,
    // 识别 CommonJS
    node: true,
    // 识别 ES 的代码，使用 ECMAScript 2021 自动设置 ecmaVersion parser 为 12，
    es2021: true,
  },
  // 继承 ESLint 的规则集
  extends: "eslint:recommended",
}
```

回到刚说的 “规则集” 话题。目前最出名的规则集应该是 Airbnb 制定的 ESLint 规则集 [eslint-config-airbnb](https://www.npmjs.com/package/eslint-config-airbnb)。

**ESLint 的规则集一般以名为 `eslint-config-xxx` 的方式命名。**

所以，以后大家只要看到 `eslint-config-xxx` 名字的 NPM 包，就知道它是 ESLint 的规则集了，或者当你要查某公司/工具/社区的规则集时，也可以通过 "eslint config xxx" 来搜索。

## 规则分类

ESLint 的规则分为两类:
* **Formatting rules: 代码风格规则**。比如：max-len, no-mixed-spaces-and-tabs, keyword-spacing, comma-style
* **Code-quality rules: 代码质量规则**。比如：no-unused-vars, no-extra-bind, no-implicit-globals, prefer-promise-reject-errors

让我们回到项目。加了这些规则集之后，你会发现 **ESLint 报错的规则大多数是属于无法自动修复的代码质量规则**，比如这里的 `no-unused-vars`：

![](https://img-blog.csdnimg.cn/img_convert/b49831b8fd6b52d3c8aa137d95834bf0.png)

ESLint 挠破头皮也猜不出来你写个没有用到的变量是为了啥，所以只能人工手动去修。

我们常说的 `ESLint src --fix` 其实更多指代代码风格的修正，不过 ESLint 在格式化方面比较弱，真正的格式化高手是 [Prettier](https://prettier.io)。

下一篇就来讲讲 [ESLint x Prettier](./eslint_prettier)，看看 ESLint 和 Prettier 能碰撞出多少火花，这将非常有趣。
