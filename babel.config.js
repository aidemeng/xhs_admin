//babel.config.js
module.exports = {
  presets: ["next/babel"],
  plugins: [
      [
          "import",
          {
              libraryName: "antd",
              libraryDirectory: "lib",
              style: function (name) {
                  // console.log(name);
                  return `${name}/style/index.css`;
              },
          },
      ],
      [
          "import",
          {
              libraryName: "@ant-design/icons",
              libraryDirectory: "lib/icons",
              camel2DashComponentName: false,
          },
          "@ant-design/icons",
      ],
  ],
};