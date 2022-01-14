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
		//�ж�openid�Ƿ����
		Long count = wxm.getWxuserByopenid(wxuser.getOpenid());
		if (count>0) {  //�����򷵻�openid
			return 2;
		}else {		    //�����������openid�ٷ���
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
		list.add(wxm.getDynamicById(dy_id));    //��list���ո��ݶ�̬id�鵽������
		if (list!=null) {						//���list��Ϊ�գ�����ݶ�̬id��ȡ��ǰ��̬��������Ϣ����󷵻�list
			list.add(wxm.getCommentById(dy_id));
		}else {
			ru.setCode(400);
			ru.setObj("��̬��ȡʧ�ܣ������»�ȡ");
		}
		ru.setCode(200);
		ru.setObj(list);
		return ru;
	}

	@Override
	public ResultUtils addComments(CommentParam param) {
		int result = wxm.addComments(param);	   //����openid�����Ӧ��userid�������
		if (result>0) {							   //���������ӳɹ������²�ѯ�������۲���Ⱦ��ҳ����
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
			ru.setObj("�����쳣�������ع�");
			TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
		}
		ru.setCode(200);
		return ru;
	}
}
