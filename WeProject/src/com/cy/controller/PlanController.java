package com.cy.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cy.param.PlanParam;
import com.cy.service.PlanService;
import com.cy.utils.ResultUtils;

@Controller
@RequestMapping("/wx")
public class PlanController {
	@Autowired
	private ResultUtils ru;
	
	@Autowired
	private PlanService ps;
	
	@RequestMapping("/getplandetail")
	@ResponseBody
	public ResultUtils GetPlanDetail(Integer post_id){
		return ps.GetPlanDetail(post_id);
	}
	
	@RequestMapping("/getcast")
	@ResponseBody
	public ResultUtils GetCast(Integer post_id){
		return ps.GetCast(post_id);
	}
	
}
