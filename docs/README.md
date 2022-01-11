# 开始

哈喽大家好，我是海怪。

不知道大家有没有经常遇到这样一种情况：**每次新建项目项目做代码风格的配置时总是随便找一篇文章，也不管啥意思，把 `.eslintrc.js` 的配置一抄，再把对应的 NPM 包装上就算完事了。**

诶？不想承认？那考考你：`eslint`, `prettier`, `eslint-config-prettier`, `eslint-plugin-prettier`, `prettier-eslint` 这些都是个啥关系？它们的职责是什么？

再考考你：如果想用 ESLint 和 TypeScript 结合，要用到哪些包呢？`@typescript-eslint/parser`, `@typescript-eslint/eslint-plugin`, `tslint-plugin-prettier`, `tslint-config-prettier`, `prettier-tslint` 傻傻分不清？

![](https://files.mdnice.com/user/24913/c0b0c53d-e89a-4d8f-8cbc-9307d8101917.jpg)

是不是有种“玩排列组合”的感觉呢？那今天这篇文章就带大家一起实战一下，将上面说到的 NPM 包和概念一网打尽！

> 本次实战的所有代码、配置已放在 [Github](https://github.com/haixiangyan/learn-prettier-linter "项目 Github") 可尽情把玩。

好了，现在就开始我们的 Linter 实战吧~

```sh
npm init -y
```
