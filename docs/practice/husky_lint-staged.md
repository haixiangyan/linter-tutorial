# ð¶ Husky x LintStaged

ä¸ä¸ç« è¯´å°æä»¬ä¸è½ä¿è¯ææäººæäº¤çä»£ç é½æ¯ fix å¥½çã
æ¯å¦æçäººç»å¸¸å¿è®°å¼å¯ ESLint æä»¶ï¼æäº¤ä»£ç æ¶è¿ä»¥ä¸ºèªå·±ä»£ç åçè´¼ 6ï¼æ²¡å¥æ¥éï¼ä½å°éåé£ `git pull` æ»¡å±é½æ¯çº¢çã
æä»¥ï¼æ´å¥½çåæ³æ¯å¨ä»£ç å¥åºï¼Commit å Pushï¼çæ¶åå¯ä»¥åä¸æ¬¡ ESLint çæ£æ¥ã

æ­£å¥½ Git æä¾äºå¾å¤ [Git Hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks)ï¼

* pre-commit: æäº¤ä»£ç ååä¸äºäº
* pre-push: æ¨ä»£ç ååä¸äºäº
* pre-merge: åå¹¶ä»£ç ååä¸äºäº
* pre-rebase: rebase ååä¸äºäº
* ...

è¿äº Hooks å¯ä»¥ä½¿å¾æä»¬å¨æä½ Git çæäºé¶æ®µåä¸äºäºæã [Husky](https://github.com/typicode/husky) å¯ä»¥å¨è¿äº Git Hooks åè°æ¶æ§è¡æä»¬å®ä¹å¥½ç Bash èæ¬ã
å¦ææä»¬æ ESLint çä¿®å¤å½ä»¤æ¾å¨è¿äºç Bash èæ¬ä¸­ï¼é£å°±å¯ä»¥å®ç° Git Commit/Push/Merge/... åç ESLint èªå¨ä¿®å¤äºï¼

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ff5840b7cace468e975505b05bf24cf6~tplv-k3u1fbpfcp-zoom-1.image))

**æ³¨æï¼Husky v4 å v7 æéå¸¸å¤§çå·®å¼ï¼å¤§å®¶ä¸å®è¦æ³¨æçå«ï¼æå¥½ç´æ¥çå®ç½ï¼è¿éä½¿ç¨ææ°çè·å¤§å®¶è®²è§£ã**

```sh
# å®è£åå£«å¥
npm install husky -D
# æ·»å  prepare å½ä»¤
npm set-script prepare "husky install"
# prepare åå»º bash èæ¬ï¼å®è£ git hooks
npm run prepare
# æ·»å  pre-commit ç git hook èæ¬
npx husky add .husky/pre-commit "npx eslint src --fix"
```

è¿è¡ä¹åä¼åç°å¨ `./.husky/pre-commit` éçå° `git commit` åä¼è¿è¡çèæ¬ï¼

```sh
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# git commit åå eslint fix ä¸æ³¢
npx eslint src --fix
```

**ä½æ¯è¿æ ·çå½ä»¤ä¼è®©æ¯æ¬¡ commit åé½ææ´ä¸ª `src` é½æ«æå¹¶ fix ä¸æ¬¡ï¼éåº¦å¤ªæ¢äºï¼èä¸å¾å®¹ææå«äººçå±å±±ä¹ fix æï¼ç¶åæäº¤ä¸å»ã**

æä»¬æ´å¸æåªéå¯¹æäº¤çæä»¶è¿è¡ Lint æä½ã

## LintStaged

