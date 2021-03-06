# ð¤« åè¨

> æ¬æ¬¡å®æçææä»£ç ãéç½®å·²æ¾å¨ [Github](https://github.com/haixiangyan/linter-toturial "é¡¹ç® Github") å¯å°½ææç©ã

åå½å¤§å®¶å¥½ï¼ææ¯æµ·æªã

ä¸ç¥éå¤§å®¶ææ²¡æç»å¸¸éå°è¿æ ·ä¸ç§æåµï¼**æ¯æ¬¡æ°å»ºé¡¹ç®åä»£ç é£æ ¼çéç½®æ¶æ»æ¯éä¾¿æ¾ä¸ç¯æç« ï¼ä¹ä¸ç®¡å¥ææï¼æ `.eslintrc.js` çéç½®ä¸æï¼åæå¯¹åºç NPM åè£ä¸å°±ç®å®äºäºã**

è¯¶ï¼ä¸æ³æ¿è®¤ï¼é£èèä½ ï¼`eslint`, `prettier`, `eslint-config-prettier`, `eslint-plugin-prettier`, `prettier-eslint` è¿äºé½æ¯ä¸ªå¥å³ç³»ï¼å®ä»¬çèè´£æ¯ä»ä¹ï¼

åèèä½ ï¼å¦ææ³ç¨ ESLint å TypeScript ç»åï¼è¦ç¨å°åªäºåå¢ï¼`@typescript-eslint/parser`, `@typescript-eslint/eslint-plugin`, `tslint-plugin-prettier`, `tslint-config-prettier`, `prettier-tslint` æ¯ä¸æ¯æç§âç©æåç»åâçæè§ï¼å»å»åä¸æ¸ï¼

![](https://img-blog.csdnimg.cn/img_convert/b24237fe35bc194ff4bd62e45cb8ef2f.png)

## ç®ç

å¨æ²¡æ·±å¥äºè§£è¿äºå·¥å·ä¹åï¼æä¹å¾èé¼ãç½ä¸çèµæºä¹æ¯ä¸ä¸åè¥¿ä¸åçï¼è¦ä¸åªè®² Prettierï¼è¦ä¸åªè®² ESLintï¼
è¦ä¸é½ä¸è®²ç´æ¥ä¸¢ä¸ä¸ªéç½®ã

å¶å®æè¿äºå·¥å·åç¬æå¼æ¥çï¼å®ä»¬é½æ¯å¾ç®åçå·¥å·ãä½æ¯ç±äºåç«¯æ´æ°éåº¦å¤ªå¿«äºï¼å¯¼è´åºç°äºå¾å¤ç¸ä¼¼çè½®å­ï¼æ¯å¦ `tslint` å `eslint`ï¼
èä¸è¿äº Linter ä¸æ¦å  ES5, ES6 æ°æ§è¯­æ³ãBabel è½¬è¯ãJSX ç­æ°ç¹æ§ç»åï¼äºæå°±ä¸åç®åäºã


**æä»¥ï¼æå³å®åºä¸ä»½æ¶æçæç¨æ¥è¯´æ¸æ¥è¿äºå·¥å·ä¹é´çå³ç³»ï¼ä»¥åç»åºæ¥å¸¸å¼åçå¸¸ç¨éç½®ã**

ä½ å¯ä»¥è·çæç¨èªå·±æå¨éç½®ä¸æ¬¡ï¼ä¹å¯ä»¥åªæ¯ç§ç§ççãä¸ç®¡ææ ·ï¼æè¿æ¯å¸æå¤§å®¶ä¸ä»è½ç¥å¶ç¶ï¼ä¹è½ç¥å¶æä»¥ç¶ï¼ä¸è¦æä¸ªéç½®æä»¶å°±èµ°äºã
å¦æä½ è¯»å®æ¬æç¨ååå¤´æ¥çèªå·±æå¤´/å¬å¸é¡¹ç®ç `.eslintrc.js` éç½®æ¶ï¼è½å¤åå°ä¸ç¹é½ä¸æï¼å¹¶ä¸å¿ä¸­ææ°ï¼é£ä¹è¿ä¸ªæç¨çç®çå°±è¾¾å°äºã

## åå®¹

è¿ç¯æç« ä¸»è¦åä¸ºä¸¤é¨åï¼

* **çè®ºç¯**ï¼è¯´æ¸æ¥è¿äºå·¥å·çåå²åå³ç³»ï¼è®©è¯»èä¿¯ç°æ´ä¸ªå·¥å·çæ
* **å®æç¯**ï¼ä» 0 å¼å§éç½® Linterï¼è¾¹å®æè¾¹è®²è§£åçï¼è¦çèå´ï¼ESLint x TypeScript x JavaScript x Babel x JSX x Plugin x Husky x LintStaged x StyleLint

## è±çµ®

è¿ç¯æç¨ + é¡¹ç®æ¯æè±äºä¸å¨çæ¶é´å¼åºæ¥çã

å®éä¸æä»¥ä¸ºåªåºä¸ç¯æç« å°±è½è®²æ¸æ¥äºï¼
åæ¥åç°åç«¯ Linter è¡çåºæ¥çå·¥å·å®å¨æ¯å¤ªå¤äºï¼ä¸å¼ä¸ªé¡¹ç®åºä¸ªå®ææç¨ççæ æ³è§£éæäºç¹ï¼ç¶åå°±åºäºå®æç¯ãå¥½å§ï¼é£å°±åºä¸¤ç¯æç« ã

å¯æ¯åæ¥éçéç½®çä¸è¥¿è¶æ¥è¶å¤ï¼è¸©çåä¹åå¾è¶æ¥è¶å¤ï¼æç« çå­æ°å¿«è¶è¿ 6000 å­äºï¼å¯¹è¯»èæ¥è¯´ä¸æ¯ä¸ä¸ªå¾å¥½çéè¯»ä½éªï¼å æ­¤æåäºç« èï¼
æåæäºè¿ä»½æç¨ã

## åè

ä¸é¢åä¸¾æåè¿ç¯æç¨æççä¸äºåèèµæï¼å¦æå¤§å®¶æå´è¶£ä¹å¯ä»¥ **æä¸é¢ç»çé¡ºåº** è¿è¡éè¯»ï¼

* [Prettierçè¿ä¸ç¯å°±è¡äº](https://zhuanlan.zhihu.com/p/81764012) éé¾å¤§ä½¬ç Prettier æç« ï¼åçéå¸¸æ¸æ¥
* [Prettier ææ¡£](https://prettier.io/docs/en/index.html) æ¥ä¸æ¥åç Prettier ææ¡£ï¼ç»åéé¾å¤§ä½¬çæç« ä¼ææ´é«ç»´åº¦çè§è§
* [ESLint ææ¡£](https://eslint.org/) ESLint ææ¡£éå¸¸ç®éï¼åè¯´æä¹¦ä¸æ ·ï¼å¾æ èï¼ä½æ¯ä¹è¦æä¸ç¹è¦æä¹éç½®
* [TypeScript ESLint ææ¡£](https://typescript-eslint.io/) è¿ä¸ªææ¡£è¿æ¯ ESLint ææ¡£è¦å¥½ï¼éé¢è¿è¯´äºä¸äºå®è·µæè·¯ï¼æä¼ä½  Config å Plugin é½æ¯åå¥ç¨ç
* [StyleLint ææ¡£](https://stylelint.io/) ç»è¿ä¸é¢ææ¡£çæ´ç¤¼åç StyleLint ä¼è§å¾å¾ç®å
* [Husky Github](https://github.com/typicode/husky) ç¥é Husky æ¯æä¹å¨ Git Hooks æ§è¡ Bash ç
* [lint-staged Github](https://github.com/okonet/lint-staged) ç¥é Husky x lint-staged ç¨æ³

ä¸é¢ååä¸¾ä¸äºææäºå¾å¤æ¬¡çé®é¢ï¼

### LintStaged x TypeScript

* [lint-staged ignores tsconfig.json when it called through husky hooks](https://github.com/okonet/lint-staged/issues/825)
* [Build typescript on commit](https://github.com/okonet/lint-staged/issues/468)
* [How to lint for Typescript compilation issues?](https://stackoverflow.com/questions/51428789/how-to-lint-for-typescript-compilation-issues)
* [Current version incorrectly analyzes @types/node](https://github.com/gustavopch/tsc-files/issues/20)

### ESLint

* ["parserOptions.project" has been set for @typescript-eslint/parser](https://stackoverflow.com/questions/58510287/parseroptions-project-has-been-set-for-typescript-eslint-parser)
* [eslint-plugin-prettier is very slow](https://github.com/prettier/eslint-plugin-prettier/issues/304)
* [Very slow performance](https://github.com/prettier/eslint-plugin-prettier/issues/445)
* [ESLint not reporting TypeScript compiler type checking errors](https://stackoverflow.com/questions/60514929/eslint-not-reporting-typescript-compiler-type-checking-errors)
* [No actual type checking?](https://github.com/typescript-eslint/typescript-eslint/issues/1037)

## æ¯æ

**ååä¸æï¼å¦æè§å¾æ¬æç¨å¯¹ä½ æå¸®å©ï¼å¸æå¤§å®¶å¤å¤ Star å Forkã
åæ¶æä¹æ¯ä¸ªæ°äººå¬ä¼å·å·ä¸»ï¼å¦æåæ¬¢æåçåå®¹ï¼ä¹æ¬¢è¿å³æ³¨å¬ä¼å·ãåä»£ç çæµ·æªãã**

<img src="https://img-blog.csdnimg.cn/6ce461cc24c44ca58c698722d6549fe5.gif#pic_center" alt="å¬ä¼å·" width="500" >
