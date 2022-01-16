# ESLint x Prettier

下面我们来配置 Prettier，它的作用就是格式化代码。先安装依赖：

```sh
npm i -D prettier # 安装依赖
```

然后添加 Prettier 的配置文件 `.prettierrc.json`：

```json
{}
```

**对的，你没看错 Prettier 的基础配置就是 `{}`，啥都没有。**

我们日常用的框架和库都可以分为两大类。**第一类叫你是智障（opinionated）**。框架把所有的设计、规范、工具都调到最好，开发者只需要无脑用就可以了，比如 Vue 和 Angular。**第二类叫你是装机猿（unopinionated）**。框架只管自己单一功能，别的需要开发者自己组装，比如 React。

这里的 Prettier 的哲学属于 **opinionated**，这个工具研发出来的本身就是为了树立一个最标准的代码风格规范，停止开发者之间的圣战。所以建议如果不是有非常强烈的个人需求，不要在 `.prettierrc.json` 加太多的配置，会有种画蛇添足的感觉。

一行命令下去：

```sh
npx prettier --write . # 别把这个 . 点漏了
```

就可以看到格式化后的漂亮代码了：

```js
// 需要格式化的代码
let x = 1
const hi = 2
const aa = 333
let y = {
  name: "Jack",
  age: 11,
};

console.log("result", x, y);

console.log(hi, aa);
```

如果只想查格式有问题，但是不想格式化代码，可以使用下面命令：

```sh
npx prettier --check .
```

## IDE 集成

每次都用命令行来修复文件肯定不现实。

```sh
npx prettier --write messyJS.js
```

幸好如今 IDE 和一些代码编辑器已经对 Prettier 做了非常好的集成，比如 WebStorm 里：

![WebStorm 配置](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/200e6acb3fce4efba1d482885ac35b3e~tplv-k3u1fbpfcp-zoom-1.image))

我习惯是不打开【保存时自动格式化】，有点耗内存。另一个选项则是 IDE 会使用 Prettier 的配置来格式化，如果不开启这个选项，那么 IDE 会按自己的风格来格式化，这里推荐开启这个选项。

说到这里，相信有的同学已经按耐不住了：IDE 格式化是按 Prettier 配置来了，但是我以前项目经常见的 `ESLint: Fix xxx` 提示咋不出现呢？

![WebStorm 的提示](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/65b2b5bf989848dc84d355dfc175e126~tplv-k3u1fbpfcp-zoom-1.image)

这个提示是 ESLint 报的提示，下面我们来讲怎么配置 ESLint x Prettier。

## ESLint 集成

先安装 `eslint-plugin-prettier` 插件：

```sh
npm i -D eslint-plugin-prettier
```

在 `.eslintrc.js` 添加 Prettier 插件：

```js
module.exports = {
  env: {
    // 支持浏览器环境
    browser: true,
    // 识别 CommonJS
    node: true,
    // 识别 ES 的代码，使用 ECMAScript 2021 自动设置 ecmaVersion parser 为 12，
    es2021: true,
  },
  extends: "eslint:recommended",
  plugins: [
    // 使用 Prettier 的代码风格规则
    // 并用 Prettier 来自动修复代码
    "prettier",
  ],
  rules: {
    // 违反 Prettier 的规则就报 error
    "prettier/prettier": "error",
  },
};
```

`plugins` 里不仅会加载 Prettier 的代码风格规则，还会用 Prettier 来自动修复违反代码风格规则的代码。

`rules` 里的配置表示违反 Prettier 规则会报 Error 错误，如果你改成 "warn" 就展示为 warning 样式。

加完配置后就会发现代码已经有对应的自动修复提示了：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f657868ee12f455592c8f187add22368~tplv-k3u1fbpfcp-zoom-1.image)

**在 ESLint 集成了 Prettier 后，在在命令行里执行 `eslint xxx.js --fix`，
那么 ESLint 就会调用 Prettier 的格式化功能来帮你格式化代码了。**

## 性能问题

如果你只执行 `eslint xxx.js --fix`，你会发现这个速度怎么这么慢，一个文件也没多少行代码，就要等个 300 400 ms，也太慢了吧。
为了查清楚谁是罪魁祸首，我们可以在命令前加一个参数 `TIMING=1`：

```shell
TIMING eslint xxx.js --fix
```

这个参数会把 ESLint 检查规则所用时间打印出来：

```shell
Rule                          | Time (ms) | Relative
:-----------------------------|----------:|--------:
prettier/prettier             |   134.891 |    97.4%
no-unused-vars                |     0.559 |     0.4%
react/display-name            |     0.417 |     0.3%
no-redeclare                  |     0.358 |     0.3%
react/no-deprecated           |     0.253 |     0.2%
no-empty                      |     0.225 |     0.2%
no-misleading-character-class |     0.125 |     0.1%
no-global-assign              |     0.125 |     0.1%
no-dupe-keys                  |     0.116 |     0.1%
no-empty-character-class      |     0.110 |     0.1%
```

会发现 `prettier/prettier` 规则所用时间最长，一个文件就用 134ms，那要修复 10 个文件就差不多 1 秒了，这是不能接受的事。

