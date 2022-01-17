module.exports = {
  "**/*.{ts,tsx}": [
    () => "tsc -p tsconfig.json --noEmit",
    "eslint --cache --fix",
  ],
  "**/*.{js,jsx}": [
    "eslint --cache --fix",
  ],
  "**/*.vue": [
    "eslint --cache --fix",
  ],
  "**/*.{css,less}": ["stylelint --cache --fix"],
};
