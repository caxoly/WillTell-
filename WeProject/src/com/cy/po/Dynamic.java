package com.cy.po;

import java.util.List;

public class Dynamic {
	private Integer dy_id;
	private String dy_img;
	private String dy_detail;
	private Integer likeNum;
	private Boolean likeStatus;
	private Long dy_date;
	private List<User> ulist;
	
	public List<User> getUlist() {
		return ulist;
	}
	public void setUlist(List<User> ulist) {
		this.ulist = ulist;
	}
	
	public Integer getDy_id() {
		return dy_id;
	}
	public void setDy_id(Integer dy_id) {
		this.dy_id = dy_id;
	}
	public String getDy_img() {
		return dy_img;
	}
	public void setDy_img(String dy_img) {
		this.dy_img = dy_img;
	}
	public String getDy_detail() {
		return dy_detail;
	}
	public void setDy_detail(String dy_detail) {
		this.dy_detail = dy_detail;
	}
	public Integer getLikeNum() {
		return likeNum;
	}
	public void setLikeNum(Integer likeNum) {
		this.likeNum = likeNum;
	}
	
	public Boolean getLikeStatus() {
		return likeStatus;
	}
	public void setLikeStatus(Boolean likeStatus) {
		this.likeStatus = likeStatus;
	}
	public Long getDy_date() {
		return dy_date;
	}
	public void setDy_date(Long dy_date) {
		this.dy_date = dy_date;
	}
	
}
