const declarationFiles = ["./src/messyTypesInfo.d.ts"];

module.exports = {
  "**/*.{ts,tsx}": [
    (filenames) => {
      const files = [...filenames, ...declarationFiles];
      return `tsc ${files.join(" ")} --noEmit --skipLibCheck`;
    },
    "prettier --write",
    `eslint --cache --fix --rule 'prettier/prettier: off'`,
  ],
  "**/*.{js,jsx}": [
    "prettier --write",
    `eslint --cache --fix --rule 'prettier/prettier: off'`,
  ],
  "**/*.vue": [
    "prettier --write",
    `eslint --cache --fix --rule 'prettier/prettier: off'`,
  ],
  "**/*.{css,less}": ["stylelint --cache --fix"],
};
