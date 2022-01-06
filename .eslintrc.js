module.exports = {
  root: true,
  env: {
    "browser": true,
    "node": true
  },
  extends: [
    "eslint:recommended", // eslint 自己的推荐规则，最佳实践最小集
    "plugin:@typescript-eslint/recommended", // typescript-eslint 的推荐规则，只是这些最佳规则都是针对 TS 的
    "plugin:@typescript-eslint/recommended-requiring-type-checking", // 检查 types
  ],
  parser: "@typescript-eslint/parser", // 能看懂 TypeScript
  parserOptions: {
    project: ["./tsconfig.json"], // 告诉 eslint：tsconfig 在哪
  },
  plugins: [
    "@typescript-eslint", // 可以使用一些规则
  ],
  rules: {},
};
