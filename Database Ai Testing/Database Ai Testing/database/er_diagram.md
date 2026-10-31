# Entity Relationship (ER) Diagram

## Smart Campus Complaint Management System

This document describes the relational architecture, entity attributes, primary/foreign keys, and cardinalities.

---

### Mermaid ER Diagram

```mermaid
erDiagram
    DEPARTMENTS {
        int department_id PK
        string name UK
        string contact_email
        string contact_phone
        timestamp created_at
    }

    CATEGORIES {
        int category_id PK
        string name UK
        string description
        int department_id FK
        timestamp created_at
    }

    USERS {
        int user_id PK
        string name
        string email UK
        string password
        enum role "STUDENT | ADMIN | STAFF"
        int department_id FK
        string phone
        timestamp created_at
    }

    COMPLAINTS {
        bigint id PK
        int user_id FK
        string student_name
        string student_email
        string title
        string description
        enum category "CLASSROOM | WIFI | ELECTRICITY | WATER | CLEANLINESS | HOSTEL | OTHER"
        int category_id FK
        string location
        enum priority "LOW | MEDIUM | HIGH | URGENT"
        enum status "PENDING | IN_PROGRESS | RESOLVED"
        string assigned_staff
        datetime created_at
        datetime resolved_at
    }

    ASSIGNMENTS {
        int assignment_id PK
        bigint complaint_id FK
        int staff_id FK
        timestamp assigned_at
        text notes
    }

    COMPLAINT_HISTORY {
        int history_id PK
        bigint complaint_id FK
        int changed_by_user_id FK
        string old_status
        string new_status
        string remarks
        timestamp updated_at
    }

    DEPARTMENTS ||--o{ CATEGORIES : "groups"
    DEPARTMENTS ||--o{ USERS : "staff department"
    USERS ||--o{ COMPLAINTS : "submits"
    CATEGORIES ||--o{ COMPLAINTS : "categorizes"
    COMPLAINTS ||--o{ ASSIGNMENTS : "generates task"
    USERS ||--o{ ASSIGNMENTS : "assigned to"
    COMPLAINTS ||--o{ COMPLAINT_HISTORY : "logs state transitions"
    USERS ||--o{ COMPLAINT_HISTORY : "updated by"
```

---

### Relationship Cardinalities

| Parent Entity | Child Entity | Cardinality | Relationship Purpose |
|---|---|---|---|
| `DEPARTMENTS` | `CATEGORIES` | 1 to Many (1:N) | A campus department manages multiple grievance categories. |
| `DEPARTMENTS` | `USERS` | 1 to Many (1:N) | Staff users are assigned to specific maintenance departments. |
| `USERS` | `COMPLAINTS` | 1 to Many (1:N) | A student can raise multiple complaints over time. |
| `CATEGORIES` | `COMPLAINTS` | 1 to Many (1:N) | Each complaint belongs to a specific category. |
| `COMPLAINTS` | `ASSIGNMENTS` | 1 to Many (1:N) | A complaint is assigned to one or more technical staff members. |
| `USERS (Staff)` | `ASSIGNMENTS` | 1 to Many (1:N) | A staff member handles multiple assigned complaint tickets. |
| `COMPLAINTS` | `COMPLAINT_HISTORY` | 1 to Many (1:N) | Full historical log of status changes for auditing. |
