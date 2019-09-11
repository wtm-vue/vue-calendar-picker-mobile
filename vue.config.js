module.exports = {
  css: {
    extract: false
  },
  configureWebpack: {
    externals: {
      vue: "Vue",
      moment: "moment"
    }
  }
}
