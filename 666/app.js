// app.js
App({
  onLaunch() {
    var starList = wx.getStorageSync('starList');
    var mainList = wx.getStorageSync('mainList');
    if (!starList) {
      wx.clearStorageSync();
      wx.setStorageSync('starList', require('data.js').starList);
    }
    if (!mainList) {
      wx.clearStorageSync();
      wx.setStorageSync('mainList', require('data.js').mainList);
    }
  },
  globalData: {
    userInfo: null,
    baseImg:"http://localhost:8080/WeProject/static/images/",
    localhostURL:"http://localhost:8080/WeProject/"
  }
})
