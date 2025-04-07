package com.appdev.Trabahanap.Entity;


import jakarta.persistence.*;

@Entity
public class JobProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer progressId;

    private String status;
    private String comment;
    private String updateTime ;


    // Default constructor
    public JobProgress() {
        super();
    }

    // Parameterized constructor
    public JobProgress(Integer progressId, String status, String comment, String updateTime) {
        super();
        this.status = status;
        this.comment = comment;
        this.updateTime = updateTime;
        
    }

    public Integer getProgressId() {
		return progressId;
	}

	public void setProgressId(Integer progressId) {
		this.progressId = progressId;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public String getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(String updateTime) {
		this.updateTime = updateTime;
	}

}
	
