# JobFlex - System Overview

## Table of Contents
- [Project Overview](#project-overview)
- [System Flow](#system-flow)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Usage Guide](#usage-guide)
  - [User Registration & Authentication](#user-registration--authentication)
  - [Job Listings & Applications](#job-listings--applications)
  - [Profile Management](#profile-management)
  - [Role Management](#role-management)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [Job Listings](#job-listings)
  - [User Management](#user-management)
- [Security](#security)
- [Future Improvements](#future-improvements)

## Project Overview
**JobFlex** is an online job marketplace where job seekers can create profiles, apply for jobs, and track applications. Employers can post job openings and manage the hiring process. The platform offers a seamless experience with secure authentication, user management, and job listing capabilities. It integrates both a web and mobile version to cater to users across different platforms.

- **Frontend**: React for web-based user interface
- **Backend**: Spring Boot with JWT/OAuth for authentication and MySQL/Firebase for data storage
- **Mobile**: Android app using Kotlin and Firebase integration

## System Flow
1. **User Registration & Authentication**:
   - Job seekers and employers register by providing their details or authenticate via Google OAuth.
   - Once authenticated, users are granted access to the platform, where they can manage their profiles and interact with job listings.

2. **Job Listings**:
   - Employers can create job postings, detailing the role, requirements, and other relevant information.
   - Job seekers can search, browse, and apply for jobs listed on the platform.

3. **Profile Management**:
   - Users can edit their profiles, upload images, update contact details, and modify other information.

4. **Role-based Access**:
   - The system includes multiple roles, such as "Admin," "Employer," and "Job Seeker," with different levels of access and permissions.

## Features
- **User Authentication**: Google OAuth login, user registration with email/password.
- **Job Listings**: Employers can post job openings; job seekers can search and apply.
- **Profile Management**: Users can edit profiles, update contact information, and upload images.
- **Role Management**: Admins can manage user roles, update job listings, and delete users.
- **Secure API**: Communication is secured with JWT for sessions and OAuth2 for authentication.
  
## Technologies Used
- **Frontend**:
  - **React** with **Material UI** for the user interface
  - **Axios** for API requests
  - **Tailwind CSS** for styling
  
- **Backend**:
  - **Spring Boot** for the backend framework
  - **Spring Security** for OAuth2 authentication
  - **JWT** for session management
  - **MySQL** (for Web version) and **Firebase** (for Mobile version) as databases
  - **JPA/Hibernate** for ORM
  
- **Mobile**:
  - **Android Studio** for mobile app development
  - **Kotlin** for app logic and communication with backend APIs
  - **Firebase Authentication** for mobile login

## Installation

### Backend Setup
1. Clone the repository to your local machine.
   ```bash
   git clone <repository-url>
2. Navigate to the backend project directory.
   ```bash
   cd backend
3. Build the project using Maven.
   ```bash
   mvn clean install
4. Configure the application properties:


## Usage Guide

### User Registration & Authentication
- **Job Seekers & Employers** can sign up or log in using **Google OAuth**.
- **Job Seekers** can also register with their email and password if needed. After successful authentication, they are redirected to their dashboard.
- **Employers** can do the same and gain access to post job listings.

### Job Listings & Applications
- **Employers** can create new job listings with details such as:
  - Title
  - Description
  - Required qualifications
  - Salary
- **Job Seekers** can:
  - Browse available job listings
  - Apply for jobs
  - Track their application status

### Profile Management
**Job Seekers & Employers** can update their profiles. This includes:
- Changing their contact details (email, phone, address)
- Uploading or changing their profile image

### Role Management
- **Admins** can:
  - Update roles for users (e.g., converting a user from job seeker to employer)
  - Delete users

---

## API Endpoints

### Authentication
- `POST /user/login` – Log in a user via email/password or Google OAuth  
- `POST /user/add` – Register a new user  
- `POST /user/update-name` – Update the name of an existing user  
- `PUT /user/update-profile` – Update user profile details (name, email, profile image, etc.)  
- `POST /user/update-role` – Update the user role (employer, job seeker, admin)

### Job Listings
- `POST /booking/add` – Add a new job listing  
- `GET /booking/get` – Retrieve all job listings  
- `GET /booking/get/{bookingID}` – Retrieve a specific job listing by ID  
- `DELETE /booking/delete/{bookingID}` – Delete a job listing by ID

### User Management
- `GET /user/getAllUser` – Retrieve all users  
- `DELETE /user/deleteUser/{userId}` – Delete a user by ID

---

## Security


