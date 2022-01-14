package com.cy.service;

import java.util.List;

import com.cy.param.PlanParam;
import com.cy.utils.ResultUtils;

public interface PlanService {
	public ResultUtils GetPlanDetail(Integer post_id);
	public ResultUtils GetCast(Integer post_id);
}
