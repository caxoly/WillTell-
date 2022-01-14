// pages/plan/plan-broadcast/plan-broadcast.js
import util from "../../../utils/util.js";
require("../../../utils/util.js")
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cast:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var post_id=options.post_id;
    util.http(app.globalData.localhostURL+"wx/getcast?post_id="+post_id,{post_id:post_id},this.opreatePost);

  },

  opreatePost:function(data){
    console.log(data);
    data.post_img=app.globalData.baseImg+data.post_img;
    data.cast_img=app.globalData.baseImg+data.cast_img;
    this.setData({
      cast:data
    })
  },





  
})