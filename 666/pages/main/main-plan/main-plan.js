
import util from "../../../utils/util.js";
require("../../../utils/util.js")
var app = getApp();
Page({
    
  /**
   * 页面的初始数据
   */
  data: {
    bannerList:[],
    type:[],
    postList:[],
    baseImg:app.globalData.baseImg
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var bannerList = ['../../images/plan/planBanner1.png',
    '../../images/plan/planBanner2.png','../../images/plan/planBanner3.png',
    '../../images/plan/planBanner4.png','../../images/plan/planBanner5.png']
    this.setData({
      bannerList
    })
    const titles = []
    this.title = titles
    const tabs = titles.map(item => ({title: item}))
    this.tabs = tabs
    var type_id = 3
    console.log(this.opreateType.title)
    util.http(app.globalData.localhostURL+"wx/gettype",{},this.opreateType);
    util.http(app.globalData.localhostURL+"wx/getpost?type_id="+type_id,{type_id:type_id},this.opreatePost);
  },

  opreateType:function(data){
    // console.log(data);
    // 获取type_name
    var new_arr = data.map(obj => {return obj.type_name})
    console.log(new_arr)
    this.title =[new_arr[0],new_arr[4]]
    this.tabs = this.title.map(item => ({title: item}))
    // console.log(this.tabs)
    this.setData({
      tabs:this.tabs,
      type:data
    })
  },

  opreatePost:function(data){
    for(var i in data){
      data[i].post_card=data[i].post_card.split("|");
      for(var j in data[i].post_card.length){
        data[i].post_card = data[i].post_card[j];
      }
      data[i].post_img=this.data.baseImg+data[i].post_img
    }
    this.setData({
      postList:data
    })
  },

  // 跳转详情页面
  immediately:function(event){
    var id = event.currentTarget.dataset.postId;
    wx.navigateTo({
      url: '../../plan/plan-detail/plan-detail?post_id='+id
    })
  },

  onTabCLick(e) {
    const index = e.detail.index
    this.setData({activeTab: index})
  },

  onChange(e) {
    const index = e.detail.index
    this.setData({activeTab: index})
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '计划'
    })
  },

  

})