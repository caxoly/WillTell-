var data = require("../../../data.js");

var util = require('../../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    starList:[],
    leftList:[],
    rightList:[],
    baseImg:app.globalData.baseImg
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideNavigationBarLoading();
    wx.setNavigationBarTitle({
      title: '星球'
    })
    const titles = ['推荐', '关注']
    const tabs = titles.map(item => ({title: item}))
    var openid = wx.getStorageSync('openid')
    console.log(openid)
    util.http(app.globalData.localhostURL+"wx/getdynamic",null,this.opreateStar);
    this.setData({
      tabs
    })
  },

  opreateStar:function(data){
    console.log(data);
    wx.hideNavigationBarLoading();

    //调整图片的高度，让高度自适应
    var list =data;
    for(var i in list){
      list[i].width=160;  
      list[i].height=0;
    }

    //将动态数据分两列显示
    var starList = data;
    var leftList = {};
    var rightList = {};   
    for(var i in starList){
      starList[i].starId = starList[i].dy_id;     
      //将图片的字符串以|分割为图片数组
      starList[i].img = starList[i].dy_img!=null?(starList[i].dy_img.split("|")):([]);          
      if(starList[i].img.length>0){   //如果不为空则加上服务器的路径
        starList[i].img[0]=this.data.baseImg+starList[i].img[0];
      }
      starList[i].detail = starList[i].dy_detail;
      starList[i].date = util.getDiffTime(starList[i].dy_date/1000,true);
      starList[i].user_id = starList[i].ulist[0].user_id;
      starList[i].openid = starList[i].ulist[0].openid;
      //根据openid判断用户是否为当前微信用户
      if (starList[i].openid==null) {  //如果不是则加上服务器路径
        starList[i].userImg =this.data.baseImg+starList[i].ulist[0].user_img;
      }else{                            //是当前微信用户则直接使用图片的网络路径
        starList[i].userImg =  starList[i].ulist[0].user_img;
      }
      starList[i].username = starList[i].ulist[0].user_name;
      //以starId是否为2的倍数来作为划分动态显示在哪一列的标准
      if (starList[i].starId%2==0) {
        leftList[i] = starList[i]
      } else{
        rightList[i] = starList[i]
      }  
    }
    this.setData({
      starList:data,
      leftList:leftList,
      rightList:rightList
    })

   
  },

  //跳转星球详情页
  todetail:function(e){
    var id = e.currentTarget.dataset.starId;
    wx.navigateTo({
      url: '../star-detail/star-detail?starId='+id,
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

  // imageLoad: function(e) {
  //   var w = e.detail.width;    //获取图片的实际宽度
  //   var h = e.detail.height;   //获取图片的实际高度
  //   var index = e.currentTarget.dataset.index;  //获取图片下标
  //   var list = DB.getAllStar();
  //   var l = w/160;     //图片宽高比为实际宽度/实际高度
  //   list[index].height = h*l;   //图片自适应
  //   this.setData({
  //     starList:list
  //   })
  // },

  
  
})