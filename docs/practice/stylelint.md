# ð§ââï¸ StyleLint

è½ç¶åé¢é£ä¹å¤ç¯æç« è®²å¾é½æ¯ ESLint çåå®¹ï¼ä½å¶å®é½æ¯ç»å¤§å®¶åéºå«ï¼è®©å¤§å®¶è½ä¸ä»è½ç¥å¶ç¶ï¼è¿è½ç¥å¶æç¶ã

ESLint åå¼ºå¤§ä¹åªæ¯ JavaScript å TypeScript ç Linterï¼å¯¹æ ·å¼æä»¶ `.css`, `less`, `scss` åéè¦ [StyleLint](https://stylelint.io/user-guide/configure/)ã

åæ¥å®è£ä¸äºå¿è¦ç NPM åï¼

```sh
# StyleLint
npm i -D stylelint
# StyleLint ç Prettier æä»¶ï¼ç±»ä¼¼ eslint-plugin-prettier
npm i -D stylelint-prettier
# ç¦ç¨ä¸ Prettier å²çªç StyleLint è§å
npm i -D stylelint-config-prettier
# åºç¡è§åï¼å¯éï¼
npm i -D stylelint-config-standard
```

éç½® `.stylelintrc.js`ï¼

```js
module.exports = {
  "plugins": ["stylelint-prettier"],
  "extends": [
    "stylelint-config-standard",
    "stylelint-config-prettier"
  ],
  "rules": {
    "prettier/prettier": true
  }
}
```

ç»è¿åå ESLint çéç½®ï¼ç¸ä¿¡ä½ çè¿ä»½éç½®åºè¯¥æ²¡ä»ä¹é¾åº¦äºï¼

* ç¨ Prettier æä»¶æ ¼å¼åä»£ç 
* ç¶åæ·»å äº standard ä»¥å Prettier çè§åéï¼å¹¶ç¦ç¨ StyleLint ä¸äºå Prettier å²çªçè§å
* æåå¼å¯ Prettier è§å

é ä¸ä¸ªå±å±± `./src/messyCss.css` ç©å»å§ã

## StyleLint x Less

**ä¸è¿ï¼å½è¦éç½® less æè scss è¿éè¦ä¸ç¹æ­¥éª¤ã**

```sh
# StyleLint ç Less æä»¶
npm i -D stylelint-less
# StyleLint ç Less è§å
npm i -D stylelint-config-recommended-less 
# StyleLint å¤ç customSyntax
npm i -D postcss-less
```

ä¿®æ¹éç½®ï¼

```js
module.exports = {
  "plugins": ["stylelint-prettier"],
  "extends": [
    "stylelint-config-standard",
    "stylelint-config-recommended-less",
    "stylelint-config-prettier"
  ],
  "customSyntax": "postcss-less",
  "rules": {
    "prettier/prettier": true
  }
}
```

å¤§ååæï¼åé ä¸ªå±å±± `./src/messyLess.less` ç©å»å§~

åªè¦ä½ æåéç½®å¥½äº StyleLint x Lessï¼å«ç CSS é¢å¤çç StyleLint éç½®ä¹æ¯ä¸æ ·çï¼åªéè¦å§ä¸é¢ç `less` æ¿æ¢æå°±å¯ä»¥äºã

å®ç½ä¹æä»ç» [StyleLint x Scss](https://stylelint.io/ "StyleLint å®ç½") çéç½®ã

## ä¸ä¸ç¯

è¿ä¸ç¯éå¸¸çç­ï¼ç¸ä¿¡å¤§å®¶å·²ç»å¯ä»¥å¨ Linter ä¸çä¸­é¨æ¸¸äºãç¶èï¼äºæå¹¶æ²¡æç»æï¼

å¨æ¥å¸¸å¼åä¸­ï¼æä»¬ä¸è½ä¿è¯ææäººé½ä¼å¨åå®ä»£ç åè·ä¸æ¬¡ Linterï¼æçäººæè®¸å¿è®°å¼å¯ Linter æ ¡éªï¼æçäººå¯è½æå¾ä¿®å¤ï¼æçäººå¯è½æ ¹æ¬å°±ä¸ç¥éæ Linter è¿ç©æï¼

æä»¥ï¼æä»¬æ´å¸æå¯ä»¥å¨ `git commit` æè `git push` åååä¸æ¬¡ Linter æä½ï¼ä»¥æ­¤ä¿è¯å¥åºçä»£ç é½æ¯ç»è¿ä¿®å¤çï¼ä¸èµ·æ¥çç [Husky x lint-staged](./husky_lint-staged) å§ã
