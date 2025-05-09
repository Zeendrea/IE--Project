package com.appdev.Jobflex.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;
import java.time.ZoneId;

@Entity
@Table(name = "job_posts")
@Getter
@Setter
public class JobPostEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String title;
    private String company;
    private String location;
    private String pay;
    private String jobType;
    private String shiftAndSchedule;

    // Category field - Tech, Healthcare, Finance, Engineering, Remote, etc.
    @Column(nullable = true)
    private String category;

    // Status field with default value
    @Column(nullable = false)
    private String status = "OPEN";

    // Timestamp for when the job was posted
    @Column(nullable = false)
    private LocalDateTime postedDate = LocalDateTime.now(ZoneId.systemDefault());

    @Lob
    @Column(length = 1000)
    private String description;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity employer;
}