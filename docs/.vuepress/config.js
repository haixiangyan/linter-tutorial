module.exports = {
  base: "/linter-tutorial/",
  title: "Linter上手完全指南",
  description:
    "你真了解 Liner 么？本教程将从历史演进以及上手实战来聊聊 Linter 的世界。",
  head: [
    [
      "meta",
      {
        name: "keywords",
        content:
          "eslint, prettier, linter, lint-staged, 前端, 代码风格, 上手指南",
      },
    ],
    ["meta", { name: "author", content: "海怪" }],
  ],
  plugins: [
    "@vuepress/medium-zoom",
    "@vuepress/back-to-top",
    "@vuepress/active-header-links",
  ],
  themeConfig: {
    logo: "/images/logo.png",
    repo: "https://github.com/haixiangyan/linter-tutorial",
    lastUpdated: true,
    nav: [
      {
        text: "Issue",
        link: "https://github.com/haixiangyan/linter-tutorial/issues",
      },
    ],
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
          "/practice/lint-staged_tsc",
        ],
      },
      {
        title: "最后",
        collapsable: false,
        children: ["/final/project", "/final/last"],
      },
    ],
  },
};
