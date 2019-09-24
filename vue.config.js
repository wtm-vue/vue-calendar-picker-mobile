console.log("当前环境", process.env.NODE_ENV)
module.exports = {
  css: {
    extract: false
  },
  configureWebpack:
    process.env.NODE_ENV === "production"
      ? {
          externals: {
            vue: "Vue",
            moment: "moment"
          }
        }
      : {}
}
