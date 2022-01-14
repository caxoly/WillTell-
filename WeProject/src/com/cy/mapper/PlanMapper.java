package com.cy.mapper;

import java.util.List;

import com.cy.param.CastParam;
import com.cy.param.PlanParam;


public interface PlanMapper {
	public PlanParam GetPlanDetail(Integer post_id);
	public CastParam GetCast(Integer post_id);

}
