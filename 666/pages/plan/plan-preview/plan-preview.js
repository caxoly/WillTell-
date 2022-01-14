// pages/plan/plan-preview/plan-preview.js
import util from "../../../utils/util.js";
require("../../../utils/util.js")
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isshow:false,
    isHide:true,
    Strudes:true,
    post:[],
    islistshow:false,
    isDay1:true,
    list:99,
    isDay:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var post_id= options.post_id;
    this.post_id = post_id;
    util.http(app.globalData.localhostURL+"wx/getplandetail?post_id="+post_id,{post_id:post_id},this.opreatePost);
  },

  opreatePost:function(data){
    console.log(data);
    data.post_img=app.globalData.baseImg+data.post_img;
    this.setData({
      post:data
    })
  },

  showlist1:function(){
    var onelist = 19;
    this.data.list = onelist ;
    var list = this.data.list
    this.setData({
      isShow:!this.data.isShow,
      isHide:!this.data.isHide,
      Strudes:!this.data.Strudes,
      isDay:true,
      list:list,
    })
  },

  showlist2:function(){
    var onelist = [19, 20, 21, 22, 23, 24, 25,26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38];
    this.data.list = onelist ;
    var list = this.data.list;
    this.setData({
      isShow:!this.data.isShow,
      isHide:!this.data.isHide,
      Strudes:!this.data.Strudes,
      isDay:false,
      list:list,
    })
  },

  showlist3:function(){
    var onelist = [39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58];
    this.data.list = onelist ;
    var list = this.data.list;
    this.setData({
      isShow:!this.data.isShow,
      isHide:!this.data.isHide,
      Strudes:!this.data.Strudes,
      isDay:false,
      list:list,
    })
  },

  showlist4:function(){
    var onelist = [59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78];
    this.data.list = onelist ;
    var list = this.data.list;
    this.setData({
      isShow:!this.data.isShow,
      isHide:!this.data.isHide,
      Strudes:!this.data.Strudes,
      isDay:false,
      list:list,
    })
  },
  showlist5:function(){
    var onelist = [79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98];
    this.data.list = onelist ;
    var list = this.data.list;
    this.setData({
      isShow:!this.data.isShow,
      isHide:!this.data.isHide,
      Strudes:!this.data.Strudes,
      isDay:false,
      list:list,
    })
  },



  showother:function(){
    this.setData({
      isShow:!this.data.isShow,
      isHide:!this.data.isHide,
      Strudes:!this.data.Strudes,
    })
  },
  nextyu:function(){
    var id = this.post_id;
    wx.navigateTo({
      url: '../../plan/plan-broadcast/plan-broadcast?post_id='+id,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})