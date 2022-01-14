import util from "../../../utils/util.js";
require("../../../utils/util.js")
var app = getApp();
Page({
  
  
  /**
   * 页面的初始数据
   */
  data: {
    indicatordots:false,
    type:[],                      
    postList:[],
    baseImg:app.globalData.baseImg
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var type_id = 1;
    util.http(app.globalData.localhostURL+"wx/gettype",{},this.opreateType);
    util.http(app.globalData.localhostURL+"wx/getpost?type_id="+type_id,{type_id:type_id},this.opreatePost);
  },

  opreateType:function(data){
    this.setData({
      tabs:data,
      type:data
    })
  },

  opreatePost:function(data){
    console.log(data);
    for(var i in data){
      data[i].post_card=data[i].post_card.split("|");
      for(var j in data[i].post_card.length){
        data[i].post_card = data[i].post_card[j];
      }
      data[i].post_img=this.data.baseImg+data[i].post_img
    }
    this.setData({
      postList:data,
    })
  },

 
// 跳转详情页面
  immediately:function(event){
    var id = event.currentTarget.dataset.postId;
    wx.navigateTo({
      url: '../../plan/plan-detail/plan-detail?post_id='+id
    })
  },
  //跳转广播通知页面
  toMainInfrom:function(){
    wx.navigateTo({
      url: '../main-inform/main-inform'
    })
  },
  //跳转小店页面
  toshop:function(){
    wx.navigateTo({
      url: '../main-shop/main-shop'
    })
  },
  //跳转计划列表页
  toPlan:function(){
    wx.navigateTo({
      url: '../main-plan/main-plan'
    })
  },
  //跳转自习列表页
  toLearn:function(){
    wx.navigateTo({
      url: '../main-learn/main-learn'
    })
  },
  onTabCLick(e) {
    const index = e.detail.index
    this.setData({activeTab: index})
  },

  onChange(e) {
    const index = e.detail.index
    this.setData({activeTab: index});
    var type_id = this.data.tabs[index].type_id;
    util.http(app.globalData.localhostURL+"wx/getpost?type_id="+type_id,{type_id:type_id},this.opreatePost);
  },

  

  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '趁早行动',
    })
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