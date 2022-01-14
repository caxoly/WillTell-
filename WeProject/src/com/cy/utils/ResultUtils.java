package com.cy.utils;

import org.springframework.stereotype.Component;

@Component
public class ResultUtils {
	private Integer code ;
	private Object obj;
	public Integer getCode() {
		return code;
	}
	public void setCode(Integer code) {
		this.code = code;
	}
	public Object getObj() {
		return obj;
	}
	public void setObj(Object obj) {
		this.obj = obj;
	}

}
