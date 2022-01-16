module.exports = {
  base: "/linter-guide/",
  title: "前端代码风格上手教程",
  description:
    "大多数人都知道代码风格以及 ESLint 和 Prettier，但是你真了解它们么？本教程将从历史演进以及上手实战来聊聊 Linter 的世界。",
  themeConfig: {
    logo: "/images/logo.png",
    nav: [{ text: "Github", link: "https://github.com/wecom-sidebar" }],
    sidebar: [
      {
        title: "介绍",
        collapsable: false,
        children: ["/"],
      },
      {
        title: "理论",
        collapsable: false,
        children: ["/theory/history"],
      },
      {
        title: "实战",
        collapsable: false,
        children: [
          "/practice/hello_eslint",
          "/practice/eslint_prettier",
          "/practice/eslint_typescript",
          "/practice/eslint_plugins",
          "/practice/stylelint",
          "/practice/husky_lint-staged",
          "/practice/tsc_nightmare",
        ],
      },
      {
        title: "最后",
        collapsable: false,
        children: ["/final/last", "/final/project"],
      },
    ],
  },
};
