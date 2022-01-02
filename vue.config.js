module.exports = {
  publicPath:
    process.env.NODE_ENV === "production" ? "/cherrytree-web-demo/" : "/",
  transpileDependencies: ["vuetify"],
};
