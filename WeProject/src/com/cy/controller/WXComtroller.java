package com.cy.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cy.param.CommentParam;
import com.cy.param.LikeParam;
import com.cy.param.WXResult;
import com.cy.param.WXparam;
import com.cy.service.WXService;
import com.cy.utils.HttpUtils;
import com.cy.utils.ResultUtils;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@Controller
@RequestMapping("wx")
public class WXComtroller {
	@Autowired
	private ResultUtils ru;
	@Autowired
	private WXService wxs;
	
	//获取动态列表
		@RequestMapping("/getdynamic")
		@ResponseBody
		public ResultUtils getDynamic(){		
			return wxs.getDynamic();
		}
		
		//根据动态id获取对应的评论与动态详情
		@RequestMapping("/getdynamicdetail")
		@ResponseBody
		public ResultUtils getDynamicDetail(Integer dy_id){
			return wxs.getDynamicDetail(dy_id);
		}
		
		//根据openid发评论
		@RequestMapping("/addComments")
		@ResponseBody
		public ResultUtils addComments(CommentParam param){
			return wxs.addComments(param);
		}
		
		@RequestMapping("/setlikenum")
		@ResponseBody
		public ResultUtils setLikeNum(LikeParam param){
			return wxs.setLikeNum(param);
		}
		
	
	@RequestMapping("/gettype")
	@ResponseBody
	public ResultUtils GetType(){
		return wxs.GetType();
	}
	
	@RequestMapping("/getpost")
	@ResponseBody
	public ResultUtils GetPost(Integer type_id){
		return wxs.GetPost(type_id);
		
	}
	
	@RequestMapping("/wxlogin")
	@ResponseBody
	public ResultUtils wxLogin(WXparam wxuser){
		String appid="wx5f1b2f52f34fd688";
		String secret = "06dc59b9d96061f1368784c46fa46d65";
		Map<String,String> map = new HashMap<>();
		map.put("appid", appid);
		map.put("secret", secret);
		map.put("js_code", wxuser.getCode());
		map.put("grant_type", "authorization_code");
		String result = HttpUtils.sendGet("https://api.weixin.qq.com/sns/jscode2session", map);
		ObjectMapper mapper = new ObjectMapper();
		try {
			WXResult wxresult = mapper.readValue(result, WXResult.class);
			wxuser.setOpenid(wxresult.getOpenid());
			//添加到数据库
			int addResult = wxs.addWXUser(wxuser);
			if(addResult>0){
				ru.setCode(200);
				ru.setObj(wxuser.getOpenid());
			}else{
				ru.setCode(400);
				ru.setObj("数据错误");
			}
		} catch (JsonParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (JsonMappingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return ru;
	}
}
