
var util = require('../../../utils/util.js')
var app = getApp();
//点击
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow:false,  //是否显示评论
    star:[],
    comments:[],   //存储所有评论
    key:'',         //存储文本框输入的内容 
    baseImg:app.globalData.baseImg
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideNavigationBarLoading();
    var starId = options.starId;
    var openid = wx.getStorageSync('openid')
    console.log(openid)
    this.starId = starId;
    this.openid = openid;
    util.http(app.globalData.localhostURL+"wx/getdynamicdetail",{dy_id:starId},this.opreateStar);
    // util.http(app.globalData.localhostURL+"wx/addComments",{},this.opreateComment); 
  },
  //处理显示的动态详情数据与评论数据
  opreateStar:function(data){
    console.log(data)
    wx.hideNavigationBarLoading();
    //将star的字段1一对应接收的数据
    var star = data[0][0];
    star.starId =star.dy_id;
    star.upStatus = star.likeStatus;
    star.date = util.getDiffTime(star.dy_date/1000,true);
    star.detail = star.dy_detail;
    star.upNum = star.likeNum;
    //判断是否有图片，如果有则按照|分割为图片集合并进行循环显示如果没有则返回一个空的集合
    star.img =  star.dy_img!=null?(star.dy_img.split("|")):([]);
    for(var i in star.img){
      star.img[i]=this.data.baseImg+star.img[i];
    }
    
    var comments = data[1];
    for(var i in comments){
      comments[i].openid = comments[i].uslist[0].openid;
       //根据openid判断用户是否为当前微信用户
       if (comments[i].openid==null) {  //如果不是则加上服务器路径
        comments[i].avatar = this.data.baseImg+comments[i].uslist[0].user_img;
      }else{                            //是当前微信用户则直接使用图片的网络路径
        comments[i].avatar = comments[i].uslist[0].user_img;
      }
      comments[i].nickName= comments[i].uslist[0].user_name;
      comments[i].create_time= util.getDiffTime(comments[i].create_time/1000,true);
      comments[i].txt=comments[i].co_content;
    }
  
    this.setData({
      star:data[0][0],
      comments:data[1]
    })
  },
  //点击图片放大
  showImg:function(event){
    //获取点击的照片为哪张照片
    var imgIndex = event.currentTarget.dataset.imgIndex;  //获取图片下标
    var imgs = this.data.star.img;
    wx.previewImage({
      urls: imgs,
      current:imgs[imgIndex]
    })
  },
  
  //点赞
  jumpUp:function(){
     //获取更新的动态数据
     var star = this.data.star;
     console.log(star);
     var num = star.likeStatus?-1:1;
     var info={dy_id:star.dy_id,likeNum:star.likeNum,num:num,likeStatus:!star.likeStatus};
     console.log(info);
     
     util.http(app.globalData.localhostURL+"wx/setlikenum",info,this.opreateLikeNum);
  },
  opreateLikeNum:function(data){
    var star = this.data.star;
    star.likeStatus=!star.likeStatus;  //根据是否点赞的状态来对点赞数进行处理
    if (star.likeStatus) {
      star.likeNum++;
    }else{
        star.likeNum--;
    }
    star.upStatus = star.likeStatus;    
    star.upNum = star.likeNum;
    wx.showToast({
      title:star.upStatus?"点赞成功":"取消点赞",
      duration:1500,
      mask:true
    })
    star.upNum = star.upNum;
    this.setData({
      star:star
    })
  },
  //点击评论图显示评论发送框
  showSend:function(){
    this.setData({
      isShow:!this.data.isShow
    })
  },
  //获取输入框的值
  getValue:function(e){
    var input = e.detail.value;   
    input =  input.replace("妈","*")  //将敏感词汇替换为*号
    this.setData({
      key:input
    })
  },
  //发送评论
  send:function(){
    wx.hideNavigationBarLoading();
    var openid = wx.getStorageSync('openid')
    this.openid = openid;
    //用info接收参数
    var info = {dy_id:this.data.star.dy_id,openid:this.openid,create_time:parseInt(new Date().getTime()),co_content:this.data.key};
    console.log(info)
    util.http(app.globalData.localhostURL+"wx/addComments",info,this.opreateComment); 
    //获取文本框输入的内容
    var key = this.data.key;
    if (!key) {
      return;
    }
    //用提示框提示评论成功
    wx.showToast({
      title: '评论成功',
      mask:true
    })
  },
  opreateComment:function(data){   //评论后数据库更新评论表，在执行一遍根据动态id获取对应的评论方法，然后进行数据处理
    wx.hideNavigationBarLoading();
    var comments = data;
    for(var i in comments){
      comments[i].openid = comments[i].uslist[0].openid;
       //根据openid判断用户是否为当前微信用户
       if (comments[i].openid==null) {  //如果不是则加上服务器路径
        comments[i].avatar = this.data.baseImg+comments[i].uslist[0].user_img;
      }else{                            //是当前微信用户则直接使用图片的网络路径
        comments[i].avatar = comments[i].uslist[0].user_img;
      }
      comments[i].nickName= comments[i].uslist[0].user_name;
      comments[i].create_time= util.getDiffTime(comments[i].create_time/1000,true);
      comments[i].txt=comments[i].co_content;
    }
    this.setData({
      comments:comments,
      key:"",
      isShow:false
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '动态详情',
    })
  },



})