# Member 2 Deliverable: Spring Boot & Backend Development

## 👨💻 Member Role
**Java Backend Developer** — Responsible for core application functionality, REST APIs, business logic, MySQL integration, and database communication.

---

## 📋 Completed Tasks & Deliverables

| Deliverable | Description | Key File |
|---|---|---|
| **Spring Boot 3 App** | Configured with Spring Web, Spring Data JPA, and Validation | [`CampusComplaintsApplication.java`](./src/main/java/com/codespark/campus/CampusComplaintsApplication.java) |
| **User Authentication** | Registration (`/api/auth/register`) and Login (`/api/auth/login`) with role validation | [`AuthController.java`](./src/main/java/com/codespark/campus/user/AuthController.java) |
| **Complaint Submission** | Validated DTO with automated timestamp, default PENDING status | [`ComplaintController.java`](./src/main/java/com/codespark/campus/complaint/ComplaintController.java) |
| **Complaint Retrieval** | List all complaints, single complaint by ID, and filter by student email | [`ComplaintController.java`](./src/main/java/com/codespark/campus/complaint/ComplaintController.java) |
| **Status Updates** | Status patch endpoint (`PENDING` → `IN_PROGRESS` → `RESOLVED`) | [`ComplaintController.java`](./src/main/java/com/codespark/campus/complaint/ComplaintController.java) |
| **Staff Assignment** | Administrative staff assignment endpoint (`PATCH /api/complaints/{id}/assign`) | [`ComplaintController.java`](./src/main/java/com/codespark/campus/complaint/ComplaintController.java) |
| **MySQL Connection** | MySQL 8.0 connection pool with HikariCP & Hibernate update | [`application.properties`](./src/main/resources/application.properties) |
| **React Integration (CORS)** | Configured allowed origins for `http://localhost:5173` | [`CorsConfig.java`](./src/main/java/com/codespark/campus/config/CorsConfig.java) |
| **Maven Wrapper** | Cross-platform `mvnw` and `mvnw.cmd` scripts | Root folder |

---

## 🛠️ Technologies Used
- **Java 17+ / Java 25**
- **Spring Boot 3.4** (Spring MVC, Spring Data JPA, Hibernate, Validation)
- **MySQL Connector/J 9.1**
- **Apache Maven 3.9**

---

## 📖 REST API Endpoints

### 1. Authentication
- `POST /api/auth/register` — Register a student or admin
  ```json
  {
    "name": "Sowseelya",
    "email": "sowseelya@campus.edu",
    "password": "pass123",
    "role": "STUDENT"
  }
  ```
- `POST /api/auth/login` — Sign in
  ```json
  {
    "email": "sowseelya@campus.edu",
    "password": "pass123"
  }
  ```
- `GET /api/auth/staff` — List available facility staff

### 2. Complaints Management
- `GET /api/complaints` — Retrieve all complaints (newest first)
- `GET /api/complaints/{id}` — Retrieve complaint by ID
- `GET /api/complaints/student?email={email}` — Retrieve complaints for specific student
- `POST /api/complaints` — Submit complaint
  ```json
  {
    "studentName": "Aarav Sharma",
    "studentEmail": "aarav.sharma@campus.edu",
    "title": "Broken Switchboard in Lab 2",
    "description": "Loose wiring causing sparks when plugging laptops.",
    "category": "ELECTRICITY",
    "location": "IT Block, Lab 2",
    "priority": "URGENT"
  }
  ```
- `PATCH /api/complaints/{id}/status` — Change status (`PENDING`, `IN_PROGRESS`, `RESOLVED`)
  ```json
  { "status": "IN_PROGRESS" }
  ```
- `PATCH /api/complaints/{id}/assign` — Assign facility staff member
  ```json
  { "staffName": "Ramesh Kumar (Electrical Dept)" }
  ```
- `GET /api/dashboard/stats` — Metrics count (`total`, `pending`, `inProgress`, `resolved`)

---

## 🚀 How to Run the Backend
```bash
cd member2-backend
.\mvnw spring-boot:run
```
Backend runs on **http://localhost:8080**.