这个问题其实非常明显，但是国内的文章几乎没有提过这个问题（当然国外也没太多），可能因为大家本来就搞不清 ESLint 和 Prettier 的关系，更不知道 Plugin 和 Config 这些包要怎么搭配，
所以一遇到这种性能问题，也无从查起。 因此我也翻遍了所有的资料，只在 `eslint-plugin-prettier` 这个项目的 [这个 Issue](https://github.com/prettier/eslint-plugin-prettier/issues/304)
以及 [这个 Issue](https://github.com/prettier/eslint-plugin-prettier/issues/445) 看到相关的讨论。

不过这个讨论也没有给出太多的解决方法，只说了一个现象：**`eslint-plugin-prettier` 就是罪魁祸首，当 Prettier 集成到 ESLint 之后，ESLint 用 Prettier 规则来格式化代码就会很慢，但是将它两分开就会很快。** 比如：

```shell
prettier xxx.js --write

eslint xxx.js --fix --rule 'prettier/prettier: off' # 忽略 prettier 规则
```

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/286785911ba84226a5e34b860ea04b4d~tplv-k3u1fbpfcp-watermark.image?)

说了一堆，原来 ESLint x Prettier 一个大坑啊，那还什么鬼？诶，别急。
**一般来说，我们用 ESLint x Prettier 在 IDE 里看代码风格报错的需求远比在命令行里 `eslint --fix` 的需求要强烈很多，
所以这里性能慢一点也还 OK。**

![IDE 看错误的需求更强烈](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/06649653e5ef4202bbecb5c219ad5463~tplv-k3u1fbpfcp-zoom-1.image)

**除了一种情况是例外：使用 `lint-staged`，每次提交都要 `eslint --fix` 的时候，此时就可以换成上面两行命令了。这里后面再说。**

## 解决规则冲突

既然 Prettier 有自己代码风格，ESLint 里也有代码风格，难免会出现规则之间的冲突，比如 [在这个 Issue 里](https://github.com/prettier/eslint-plugin-prettier/issues/65 "规则冲突 Issue") 就说了在同时自动修复 `arrow-body-style` 和 `prefer-arrow-callback` 规则时，自动修复后的代码会少了个括号：

```js
// 原来的代码
function foo() {
  return isTrue && [0,1,2].map(function(num) {
    return num * 2;
  });
}
```

```js
// 格式化后的代码少了一个括号
function foo() {
  return (
    isTrue &&
    [0, 1, 2].map((num) => {
      return num * 2;
    });
  // 这里少了一个右圆括号
}
```

解决冲突的最好方法就是把对应的 rule 给禁用了：

```json
{
  "rules": {
    "arrow-body-style": "off",
    "prefer-arrow-callback": "off"
  }
}
```

要禁用别人的规则首先得继承这些规则，同时你还得经常关注以后会不会又有哪些规则冲突了。这时，**Prettier 就说了：不用关注，我来帮你维护，所以有了 [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier)。**

```sh
npm i -D eslint-config-prettier
```

这个库还提供了一种缩写版的配置：直接在 `.eslintrc.js` 中写一行配置即可完成 ESLint x Prettier 的所有配置。

```js
module.exports = {
  env: {
    // 支持浏览器环境
    browser: true,
    // 识别 CommonJS
    node: true,
    // 识别 ES 的代码，使用 ECMAScript 2021 自动设置 ecmaVersion parser 为 12，
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:prettier/recommended"
  ],
};
```

它等同于：

```js
{
  env: {
    // 支持浏览器环境
    browser: true,
    // 识别 CommonJS
    node: true,
    // 识别 ES 的代码，使用 ECMAScript 2021 自动设置 ecmaVersion parser 为 12，
    es2021: true,
  },
  // 继承 Prettier 格式化规则
  extends: [
    "eslint:recommended",
    "prettier"
  ],
  // 使用 Prettier 格式化
  plugins: ["prettier"],
  // 解决规则冲突
  rules: {
    "prettier/prettier": "error",
    "arrow-body-style": "off",
    "prefer-arrow-callback": "off"
  }
}
```

上一篇里说到看到 `eslint-config-xxx` 就相当于看到了 xxx 的规则集。这里也同样适用：**`eslint-config-prettier` 可以看成 Prettier 的代码风格规则集。只不过这里的作用是禁用掉一些和 Prettier 有冲突的规则。**

现在我们不妨脑洞大开一下：那既然后缀的 `xxx` 可以改，那前缀的 `eslint` 是否也可以改呢，是否也有一些 `xxx-config-prettier` 呢？**猜得不错，除了它，还有俩：**

* [tslint-config-prettier](https://github.com/prettier/tslint-config-prettier): 禁用和 Prettier 冲突的 TSLint 规则
* [stylelint-config-prettier](https://github.com/prettier/stylelint-config-prettier): 禁用和 Prettier 冲突的 StyleLint 规则

不过呢，也仅有这两个库了。说明我们的 Prettier 之旅还没结束呢！接下来我们顺着 ESLint x TypeScript 来继续下一篇文章吧~
