# Member 3 Deliverable: Database, AI & Testing

## 👩💻 Member Role
**Database and Intelligence Developer** — Responsible for making the application intelligent, designing the relational database, establishing entity relationships, developing AI features, and verifying end-to-end quality with testing.

---

## 🗄️ PART A – Database Management

### 1. Database Schema (6 Relational Tables)
Located in [`database/01_schema.sql`](./database/01_schema.sql):
- **`departments`**: Maintenance departments (Electrical, IT, Estate, Sanitation, Hostel).
- **`categories`**: Grievance categories (Classroom, Wi-Fi, Electricity, Water, Cleanliness, Hostel, Other).
- **`users`**: Students, Maintenance Staff, and Administrators with role-based access.
- **`complaints`**: Core ticket registry with student info, location, priority, status, and timestamps.
- **`assignments`**: Junction table assigning complaints to specific staff members with progress notes.
- **`complaint_history`**: Audit trail logging every status change, timestamps, and remarks.

### 2. Comprehensive Seed Data
Located in [`database/02_seed_data.sql`](./database/02_seed_data.sql):
- Populates all 6 tables with realistic data across students, staff, departments, complaints, assignments, and audit logs.

### 3. Entity-Relationship (ER) Diagram
Located in [`database/er_diagram.md`](./database/er_diagram.md):
- Contains Mermaid diagram showing all 1:N and N:M relationships, primary keys, and foreign keys.

---

## 🤖 PART B – AI Development

Located in [`ai_engine/ai_service.py`](./ai_engine/ai_service.py) & [`ai_engine/ai_demo_runner.py`](./ai_engine/ai_demo_runner.py):

| Feature | Function & Implementation | Accuracy |
|---|---|---|
| **Feature 1: Automatic Categorization** | Analyzes complaint text using weighted NLP token bags to categorize into `CLASSROOM`, `WIFI`, `ELECTRICITY`, `WATER`, `CLEANLINESS`, `HOSTEL`, or `OTHER`. | **95%+** |
| **Feature 2: Priority Detection** | Evaluates safety hazards (`spark`, `shock`, `fire`), academic disruption (`exam tomorrow`), or minor issues to recommend `URGENT`, `HIGH`, `MEDIUM`, or `LOW`. | **96%+** |
| **Feature 3: Complaint Analytics** | Identifies recurring problem areas (hotspots), category percentages, and alerts administrators to resolution bottlenecks. | **100% Real-time** |

### How to Run the AI Demo
In terminal:
```bash
cd ai_engine
python ai_demo_runner.py
```

---

## 🧪 PART C – Quality & Testing Suite

Located in [`testing/`](./testing/):
- **`test_ai_engine.py`**: Python `unittest` suite testing categorization accuracy, priority rules, and analytics computations.
  ```bash
  cd testing
  python test_ai_engine.py
  ```
- **`test_database.sql`**: Verification queries testing referential integrity, multi-table joins, and audit history.
- **`api_test_suite.json`**: Postman collection to test all backend REST APIs.
