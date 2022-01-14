var util = require("./utils/util.js");
class DataBase{
  //构造函数
  constructor(id){
    this.id=id;
  }
  //获取所有star页面的数据
  getAllStar(){
    var data = wx.getStorageSync('starList');
    if (!data) {
      data = require('./data.js').starList;
      this.execStorage(data);
    }
    return data;
    }
    //根据starid获取star
    getStarById(){
      var star = this.getAllStar();
      for (let i = 0; i < star.length; i++) {
        if (star[i].starId==this.id) {
          return{
            star:star[i],
            index:i            
          }
        }     
        
      }     
    }

    //获取动态的评论
    getComments(){
      //获取当前的动态
      var star = this.getStarById().star;
      star.comments.sort(this.compratecomment);
      for (let i = 0; i < star.comments.length; i++) {    //将评论的时间转成yy-mm-yy
       star.comments[i].create_time = util.getDiffTime(star.comments[i].create_time,true);
      }

      return star.comments;
    }

    //判断评论发表时间的先后顺序，优先显示最新发布的评论
    compratecomment(c1,c2){
      var len = c1.create_time-c2.create_time;
      if (len>0) {
        return -1;
      }else if (len<0) {
        return 1;
      } else {
        return 0;
      }
    }

    //给星球页点赞或取消点赞
    jumpUp(){
      return this.opreateStar('jumpUp');
    }

    //评论
    comment(content){
      return this.opreateStar('comment',content);
    }
   
    //更新本地的点赞，评论信息，cate表示类型为点赞或评论
    opreateStar(cate,data){
      //获取当前star数据
      var star = this.getStarById();
     //获取所有star数据
      var allStar = this.getAllStar();
      switch (cate) {
        case 'jumpUp':
          //根据当前文章的点赞状态更改当前文章的点赞数
          if (star.star.upStatus) {
            star.star.upNum--;
          }else{
            star.star.upNum++;
          }
          star.star.upStatus=!star.star.upStatus; 
        break; 
       case 'comment':
         //将新评论存储，并评论数+1
          star.star.comments.push(data);
          // star.star.commentNum++;
        break;
      }
      //在所有文章中获取当前文章并更新数据
      allStar[star.index]=star.star;
      //更新缓存
      this.execStorage(allStar);
      return star.star;
    }
    
    //获取所有main页面的数据
    getAllMain(){
      var data = wx.getStorageSync('mianList');
      console.log(data)
      if (!data) {
        data = require('./data.js').mainList;
        this.execStorage(data);
      }
      return data;
      }

      //更新缓存
      execStorage(data){
        wx.setStorageSync('starList', data);
        wx.setStorageSync('mianList', data);
      }
}  
export{DataBase}