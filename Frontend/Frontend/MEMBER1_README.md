# Member 1 Deliverable: UI/UX & Frontend Development

## 👩💻 Member Role
**UI/UX Developer** — Responsible for everything users see, interact with, and experience on the web application.

---

## 📋 Completed Tasks & Deliverables

| Deliverable | Description | File Location |
|---|---|---|
| **Homepage & Hero Banner** | High-impact greeting banner with statistics and call-to-actions | [`src/App.jsx`](./src/App.jsx) |
| **Student Dashboard** | Live stats grid (Total, Pending, In Progress, Resolved) and quick-action cards | [`src/App.jsx`](./src/App.jsx) |
| **Admin Dashboard** | Dedicated administrative queue with inline status updates (Pending → In Progress → Resolved) | [`src/App.jsx`](./src/App.jsx) |
| **Complaint Submission Page** | Validated form with title, category, priority, exact location, and details | [`src/App.jsx`](./src/App.jsx) |
| **Status & Filter Queue** | Live grievance queue with status pills (Pending, In Progress, Resolved) and priority indicators | [`src/App.jsx`](./src/App.jsx) |
| **Login & Registration** | Tabbed auth interface for Students and Campus Administrators | [`src/App.jsx`](./src/App.jsx) |
| **CSS & Animations** | Modern responsive stylesheet with pulse animations, responsive media queries, and cards | [`src/styles.css`](./src/styles.css) |
| **Backend API Connection** | Full integration with Spring Boot REST endpoints on `http://localhost:8080/api` | [`src/App.jsx`](./src/App.jsx) |

---

## 🛠️ Technologies Used
- **React.js 18** (Functional components, Hooks: `useState`, `useEffect`)
- **Vite 5** (Fast frontend bundler & dev server)
- **HTML5 & CSS3** (Custom design system, flexbox, grid, keyframe animations)
- **JavaScript (ES6+)** (Async/await, Promise.all, Fetch API)

---

## 🚀 How to Run the Frontend
1. Open this folder in terminal or VS Code:
   ```bash
   cd member1-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start development server:
   ```bash
   npm run dev
   ```
4. Open **http://localhost:5173** in your browser.

---

## 🔗 Integrated Backend Endpoints
- `GET  /api/complaints` - Fetch all grievances
- `POST /api/complaints` - Submit a new grievance
- `PATCH /api/complaints/{id}/status` - Update complaint status (Admin)
- `GET  /api/dashboard/stats` - Fetch real-time count metrics
