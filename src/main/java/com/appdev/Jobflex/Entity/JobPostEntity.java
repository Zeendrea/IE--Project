package com.appdev.Jobflex.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

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
    private String description;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity employer;



}
