# ESLint x Plugins

上一篇在配置 ESLint x TypeScript 时，我们发现了 Parser 和 Plugin 的规律，下面来聊聊一些常见的 Parser 和 Plugin。

## ESLint x Babel

在第一篇文章里就说了，可以通过 `env` 来设定 ESLint 的默认 ECMAScript parser 的版本，所以 ESLint 其实是自带有 parser 的，但是它只支持 [最新版的 ECMAScript 标准](https://github.com/eslint/eslint/blob/a675c89573836adaf108a932696b061946abf1e6/README.md#what-about-experimental-features "ESLint parser 支持最新的 ECMAScript 标准")。

而 JavaScript 依然在不断发展，时不时又出一些新的 API 或者提案，对于要尝鲜的开发者，ESLint 的 Parser 就解析不动 `.js` 了，因此，我们需要 [@babel/eslint-parser](https://www.npmjs.com/package/@babel/eslint-parser)。

```sh
npm i -D @babel/core @babel/eslint-parser
```

然后添加 `.babelrc.js`，在里面写项目的 babel 规则，这里按你自己需求来就好了，我就不写啦。

然后在 `overrides` 里新增对 `.js` 的处理：

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
  extends: [
    "eslint:recommended", // eslint 自己的推荐规则，最佳实践最小集
    "plugin:prettier/recommended", // 禁用 eslint 关于代码的风格的规则，使用 prettier 的风格
  ],
  overrides: [
    // 处理 JS 文件
    {
      files: ["**/*.{js,jsx}"], // 只处理 js 和 jsx 文件
      parser: "@babel/eslint-parser", // 使用 babel 来解析 js 文件
      parserOptions: {
        sourceType: "module", // 支持 import/export
        allowImportExportEverywhere: false,
        ecmaFeatures: {
          globalReturn: false,
        },
      },
    },
    // 处理 TS 文件
    {
      files: ["**/*.{ts,tsx}"], // 只处理 ts 和 js 文件
      parser: "@typescript-eslint/parser", // 能看懂 TypeScript
      parserOptions: {
        project: ["./tsconfig.json"], // 告诉 eslint：tsconfig 在哪
      },
      extends: [
        // typescript-eslint 的推荐规则，只是这些最佳规则都是针对 TS 的
        "plugin:@typescript-eslint/recommended",
        // tsconfig.json 里 Type Checking 的推荐规则
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
      ],
      plugins: [
        // 使用 typescript x eslint 的插件
        "@typescript-eslint",
      ],
    },
  ],
};

```

## ESLint x React

解析 React 文件主要有两大难题：
* 不识别 `import React from 'react'`，会报 `React is not used`
* 不识别 `.jsx`, `.tsx` 文件

如果你的项目是 React + TypeScript，那么要在 `tsconfig.json` 里添加对 JSX 的支持：

```json
{
  ...
  "jsx": "react"
}
```

然后在 `overrides` 里也添加对 `.js` 和 `.jsx` 的解析：

```js
module.exports = {
  overrides: [
    {
      files: ["**/*.{jsx,js,ts,tsx}"],
      ...ESLint x TypeScript 配置
    }
  ]
}
```

因为 ESLint 这里会 TypeScript 的 parser 结合 `tsconfig.json` 来解析 `.js` 和 `.jsx`，所以 ESLint 是能看懂 `.jsx` 的内容的。

那如果项目是 React + JavaScript 呢？或者我就要分开处理 TypeScript 和 JavaScript 呢？我们难道要用 React Parser 么？**No！我们需要的是 ESLint x React 的插件！个人理解 JSX 更属于 JavaScript 的一种特性，而不是语法类型，所以要用 Plugin。**

遵循刚刚说的规律，我们安装 [eslint-plugin-react](https://www.npmjs.com/package/eslint-plugin-react)：

```sh
npm i D eslint-plugin-react
```

最后只需继承它即可，注意这里的 `extends` 大部分时候都可以是 `plugin` 的缩写版本：

```js
"extends": [
  "eslint:recommended",
  "plugin:react/recommended"
]
```

## ESLint x Vue

Vue 和 React 同理，它只需要一个 [eslint-plugin-vue](https://eslint.vuejs.org/)：

```sh
npm i -D eslint-plugin-vue
```

我们依然可以在 `overrides` 中新增一条只针对 `.vue` 文件的配置：

```json
overrides: [
  // 处理 vue 文件
  {
    files: ["**/*.vue"], // 只处理 vue 文件
    extends: ["plugin:vue/vue3-recommended"], // 使用 vue3 的推荐规则
  }
]
```

这样就可以对所有 `.vue` 文件执行 `eslint '**/*.vue' --fix` 了。

## 考考你

看到这，你的 `.eslintrc.js` 应该已经写了少代码了，当然相信你也能慢慢找到 `eslint`, `plugin`, `config`, `prettier`, `parser` 这些关键词之间排列组合的一些规律了。

不妨来考考你：
* 我要用 XXX 公司的 ESLint 规则集，应该找哪个名字的 NPM 包？
* 我要解析 YYY 语法，应该搜哪个 NPM 包呢？
* 要屏蔽 XXLint 工具和 Prettier 冲突的规则，应该用哪个 NPM 包？
* 要让处理 `.xxx` 后缀的文件，应该用到哪些 NPM 包呢？

如果你对上面的问题都能做到心中有数，那配置 [StyleLint](https://stylelint.io/user-guide/configure/) 就再简单不过了。实际上无论是哪个 xxlint 他们的 NPM 命名规律都是非常类似的。话不多出，马上开始学习下一章吧~
