module.exports = {
  dev: {
    "/ams/loginController/actionLogin.do": {
      target: "http://localhost:8080",
      changeOrigin: true,
      secure: false,
      ws: true,
    },
  },

  "/ams/commonController/selectMenuMobile.do": {
    target: "http://localhost:8080",
    changeOrigin: true,
    secure: false,
    ws: true,
  },

  "/ams/loginController/actionLogout.do": {
    target: "http://localhost:8080",
    changeOrigin: true,
    secure: false,
    ws: true,
  },
};
