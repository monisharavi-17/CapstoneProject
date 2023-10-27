package com.example.demo.entity;

import org.springframework.stereotype.Component;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Component
@Entity
@Table(name="logs")
public class logs {
	@Id
	private String timestamp;
	private String salesman;
	private String stagebefore;
	private String stageafter;
	private String log;
	private boolean type;
	private String message;
	private String teamname;
	private int teamid;
	private int leadid;
	public int getLeadid() {
		return leadid;
	}
	public void setLeadid(int leadid) {
		this.leadid = leadid;
	}
	public String getTimestamp() {
		return timestamp;
	}
	public void setTimestamp(String timestamp) {
		this.timestamp = timestamp;
	}
	public String getSalesman() {
		return salesman;
	}
	public void setSalesman(String salesman) {
		this.salesman = salesman;
	}
	public String getStagebefore() {
		return stagebefore;
	}
	public void setStagebefore(String stagebefore) {
		this.stagebefore = stagebefore;
	}
	public String getStageafter() {
		return stageafter;
	}
	public void setStageafter(String stageafter) {
		this.stageafter = stageafter;
	}
	public String getLog() {
		return log;
	}
	public void setLog(String log) {
		this.log = log;
	}
	
	public boolean isType() {
		return type;
	}
	public void setType(boolean type) {
		this.type = type;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public String getTeamname() {
		return teamname;
	}
	public void setTeamname(String teamname) {
		this.teamname = teamname;
	}
	public int getTeamid() {
		return teamid;
	}
	public void setTeamid(int teamid) {
		this.teamid = teamid;
	}

}
