# 引子

> 本次实战的所有代码、配置已放在 [Github](https://github.com/haixiangyan/learn-prettier-linter "项目 Github") 可尽情把玩。

哈喽大家好，我是海怪。

不知道大家有没有经常遇到这样一种情况：**每次新建项目项目做代码风格的配置时总是随便找一篇文章，也不管啥意思，把 `.eslintrc.js` 的配置一抄，再把对应的 NPM 包装上就算完事了。**

诶？不想承认？那考考你：`eslint`, `prettier`, `eslint-config-prettier`, `eslint-plugin-prettier`, `prettier-eslint` 这些都是个啥关系？它们的职责是什么？

再考考你：如果想用 ESLint 和 TypeScript 结合，要用到哪些包呢？`@typescript-eslint/parser`, `@typescript-eslint/eslint-plugin`, `tslint-plugin-prettier`, `tslint-config-prettier`, `prettier-tslint` 傻傻分不清？

![](https://files.mdnice.com/user/24913/c0b0c53d-e89a-4d8f-8cbc-9307d8101917.jpg)

是不是有种“玩排列组合”的感觉？在没深入了解这些工具之前，我也很蒙逼。网上的资源也是东一块西一块的，要不只讲 Prettier，要不只讲 ESLint，
要不都不讲直接丢一个配置。 实把这些工具单独拆开来看，它们都是很简单的工具。**但是由于前端更新速度太快了，导致出现了很多相似的轮子，比如 `tslint` 和 `eslint`，
而且这些 Linter 一旦和  ES5, ES6 新旧语法、Babel 转译、JSX 等新特性结合，事情就不再简单了。**

**所以，我决定出一份收敛的教程来说清楚这些工具之间的关系，以及给出日常开发的常用配置。
而且我还希望这篇教程能让大家知其然，也能知其所然，不要抄个配置文件就走了。
如果你读完本教程再回头来看自己手头/公司项目的 `.eslintrc.js` 配置时，能够做到一点都不慌，并且心中有数，那么这个教程的目的就达到了。**

## 内容

[教程地址](https://github.yanhaixiang.com/linter-guide/)

这篇文章主要分为两部分：

* [理论篇](https://github.yanhaixiang.com/linter-guide/intro/history.html): 说清楚这些工具的历史和关系，让读者俯瞰整个工具生态
* [实战篇]()：从 0 开始配置 Linter，边实战边讲解原理，覆盖范围：ESLint x TypeScript x JavaScript x Babel x JSX x Plugin x Husky x LintStaged x StyleLint

## 花絮

这篇教程 + 项目是我花了一周的时候弄出来的。

实际上我以为只出一篇文章就能讲清楚了，
后来发现前端 Linter 衍生出来的工具实在是太多了，不弄个项目出个实战教程真的无法难某些点。然后就出了实战篇。好吧，那就出两篇文章。

可是后来随着配置的东西越来越多，踩的坑也变得越来越多，文章的字数快超过 6000 字了，对读者来说不是一个很好的阅读体验，因此拆分了章节，
最后有了这份教程。

## 支持

**原创不易，如果觉得本教程对你有帮助，希望大家多多 Star 和 Fork。
同时我也是个新人公众号号主，如果喜欢我写的内容，也欢迎关注公众号【写代码的海怪】。**

![](https://github.com/haixiangyan/haixiangyan/blob/master/%E6%89%AB%E7%A0%81_%E6%90%9C%E7%B4%A2%E8%81%94%E5%90%88%E4%BC%A0%E6%92%AD%E6%A0%B7%E5%BC%8F-%E6%A0%87%E5%87%86%E8%89%B2%E7%89%88.png)
