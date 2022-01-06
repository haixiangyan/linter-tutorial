module.exports = {
  root: true,
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
      'eslint:recommended', // eslint 自己的推荐规则，最佳实践最小集
      'plugin:@typescript-eslint/recommended', // typescript-eslint 的推荐规则，只是这些最佳规则都是针对 TS 的
    ],
    "parser": "@typescript-eslint/parser", // 能看懂 TypeScript
    "parserOptions": {
        "ecmaVersion": 13,
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint", // 可以使用一些规则
    ],
    "rules": {
    }
};
