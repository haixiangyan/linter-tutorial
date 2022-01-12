# ESLint x TypeScript

欢迎回来！

如今 2022 年，是个人都会用上 TypeScript，下面就来聊聊 ESLint x TypeSciprt。

## 再无 TSLint

**首先想说的是 TSLint 在 2019 年已经凉凉了，取而代之的是 [@typescript-eslint/parser](https://www.npmjs.com/package/@typescript-eslint/parser), [@typescript-eslint/eslint-plugin](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin) 两个 NPM 包。**

我们先来安装一下：

```sh
# TypeScript
npm install -D typescript
# TypeScript 解析器
@typescript-eslint/parser
# TypeScript 一些 Lint 规则和功能
@typescript-eslint/eslint-plugin
```

然后在 `src` 下创建一个 `./src/messyTS.ts` 文件，在里面写一些乱七八糟的代码：

```ts
const x =       1

const y = {
  name:        "Jack",
  age: 11,
};

console.log("z"    ,
  x,
  y

);

const hello: Hello = {
  name:

    'zzz',
  age: 1
}

console.log(hello);
```

同样，再加一个很乱的类型声明文件 `./src/messyTypes.d.ts`：

```ts
type Hello = {
  name: string; age:number
}
```

再用下面命令创建一个 `tsconfig.json`，没有它是无法在 IDE 里做自动类型检查的：

```json
npx tsc --init
```

加完这些配置之后会发现，ESLint 并不认识 `.ts` 文件：

![](https://files.mdnice.com/user/24913/094416ea-1770-4270-9c8b-530c934b485c.png)

受前面 `env` 配置的影响，有的同学可能会想：是不是在 `env` 里加个 `typescript: true` 就可以了呢？

**答案是：不行，TypeScript 不算是 “环境”，而是语法，我们需要的是一个 TypeScript 的解析器，上面的 [@typescript-eslint/parser](https://www.npmjs.com/package/@typescript-eslint/parser) 正是帮助 ESLint 理解 TypeScript 语法的 Parser。而 [@typescript-eslint/eslint-plugin](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin) 则能提供一些 TS 的 Lint 规则和功能。配置如下：**

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
  parser: "@typescript-eslint/parser", // 能看懂 TypeScript
  parserOptions: {
    project: ["./tsconfig.json"], // 告诉 eslint：tsconfig 在哪
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:prettier/recommended"
  ],
};
```

配置完了之后，你会发现在 `.eslintrc.js` 会报一个这样的错误：

![](https://files.mdnice.com/user/24913/f00c5961-e6be-48be-9ce0-49540a1da769.png)

```
Parsing error: "parserOptions.project" has been set for @typescript-eslint/parser.
```

**这个错误是因为：既然你默认规定 ESLint 要 lint `.eslintrc.js`，可是 `tsconfig.json` 里又没有 include 这个文件。导致 ESLint 想 Lint `.eslintrc.js` 的时候，发现它又不在 Parser 的 `tsconfig.json` 名单列表上，就蒙逼了。**

最简单的解决方法就是在在 `tsconfig.json` 里 include 一下就 OK 了：

```json
{
  "compilerOptions": {...},
  "include": [".eslintrc.js", "src"],
  "exclude": ["node_modules"]
}
```

或者在 `.eslintignore` 里添加该文件，将其忽略掉：

```
# 忽略 .eslintrc.js
.eslintrc.js
```

**但是这两都不是很好的解决方法，因为除了 `src` 目录，正常项目中还会有很多其它普通的 `.js` 文件，比如 `.babelrc.js`, `webpack.config.js`, `start.js` 等配置文件。我们既想要 ESLint x Prettier 格式化这些文件，但又不想将它们放到 `tsconfig.json` 里做类型检查。**

ESLint 正好提供了一个 `overrides` 配置来解决这样的问题：

```js
module.exports = {
  env: {
    // 支持浏览器环境
    browser: true,
    // 识别 ES 的代码，使用 ECMAScript 2021 自动设置 ecmaVersion parser 为 12，
    es2021: true,
    // Linter .eslintrc.js 自己的时候要用 node 环境
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:prettier/recommended"
  ],
  overrides: [
    // 处理 TS 文件
    {
      files: ["**/*.{ts,tsx}", "**/*.{js,jsx}"], // 只处理 ts 和 js 文件
      excludedFiles: [".eslintrc.js"], // 这里禁用了 .eslintrc.js 的类型检查
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
}
```

上面的配置把 TypeScript 的 ESLint 配置归为一类，并只对 ``"**/*.{ts,tsx}", "**/*.{js,jsx}"`` 进行 Lint 操作，同时将 `.eslintrc.js` 排除掉。**这样一来，ESLint 不仅可以针对这类文件来做 Linter 检查，开发者也不用把冗余的 `.js` 文件放到 `tsconfig.json` 里了。**

到此为止，你的 ESLint x TypeScript 已经完成了。

## 命名规律

通过上面的 ESLint x TypeScript 配置，我们不难发现 ESLint 的又一大规律：

* 当 ESLint 无法解析文件时，比如看不懂新语法时，就可以搜索 "ESLint xxx Parser" 来找对应的 NPM 包
* 当 ESLint 要 Lint 一些非 `.js` 文件时，可以搜索 "ESLint xxx plugin" 来解决

那下一篇就来聊聊 ESLint 的一些常用的 Plugin 吧。走起~