Prettier å¨ [ææ¡£ç Pre-commit Hook](https://prettier.io/docs/en/precommit.html) å·²ç»ä»ç»äºå¾å¤åªéå¯¹æäº¤æä»¶å fix çå·¥å·ãè¿éä»¥ [lint-staged](https://github.com/okonet/lint-staged) åä»ç»ã

```sh
# å®è£
npm i -D lint-staged
```

ç¶åæ·»å  `.lintstagedrc.js` éç½®æä»¶ï¼éé¢å¯¹æäº¤ä¸åçæä»¶è¿è¡ `eslint --fix` æä½ã

```js
module.exports = {
  '**/*.{ts,tsx,js,jsx}': [
    "eslint --cache --fix",
  ],
  "**/*.vue": [
    "eslint --cache --fix",
  ],
  "**/*.{css,less}": [
    "stylelint --cache --fix",
  ]
}
```

`lint-staged` éç½®çå«ä¹æ¯å¯¹æäº¤ä¸æ¥ä¸åç±»åçæä»¶æ§è¡å¯¹åºç lint fix å½ä»¤ã

æåå¨åååå»ºç `./.husky/pre-commit` éæ¹ææ§è¡ `lint-staged` å½ä»¤ï¼

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx lint-staged
```

ä»¥åæ¯æ¬¡ commit åé½ä¼è·ä¸æ¬¡ `lint-staged`ï¼è `lint-staged` åä¼å¯¹æäº¤çæä»¶è¿è¡ ESLint Fixã

## å½ä»¤è¡

å¦æç»å¿çåå­¦ä¼åç°ä¸é¢æå°å³äº `eslint` çèªå¨ä¿®å¤å½ä»¤ä¸å±æä¸¤æ¡ï¼`eslint src --fix` ä»¥å `eslint --cache --fix`ã

å¦æä½ ç´æ¥å¨å½ä»¤è¡éè· `eslint --fix`ï¼é£ä»ä¹äºé½ä¸ä¼åçï¼å ä¸ºä½ æ²¡ææå®è¦ fix çæä»¶ä»¥åæä»¶ç®å½ã

é£ä¸ºä»ä¹å¨ `lint-staged` éå°±å¯ä»¥ `eslint --cache --fix` å¢ï¼

**å ä¸º `lint-staged` ä¼æåé¢ç `*.{js,jsx,ts,tsx}` æ¥å¹éæäº¤çæä»¶ï¼å¹¶æå®ä»¬ä½ä¸ºåæ°ä¼ å° `eslint --cache --fix` åé¢ãæä»¥è½ç¶åçæ¯ `eslint --cache --fix` æ¶å®éä¸æ¯æ§è¡äº `eslint è¦ä¿®å¤çæä»¶ --cache --fix`ã**

## æ§è½é®é¢

æè®¸æçåå­¦ä¼åç°æ¯æ¬¡ `eslint --fix` çæ¶åè·çæç¹æ¢ï¼å¦æä½ å¨åé¢å ä¸ä¸ª `TIMING=1`ï¼

```shell
TIMING=1 eslint src --fix
```

å°±å¯ä»¥çå°åªä¸ªè§åè·äºå¤ä¹ï¼

```shell
Rule                                    | Time (ms) | Relative
:---------------------------------------|----------:|--------:
prettier/prettier                       |   207.532 |    79.8%
@typescript-eslint/no-unused-vars       |    12.738 |     4.9%
@typescript-eslint/no-floating-promises |     8.053 |     3.1%
@typescript-eslint/no-unsafe-assignment |     7.509 |     2.9%
vue/attributes-order                    |     7.424 |     2.9%
no-unused-vars                          |     1.977 |     0.8%
no-redeclare                            |     1.539 |     0.6%
react/display-name                      |     1.219 |     0.5%
no-global-assign                        |     0.873 |     0.3%
@typescript-eslint/no-unsafe-argument   |     0.795 |     0.3%
```

æ¯ç« `prettier/prettier` æ¯ä¸å¤§å ç Prettier ä»£ç é£æ ¼è§åï¼æä»¥è¯å®æ¯è·å¾æ¢çã
å½ç¶ä¹æå¾å¤äººä¼å¾å¨æè¿ä¸ªç¹ï¼æä»¥ä¹æäº [è¿ä¸ª Issue](https://github.com/prettier/eslint-plugin-prettier/issues/304) ã

ä¸è¿è¿ä¸ª Issue ä¹æ²¡è½ç»åºå¤ªå¥½çè§£å³æ¹æ¡ï¼å¦æä½ ææ´å¥½çæ¹æ¡å¯ä»¥ [å¨è¿éæ Issue](https://github.com/haixiangyan/linter-tutorial/issues) ã

## LintStaged x TypeScript

ä½ ä»¥ä¸ºå°è¿å°±å®äºä¹ï¼Too yong too simpleï¼å¦æä½ å¨ `.d.ts` å®ä¹ä¸ä¸ª `interface`ï¼

```ts
type Hello = {
  name: string;
  age: number;
};
```

ç¶åå¨å¦ä¸ä¸ª `.ts` ééè¯¯å°ä½¿ç¨å®ï¼

```ts
// æ³¨æï¼è¿éæ²¡æ import Hello æ¯æ­£å¸¸çï¼å ä¸º Hello æ¯å¨ .d.ts éå®ä¹
const hello: Hello = {
  name: "xx",
  age: 11,
  xxx: 11, // Error
};
```

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eb095ca82e004f1e8320fdb68d3e0202~tplv-k3u1fbpfcp-zoom-1.image)

**ç¶åç´æ¥å¼ºè¡ `git add ./`, `git commit -m 'update'`ï¼åç°ç«ç¶å¯ä»¥ç´æ¥éè¿èä¸æ¥éï¼**

ä¸æ¥éçåå æ¯å ä¸ºï¼**ESLint æ¬èº«å°±ä¸ä¼åç±»åæ ¡éªï¼Type Checkï¼ã** çç±å¦ä¸ï¼å·ä½å¯è§ [è¿ä¸ª Issue](https://github.com/typescript-eslint/typescript-eslint/issues/1037#issuecomment-537608227)ï¼ï¼

* ESLint åªæ¯ä½ä¸º TypeScript Type Checking çè¡¥åï¼åªå Type Checking ä¹å¤çä¸äºå·¥ä½
* å¤§å¤æ°äººç¨ TS ç Parserï¼ä½æ¯ä¸ç¨ `parserOptions.project`ï¼æä»¥è¿ç§æåµä¸ä¹ä¸è½ Type Check
* å TypeScript ç¸å¯¹å®æ´çéè¯¯æ ¡éªä¸æ¥ä½ç³»ç¸æ¯ï¼ESLint åªå®æäºä¸åçå·¥ä½

æ»çæ¥è¯´å°±æ¯ä½ ç¨ `tsc --noEmit` å°±è½åç±»åæ£æ¥ï¼ESLint å°±ä¸ç¨åéå¤é ä¸æ¬¡è½®å­äºï¼åççéç¦» Babel å¤§å¥ï¼å®å°±æ¯è½¬è¯å¨ï¼å®ä¹ä¸å TS çè¯­æ³æ ¡éªåï¼è¿æ¯ä¸ä¸ªå·¥ä½åä¸ä»¶äºçå¥½ã

![ESLint å TypeScript ä¾ç¶æ¯åè®ºåç](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e4cde3523baf49e5a5260d18f714d585~tplv-k3u1fbpfcp-zoom-1.image)

æäºåå­¦ä¼°è®¡é½ä¼æ¢ç­äºï¼æç¥éæç¥éï¼ç´æ¥å¨ `.lintstagedrc.js` éæ·»å ä¸è¡ `tsc` ä¸å°±å®äºäºï¼

```js
module.exports = {
  '**/*.{ts,tsx}': [
    "tsc", // æ£æ¥ TypeScript
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
```

**å¹´è½»äººï¼ä¾ç¶ Too young too naiveï¼è®©æä»¬èµ°è¿ä¸ä¸ç« ï¼çç `tsc` ä¼ç»æä»¬å¸¦æ¥ä»ä¹æ ·çé¾é¢å§ã**
