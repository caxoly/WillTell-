package com.cy.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cy.mapper.PlanMapper;
import com.cy.param.PlanParam;
import com.cy.service.PlanService;
import com.cy.utils.ResultUtils;

@Service
public class PlanServiceImpl implements PlanService {
	@Autowired
	private ResultUtils ru;
	
	@Autowired
	private PlanMapper pm;
	
	
	@Override
	public ResultUtils GetPlanDetail(Integer post_id) {
		// TODO Auto-generated method stub
		ru.setCode(200);
		ru.setObj(pm.GetPlanDetail(post_id));
		return ru;
	}


	@Override
	public ResultUtils GetCast(Integer post_id) {
		ru.setCode(200);
		ru.setObj(pm.GetCast(post_id));
		return ru;
	}

}
