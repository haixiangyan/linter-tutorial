# ð ESLint x Plugins

ä¸ä¸ç¯å¨éç½® ESLint x TypeScript æ¶ï¼æä»¬åç°äº Parser å Plugin çè§å¾ï¼ä¸é¢æ¥èèä¸äºå¸¸è§ç Parser å Pluginã

## ESLint x Babel

å¨ç¬¬ä¸ç¯æç« éå°±è¯´äºï¼å¯ä»¥éè¿ `env` æ¥è®¾å® ESLint çé»è®¤ ECMAScript parser ççæ¬ï¼æä»¥ ESLint å¶å®æ¯èªå¸¦æ parser çï¼ä½æ¯å®åªæ¯æ [ææ°çç ECMAScript æ å](https://github.com/eslint/eslint/blob/a675c89573836adaf108a932696b061946abf1e6/README.md#what-about-experimental-features "ESLint parser æ¯æææ°ç ECMAScript æ å")ã

è JavaScript ä¾ç¶å¨ä¸æ­åå±ï¼æ¶ä¸æ¶ååºä¸äºæ°ç API æèææ¡ï¼å¯¹äºè¦å°é²çå¼åèï¼ESLint ç Parser å°±è§£æä¸å¨ `.js` äºï¼å æ­¤ï¼æä»¬éè¦ [@babel/eslint-parser](https://www.npmjs.com/package/@babel/eslint-parser)ã

```sh
npm i -D @babel/core @babel/eslint-parser
```

ç¶åæ·»å  `.babelrc.js`ï¼å¨éé¢åé¡¹ç®ç babel è§åï¼è¿éæä½ èªå·±éæ±æ¥å°±å¥½äºï¼æå°±ä¸åå¦ã

ç¶åå¨ `overrides` éæ°å¢å¯¹ `.js` çå¤çï¼

```js
module.exports = {
  env: {
    // æ¯ææµè§å¨ç¯å¢
    browser: true,
    // è¯å« CommonJS
    node: true,
    // è¯å« ES çä»£ç ï¼ä½¿ç¨ ECMAScript 2021 èªå¨è®¾ç½® ecmaVersion parser ä¸º 12ï¼
    es2021: true,
  },
  extends: [
    "eslint:recommended", // eslint èªå·±çæ¨èè§åï¼æä½³å®è·µæå°é
    "plugin:prettier/recommended", // ç¦ç¨ eslint å³äºä»£ç çé£æ ¼çè§åï¼ä½¿ç¨ prettier çé£æ ¼
  ],
  overrides: [
    // å¤ç JS æä»¶
    {
      files: ["**/*.{js,jsx}"], // åªå¤ç js å jsx æä»¶
      parser: "@babel/eslint-parser", // ä½¿ç¨ babel æ¥è§£æ js æä»¶
      parserOptions: {
        sourceType: "module", // æ¯æ import/export
        allowImportExportEverywhere: false,
        ecmaFeatures: {
          globalReturn: false,
        },
      },
    },
    // å¤ç TS æä»¶
    {
      files: ["**/*.{ts,tsx}"], // åªå¤ç ts å js æä»¶
      parser: "@typescript-eslint/parser", // è½çæ TypeScript
      parserOptions: {
        project: ["./tsconfig.json"], // åè¯ eslintï¼tsconfig å¨åª
      },
      extends: [
        // typescript-eslint çæ¨èè§åï¼åªæ¯è¿äºæä½³è§åé½æ¯éå¯¹ TS ç
        "plugin:@typescript-eslint/recommended",
        // tsconfig.json é Type Checking çæ¨èè§å
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
      ],
      plugins: [
        // ä½¿ç¨ typescript x eslint çæä»¶
        "@typescript-eslint",
      ],
    },
  ],
};

```

## ESLint x React

è§£æ React æä»¶ä¸»è¦æä¸¤å¤§é¾é¢ï¼
* ä¸è¯å« `import React from 'react'`ï¼ä¼æ¥ `React is not used`
* ä¸è¯å« `.jsx`, `.tsx` æä»¶

å¦æä½ çé¡¹ç®æ¯ React + TypeScriptï¼é£ä¹è¦å¨ `tsconfig.json` éæ·»å å¯¹ JSX çæ¯æï¼

```json
{
  ...
  "jsx": "react"
}
```

ç¶åå¨ `overrides` éä¹æ·»å å¯¹ `.js` å `.jsx` çè§£æï¼

```js
module.exports = {
  overrides: [
    {
      files: ["**/*.{jsx,js,ts,tsx}"],
      ...ESLint x TypeScript éç½®
    }
  ]
}
```

å ä¸º ESLint è¿éä¼ TypeScript ç parser ç»å `tsconfig.json` æ¥è§£æ `.js` å `.jsx`ï¼æä»¥ ESLint æ¯è½çæ `.jsx` çåå®¹çã

é£å¦æé¡¹ç®æ¯ React + JavaScript å¢ï¼æèæå°±è¦åå¼å¤ç TypeScript å JavaScript å¢ï¼æä»¬é¾éè¦ç¨ React Parser ä¹ï¼**Noï¼æä»¬éè¦çæ¯ ESLint x React çæä»¶ï¼ä¸ªäººçè§£ JSX æ´å±äº JavaScript çä¸ç§ç¹æ§ï¼èä¸æ¯è¯­æ³ç±»åï¼æä»¥è¦ç¨ Pluginã**

éµå¾ªååè¯´çè§å¾ï¼æä»¬å®è£ [eslint-plugin-react](https://www.npmjs.com/package/eslint-plugin-react)ï¼

```sh
npm i D eslint-plugin-react
```

æååªéç»§æ¿å®å³å¯ï¼æ³¨æè¿éç `extends` å¤§é¨åæ¶åé½å¯ä»¥æ¯ `plugin` çç¼©åçæ¬ï¼

```js
"extends": [
  "eslint:recommended",
  "plugin:react/recommended"
]
```

## ESLint x Vue

Vue å React åçï¼å®åªéè¦ä¸ä¸ª [eslint-plugin-vue](https://eslint.vuejs.org/)ï¼

```sh
npm i -D eslint-plugin-vue
```

æä»¬ä¾ç¶å¯ä»¥å¨ `overrides` ä¸­æ°å¢ä¸æ¡åªéå¯¹ `.vue` æä»¶çéç½®ï¼

```json
overrides: [
  // å¤ç vue æä»¶
  {
    files: ["**/*.vue"], // åªå¤ç vue æä»¶
    extends: ["plugin:vue/vue3-recommended"], // ä½¿ç¨ vue3 çæ¨èè§å
  }
]
```

è¿æ ·å°±å¯ä»¥å¯¹ææ `.vue` æä»¶æ§è¡ `eslint '**/*.vue' --fix` äºã

## `extends` å `plugins` çåºå«

ä¸ç¥éä½ ææ²¡æå¨ååéç½® eslint çæ¶åï¼æä¸¤ä¸ªéç½®é¡¹ä¸ç´å¾è®©äººè¿·æï¼`extends` ä»¥å `plugins`ã

ä¸¾ä¸ªä¾å­ï¼æä»¬è¦éç½® eslint x typescriptï¼å¯ä»¥çå°å®ç½æè¿æ ·çéç½®ï¼

```js
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
};
```

ç¥å¥çæ¯ï¼å½ä½ å»æ `plugins` ä¹ååç° `eslint` ä¾ç¶å¯ä»¥æ­£å¸¸å·¥ä½ãæ´ç¥å¥çæ¯ï¼åªè¦ä½ åäº `extends`ï¼é£ä¹è¿ `parser` ä¹å¯ä»¥ä¸ç¨å ï¼è¦ç¥éæ²¡ææå® `parser` éé¡¹ï¼eslint å¯çä¸æä½ ç TypeScript æä»¶ã

æä»¥è¯´ï¼å°åºæ¯ `plugins` å ä¸äº TypeScript çè½åè¿æ¯ `extends` å ä¸äº TypeScript çè§åå¢ï¼çè®©äººå¤´å¤§ï¼ç´å°ç»äºæä¸å¤©åä¸äºäºï¼ç¿»æ¾äºä¸ä¸ç½ä¸çèµæåç°äº[è¿ä¸ªå¸å­](https://stackoverflow.com/questions/61528185/eslint-extends-vs-plugins-v2020)ã

åæ¥è¯´ç»è®ºå§ï¼**æ¯ä¸ª `plugins` åªæ¯å¼å¯äºè¿ä¸ªæä»¶ï¼è `extends` åä¼ç»§æ¿å«äººåå¥½çä¸ä»½ `.eslintrc` çéç½®ï¼è¿ä»½éç½®ä¸ä»ä»åæ¬äº `rules` è¿æ `parser`ï¼`plugins` ä¹ç±»çä¸è¥¿ã**

æä»¥åå°é®é¢ï¼ä¸ºä»ä¹å¨ç»§æ¿äº `plugin:@typescript-eslint/recommended` ä¹åå°±å¯ä»¥ä¸å `plugins` å `parser` å¢ï¼å ä¸ºå«äººå·²ç»æéç½®é½æ¾å¨ `recommended` è¿ä»½éç½®è¡¨éäºï¼è¿æ ·å¯¹ä½¿ç¨çäººæ¥è¯´ï¼å°±å¯ä»¥å°åå¾å¤éç½®é¡¹äºã

ä¹å°±æ¯è¯´ï¼ä¸é¢ä¸¤ä»½éç½®æ¯ç­ä»·çï¼

```js
module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: { sourceType: "module" },
  plugins: ["@typescript-eslint"],
  extends: [],
  rules: {
    "@typescript-eslint/explicit-function-return-type": [
      "error",
      {
        allowExpressions: true
      }
    ]
  }
}
```

ä»¥å

```js
module.exports = {
  plugins: [],
  extends: ["plugin:@typescript-eslint/recommended"],
  rules: {
    "@typescript-eslint/explicit-function-return-type": [
      "error",
      {
        allowExpressions: true
      }
    ]
  }
}
```

å¯¹äºç¬¬ä¸ä»½éç½®ï¼
* éè¦æå¨æ·»å  `parser`, `parserOptions`, `plugins`
* åªå¼å¯äº `@typescript-eslint/explicit-function-return-type` ä¸ä¸ªè§å

å¯¹äºç¬¬äºä»½éç½®ï¼
* `plugin:@typescript-eslint/recommended` èªå¨æ·»å äº `parser`, `parserOptions`, `plugins`
* ä¸äºæ¨èç TypeScript ESLint è§åä¹èªå¨å ä¸äº
* åªå¯¹ `@typescript-eslint/explicit-function-return-type` è¿ä¸ªè§åè¿è¡èªå®ä¹éç½®

## èèä½ 

çå°è¿ï¼ä½ ç `.eslintrc.js` åºè¯¥å·²ç»åäºä¸å°ä»£ç äºï¼å½ç¶ç¸ä¿¡ä½ ä¹è½æ¢æ¢æ¾å° `eslint`, `plugin`, `config`, `prettier`, `parser` è¿äºå³é®è¯ä¹é´æåç»åçä¸äºè§å¾äºã

ä¸å¦¨æ¥èèä½ ï¼
* æè¦ç¨ XXX å¬å¸ç ESLint è§åéï¼åºè¯¥æ¾åªä¸ªåå­ç NPM åï¼
* æè¦è§£æ YYY è¯­æ³ï¼åºè¯¥æåªä¸ª NPM åå¢ï¼
* è¦å±è½ XXLint å·¥å·å Prettier å²çªçè§åï¼åºè¯¥ç¨åªä¸ª NPM åï¼
* è¦è®©å¤ç `.xxx` åç¼çæä»¶ï¼åºè¯¥ç¨å°åªäº NPM åå¢ï¼

å¦æä½ å¯¹ä¸é¢çé®é¢é½è½åå°å¿ä¸­ææ°ï¼é£éç½® [StyleLint](https://stylelint.io/user-guide/configure/) å°±åç®åä¸è¿äºãå®éä¸æ è®ºæ¯åªä¸ª xxlint ä»ä»¬ç NPM å½åè§å¾é½æ¯éå¸¸ç±»ä¼¼çãè¯ä¸å¤åºï¼é©¬ä¸å¼å§å­¦ä¹ ä¸ä¸ç« å§~
