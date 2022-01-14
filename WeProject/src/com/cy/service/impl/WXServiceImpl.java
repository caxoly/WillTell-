package com.cy.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import com.cy.mapper.WXMapper;
import com.cy.param.CommentParam;
import com.cy.param.LikeParam;
import com.cy.param.WXparam;
import com.cy.service.WXService;
import com.cy.utils.ResultUtils;

@Service
public class WXServiceImpl implements WXService{
	@Autowired
	private ResultUtils ru;
	@Autowired
	private WXMapper wxm;
	
	@Override
	public int addWXUser(WXparam wxuser) {
		//判断openid是否存在
		Long count = wxm.getWxuserByopenid(wxuser.getOpenid());
		if (count>0) {  //存在则返回openid
			return 2;
		}else {		    //不存在先添加openid再返回
			return wxm.addWXUser(wxuser);
		}
		
	}

	@Override
	public ResultUtils GetType() {
		// TODO Auto-generated method stub
		ru.setCode(200);
		ru.setObj(wxm.GetType());
		return ru;
	}

	@Override
	public ResultUtils GetPost(Integer type_id) {
		// TODO Auto-generated method stub
		ru.setCode(200);
		ru.setObj(wxm.GetPost(type_id));
		return ru;
	}
	
	@Override
	public ResultUtils getDynamic() {
		ru.setCode(200);
		ru.setObj(wxm.getDynamic());
		return ru;
	}

	@Override
	public ResultUtils getDynamicDetail(Integer dy_id) {
		List list = new ArrayList<>();
		list.add(wxm.getDynamicById(dy_id));    //用list接收根据动态id查到的详情
		if (list!=null) {						//如果list不为空，则根据动态id获取当前动态的评论信息，最后返回list
			list.add(wxm.getCommentById(dy_id));
		}else {
			ru.setCode(400);
			ru.setObj("动态获取失败，请重新获取");
		}
		ru.setCode(200);
		ru.setObj(list);
		return ru;
	}

	@Override
	public ResultUtils addComments(CommentParam param) {
		int result = wxm.addComments(param);	   //根据openid查出对应的userid添加评论
		if (result>0) {							   //如果评论添加成功则重新查询所有评论并渲染到页面上
			ru.setCode(200);
			ru.setObj(wxm.getCommentById(param.getDy_id()));
		}		
		return ru;
	}

	@Transactional
	public ResultUtils setLikeNum(LikeParam param) {
		int result = wxm.setLikeNum(param);
		if (result<0) {
			ru.setCode(400);
			ru.setObj("数据异常，即将回滚");
			TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
		}
		ru.setCode(200);
		return ru;
	}
}
