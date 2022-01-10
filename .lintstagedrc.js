module.exports = {
  '**/*.{ts,tsx}': [
    () => 'tsc -p tsconfig.json --noEmit', // 判断语法问题和类型检查
    "eslint --cache --fix", // 自动修复代码风格
  ],
  "**/*.{js,jsx}": [
    "eslint --cache --fix",
  ],
  "**/*.vue": [
    "eslint --cache --fix",
  ],
  "**/*.{css,less}": [
    "stylelint --cache --fix",
  ]
}
