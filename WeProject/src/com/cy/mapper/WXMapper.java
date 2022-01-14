package com.cy.mapper;

import java.util.List;

import com.cy.param.CommentParam;
import com.cy.param.LikeParam;
import com.cy.param.WXparam;
import com.cy.po.Comment;
import com.cy.po.Dynamic;
import com.cy.po.Post;
import com.cy.po.Type;

public interface WXMapper {
	int addWXUser(WXparam wxuser);
	
	Long getWxuserByopenid(String openid);
	List<Type> GetType();
	List<Post> GetPost(Integer type_id);
	List<Dynamic> getDynamic();
	
	List<Dynamic> getDynamicById(Integer dy_id);
	
	List<Comment> getCommentById(Integer dy_id);
	
	int addComments(CommentParam param);
	
	int setLikeNum(LikeParam param);
}
