package com.cy.po;

import java.util.List;


public class Comment {
	private Integer co_id;
	private String co_content;
	private Long create_time;
	private List<User> uslist;
	public List<User> getUslist() {
		return uslist;
	}
	public void setUslist(List<User> uslist) {
		this.uslist = uslist;
	}
	public Integer getCo_id() {
		return co_id;
	}
	public void setCo_id(Integer co_id) {
		this.co_id = co_id;
	}
	public String getCo_content() {
		return co_content;
	}
	public void setCo_content(String co_content) {
		this.co_content = co_content;
	}
	public Long getCreate_time() {
		return create_time;
	}
	public void setCreate_time(Long create_time) {
		this.create_time = create_time;
	}
	
	
}
