module.exports = {
  root: true,
  env: {
    "browser": true,
    "node": true
  },
  extends: [
    "eslint:recommended", // eslint 自己的推荐规则，最佳实践最小集
    "plugin:@typescript-eslint/recommended", // typescript-eslint 的推荐规则，只是这些最佳规则都是针对 TS 的
    "plugin:@typescript-eslint/recommended-requiring-type-checking", // tsconfig.json 里 Type Checking 的推荐规则
    "plugin:prettier/recommended", // 禁用 eslint 关于代码的风格的规则，使用 prettier 的风格
  ],
  parser: "@typescript-eslint/parser", // 能看懂 TypeScript
  parserOptions: {
    project: ["./tsconfig.json"], // 告诉 eslint：tsconfig 在哪
  },
  plugins: [
    "@typescript-eslint", // 使用 typescript x eslint 的插件
    "prettier", // 使用 prettier 插件
  ],
  rules: {
    "prettier/prettier": "error", // 代码风格有问题就报 error
  },
};
