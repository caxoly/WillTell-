// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var openid = wx.getStorageSync('openid');
    if(openid){
      wx.switchTab({
        url: '../main/main/main',
      })
    }
  },

  bindgetuserinfo:function(e){
    var _this = this;
    wx.getUserProfile({
      desc: 'desc',
      success(res) {      
        var user = {};
        user.like_name = res.userInfo.nickName;
        user.user_img = res.userInfo.avatarUrl;
        wx.login({
        success:function(res){
          console.log(res);
          user.code = res.code;
          require("../../utils/util.js").http("http://localhost:8080/WeProject/wx/wxlogin",user,_this.loginopreate);
        }
      })
    }
  })
},
  loginopreate:function(data){
    console.log(data)
    wx.setStorageSync('openid', data);
    
    wx.switchTab({
      url: '../main/main/main',
    })
  },

})