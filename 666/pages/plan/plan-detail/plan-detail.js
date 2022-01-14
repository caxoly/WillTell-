// pages/plan/plan-detail/plan-detail.js
import util from "../../../utils/util.js";
require("../../../utils/util.js")
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    isbottom:true,
    planStatus:true,
    post:[],
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
    data.price= data.price.split("|");
    for(var i in data.price.length){
      data.price =data.price[i];
    }
    data.post_img=app.globalData.baseImg+data.post_img;
    data.teacher_img=app.globalData.baseImg+data.teacher_img;
    data.pd_img=app.globalData.baseImg+data.pd_img;
    this.setData({
      post:data
    })
  },

// 弹窗显示
  popup() {
    this.setData({
      show: true,
      isbottom:false,
    })
  },
  exit() {
    this.setData({show: false,isbottom:true,})
  },

  // 加入计划与取消计划的动态提示
  joinplan:function(){
    this.setData({
      'planStatus': !this.data.planStatus,
    })
    wx.showToast({
      title:this.data.planStatus?"已取消":"加入成功",
      duration:1000,
      icon:"success",
      mask:true
    }) 
  },

  // 预览的页面跳转
  yulan:function(){
    var id = this.post_id;
    wx.navigateTo({
      url: '../../plan/plan-preview/plan-preview?post_id='+id,
    })
  },

 
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    if(res.from==='button'){
      console.log(res.target,res)
    }
    return{
      title:"一起打卡学习，每天进步一点点！",
    }
  }
})