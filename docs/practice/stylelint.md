# 🧜‍♀️ StyleLint

虽然前面那么多篇文章讲得都是 ESLint 的内容，但其实都是给大家做铺垫，让大家能不仅能知其然，还能知其所然。

ESLint 再强大也只是 JavaScript 和 TypeScript 的 Linter，对样式文件 `.css`, `less`, `scss` 则需要 [StyleLint](https://stylelint.io/user-guide/configure/)。

先来安装一些必要的 NPM 包：

```sh
# StyleLint
npm i -D stylelint
# StyleLint 的 Prettier 插件，类似 eslint-plugin-prettier
npm i -D stylelint-prettier
# 禁用与 Prettier 冲突的 StyleLint 规则
npm i -D stylelint-config-prettier
# 基础规则（可选）
npm i -D stylelint-config-standard
```

配置 `.stylelintrc.js`：

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

经过刚刚 ESLint 的配置，相信你看这份配置应该没什么难度了：

* 用 Prettier 插件格式化代码
* 然后添加了 standard 以及 Prettier 的规则集，并禁用 StyleLint 一些和 Prettier 冲突的规则
* 最后开启 Prettier 规则

造一个屎山 `./src/messyCss.css` 玩去吧。

## StyleLint x Less

**不过，当要配置 less 或者 scss 还需要一点步骤。**

```sh
# StyleLint 的 Less 插件
npm i -D stylelint-less
# StyleLint 的 Less 规则
npm i -D stylelint-config-recommended-less 
# StyleLint 处理 customSyntax
npm i -D postcss-less
```

修改配置：

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

大功告成！再造个屎山 `./src/messyLess.less` 玩去吧~

只要你成功配置好了 StyleLint x Less，别的 CSS 预处理的 StyleLint 配置也是一样的，只需要吧上面的 `less` 替换掉就可以了。

官网也有介绍 [StyleLint x Scss](https://stylelint.io/ "StyleLint 官网") 的配置。

## 下一篇

这一篇非常的短，相信大家已经可以在 Linter 世界中遨游了。然而，事情并没有结束！

在日常开发中，我们不能保证所有人都会在写完代码后跑一次 Linter，有的人或许忘记开启 Linter 校验，有的人可能懒得修复，有的人可能根本就不知道有 Linter 这玩意！

所以，我们更希望可以在 `git commit` 或者 `git push` 前再做一次 Linter 操作，以此保证入库的代码都是经过修复的。下篇就是最终章了，一起来看看 Husky x lint-staged 吧。
