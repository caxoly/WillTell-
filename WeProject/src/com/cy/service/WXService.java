package com.cy.service;

import com.cy.param.CommentParam;
import com.cy.param.LikeParam;
import com.cy.param.WXparam;
import com.cy.utils.ResultUtils;

public interface WXService {
	int addWXUser(WXparam wxuser);
	ResultUtils GetType();
	ResultUtils GetPost(Integer type_id);
	ResultUtils getDynamic();
	
	ResultUtils getDynamicDetail(Integer dy_id);
	
	ResultUtils addComments(CommentParam param);
	
	ResultUtils setLikeNum(LikeParam param);
}
