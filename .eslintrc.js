module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    "eslint:recommended", // eslint 自己的推荐规则，最佳实践最小集
    "plugin:prettier/recommended", // 禁用 eslint 关于代码的风格的规则，使用 prettier 的风格
  ],
  overrides: [
    // 处理 React 的 TS 文件
    {
      files: ["**/*.{ts,tsx}", "**/*.{js,jsx}"], // 只处理 ts 和 js 文件
      excludedFiles: [".eslintrc.js"], // 这里禁用了 .eslintrc.js 的类型检查
      parser: "@typescript-eslint/parser", // 能看懂 TypeScript
      parserOptions: {
        project: ["./tsconfig.json"], // 告诉 eslint：tsconfig 在哪
      },
      extends: [
        "plugin:@typescript-eslint/recommended", // typescript-eslint 的推荐规则，只是这些最佳规则都是针对 TS 的
        "plugin:@typescript-eslint/recommended-requiring-type-checking", // tsconfig.json 里 Type Checking 的推荐规则
      ],
      plugins: [
        "@typescript-eslint", // 使用 typescript x eslint 的插件
      ],
    },
    // 处理 vue 文件
    {
      files: ["**/*.vue"], // 只处理 vue 文件
      extends: ["plugin:vue/vue3-recommended"], // 使用 vue3 的推荐规则
    },
  ],
  plugins: [
    "prettier", // 使用 prettier 插件
  ],
  rules: {
    "prettier/prettier": "error", // 代码风格有问题就报 error
  },
};
