package com.appdev.Jobflex.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "job_applications")
@Getter
@Setter
public class JobApplicationEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity applicant; // the job seeker

    @ManyToOne
    @JoinColumn(name = "job_post_id")
    private JobPostEntity jobPost; // the job they applied to

    private String applicantName; // New: user.name
    private String jobTitle;       // New: jobPost.title
    private String company;

    private String applicationStatus = "Pending"; // "Pending", "Accepted", "Rejected"

    @Column(name = "date_applied")
    private LocalDate dateApplied;

    public JobApplicationEntity() {}

    public JobApplicationEntity(UserEntity applicant, JobPostEntity jobPost) {
        this.applicant = applicant;
        this.jobPost = jobPost;
        this.applicantName = applicant.getName(); // ✅ From UserEntity
        this.jobTitle = jobPost.getTitle();        // ✅ From JobPostEntity
        this.company = jobPost.getCompany();
        this.dateApplied = LocalDate.now();
    }
}
