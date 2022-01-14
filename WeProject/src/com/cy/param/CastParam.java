package com.cy.param;

import org.springframework.stereotype.Component;

@Component
public class CastParam {
	private String post_name;
	private String post_img;
	private String cast_img;
	private String cast_text;
	public String getPost_name() {
		return post_name;
	}
	public void setPost_name(String post_name) {
		this.post_name = post_name;
	}
	public String getPost_img() {
		return post_img;
	}
	public void setPost_img(String post_img) {
		this.post_img = post_img;
	}
	public String getCast_img() {
		return cast_img;
	}
	public void setCast_img(String cast_img) {
		this.cast_img = cast_img;
	}
	public String getCast_text() {
		return cast_text;
	}
	public void setCast_text(String cast_text) {
		this.cast_text = cast_text;
	}
//	public Integer getCast_id() {
//		return cast_id;
//	}
//	public void setCast_id(Integer cast_id) {
//		this.cast_id = cast_id;
//	}
	
}
