package com.appdev.Jobflex.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Entity
@Table(name = "resumes")
@Getter
@Setter
public class ResumeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @OneToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

    // Professional Summary
    @Column(length = 1000)
    private String summary;

    // Skills
    @Column(length = 500)
    private String skills;

    // Education (could be stored as JSON or separate entities)
    @Column(length = 1000)
    private String education;

    // Work Experience (could be stored as JSON or separate entities)
    @Column(length = 2000)
    private String experience;

    // Certifications
    @Column(length = 500)
    private String certifications;

    // Languages
    @Column(length = 300)
    private String languages;

    // URLs
    private String portfolioUrl;
    private String linkedinUrl;
    private String githubUrl;

    // Additional Information
    @Column(length = 1000)
    private String additionalInfo;

    // Timestamp fields
    private java.util.Date createdAt;
    private java.util.Date updatedAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = new java.util.Date();
        this.updatedAt = new java.util.Date();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = new java.util.Date();
    }
}