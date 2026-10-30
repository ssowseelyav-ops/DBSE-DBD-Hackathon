# CampusCare – Smart Campus Complaint Management System

## 1. Project Overview

CampusCare is a web-based Smart Campus Complaint Management System designed to help students report campus-related problems and enable administrators to manage, track, and resolve complaints efficiently.

The system provides a centralized platform where students can submit complaints regarding classroom facilities, Wi-Fi connectivity, electricity, water supply, cleanliness, and hostel maintenance.

It helps improve communication between students and campus administration while ensuring transparency in complaint resolution.

## 2. Problem Statement

In many educational institutions, students face difficulties reporting campus-related issues and tracking their resolution.

Traditional complaint systems often lack proper tracking, transparency, and centralized management.

CampusCare aims to solve these problems through a digital complaint management platform.

## 3. Objectives

* Provide an easy platform for students to submit complaints.
* Maintain centralized complaint records.
* Allow administrators to manage and assign complaints.
* Track complaint status.
* Improve communication between students and departments.
* Identify urgent complaints.
* Generate complaint analytics and reports.

## 4. Main Features

### Student Module

* Student registration and login.
* Submit complaints.
* Select complaint categories.
* Add complaint descriptions and locations.
* Upload supporting images (planned feature).
* Track complaint status.
* View complaint history.

### Admin Module

* Admin login.
* View all complaints.
* Manage student complaints.
* Assign complaints to departments.
* Update complaint priorities.
* Monitor complaint status.
* View dashboard statistics.

### Department Module

* View assigned complaints.
* Update complaint status.
* Add resolution details.
* Manage assigned tasks.

### AI Features (Planned)

* Automatic complaint categorization.
* Intelligent priority detection.
* Complaint analytics.
* Identification of frequently reported campus issues.

## 5. Technology Stack

| Component               | Technology                  |
| ----------------------- | --------------------------- |
| Frontend                | React.js                    |
| Styling                 | HTML, CSS, Bootstrap        |
| Backend                 | Java                        |
| Framework               | Spring Boot                 |
| Database                | MySQL                       |
| Database Connectivity   | Spring Data JPA / Hibernate |
| API Communication       | REST APIs                   |
| AI Component            | Python                      |
| API Testing             | Postman                     |
| Development Environment | VS Code / IntelliJ IDEA     |

Java Spring Boot is the primary backend technology. Python is used only as a supporting AI component.

## 6. System Architecture

The application follows a three-tier architecture.

1. Presentation Layer – React.js frontend.
2. Application Layer – Java Spring Boot backend.
3. Database Layer – MySQL database.

### Architecture Flow

Student / Admin
|
v
React.js Frontend
|
v
Spring Boot REST APIs
|
v
MySQL Database
|
v
Python AI Component (Optional)

## 7. Database Design

The database is named `campus_complaints`.

The planned database consists of the following tables:

| Table Name        | Description                                 |
| ----------------- | ------------------------------------------- |
| users             | Stores student, admin and staff information |
| departments       | Stores department information               |
| categories        | Stores complaint categories                 |
| complaints        | Stores complaint details                    |
| assignments       | Stores staff complaint assignments          |
| complaint_history | Stores complaint status history             |

## 8. Complaint Categories

The system supports the following complaint categories:

* Classroom
* Wi-Fi
* Electricity
* Water
* Cleanliness
* Hostel
* Other

## 9. Complaint Status

Every complaint can have one of three statuses:

* PENDING
* IN_PROGRESS
* RESOLVED

## 10. Team Responsibilities

### Member 1 – Frontend Development

* Develop React.js user interface.
* Design student dashboard.
* Design admin dashboard.
* Create complaint submission forms.
* Display complaint status.
* Integrate frontend with backend APIs.

### Member 2 – Backend Development

* Develop Java Spring Boot application.
* Create REST APIs.
* Implement complaint management logic.
* Implement authentication.
* Handle department assignments.
* Connect backend with MySQL.

### Member 3 – Database, AI and Testing

* Design and manage MySQL database.
* Create database tables and relationships.
* Prepare database ER diagram.
* Develop Python-based complaint categorization.
* Implement priority detection.
* Generate complaint analytics.
* Test APIs and database integration.
* Prepare technical documentation.

## 11. Expected Outcomes

* Faster complaint registration.
* Centralized complaint management.
* Better communication between students and administration.
* Improved complaint tracking.
* Better identification of campus problems.
* Data-driven administrative decisions.

## 12. Future Enhancements

* Email notifications.
* Real-time complaint tracking.
* Image-based complaint analysis.
* AI-powered complaint recommendations.
* Mobile application.
* Advanced analytics dashboard.

## 13. Project Conclusion

CampusCare aims to create a smarter and more transparent campus environment by providing an efficient digital platform for complaint registration, tracking, and resolution.

By combining React.js, Java Spring Boot, MySQL, and optional Python-based intelligence, the system provides a foundation for improving campus administration and student satisfaction.

**CampusCare – Report It. Track It. Resolve It.**
