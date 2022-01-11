const declarationFiles = [
  './src/messyTypesInfo.d.ts'
]

module.exports = {
  '**/*.{ts,tsx}': [
    (filenames) => {
      const files = [...filenames, ...declarationFiles];
      return `tsc ${files.join(' ')} --noEmit --skipLibCheck`;
    },
    "eslint --cache --fix",
  ],
  '**/*.{js,jsx}': [
    "eslint --cache --fix",
  ],
  "**/*.vue": [
    "eslint --cache --fix",
  ],
  "**/*.{css,less}": [
    "stylelint --cache --fix",
  ]
}
