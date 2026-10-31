import { useEffect, useState } from 'react'

const API = 'http://localhost:8080/api'
const categories = ['CLASSROOM', 'WIFI', 'ELECTRICITY', 'WATER', 'CLEANLINESS', 'HOSTEL', 'OTHER']
const priorities = ['LOW', 'MEDIUM', 'HIGH', 'URGENT']

const emptyForm = {
  studentName: '',
  studentEmail: '',
  title: '',
  description: '',
  category: 'CLASSROOM',
  location: '',
  priority: 'MEDIUM'
}

export default function App() {
  // Navigation / View state
  const [currentTab, setCurrentTab] = useState('overview') // 'overview' | 'submit' | 'complaints' | 'auth'
  const [currentUser, setCurrentUser] = useState(null) // null | { name, email, role: 'STUDENT' | 'ADMIN' }
  const [authMode, setAuthMode] = useState('login') // 'login' | 'register'
  const [authForm, setAuthForm] = useState({ name: '', email: '', password: '', role: 'STUDENT' })

  // Complaints & dashboard state
  const [complaints, setComplaints] = useState([])
  const [stats, setStats] = useState({ total: 0, pending: 0, inProgress: 0, resolved: 0 })
  const [filterStatus, setFilterStatus] = useState('ALL')
  const [form, setForm] = useState(emptyForm)
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  async function loadData() {
    try {
      const [complaintRes, statsRes] = await Promise.all([
        fetch(`${API}/complaints`),
        fetch(`${API}/dashboard/stats`)
      ])
      if (!complaintRes.ok || !statsRes.ok) throw new Error('Backend did not respond.')
      const cData = await complaintRes.json()
      const sData = await statsRes.json()
      setComplaints(cData)
      setStats(sData)
      setError('')
    } catch {
      setError('Cannot connect to the backend. Ensure MySQL & Spring Boot (port 8080) are running.')
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  function handleFormChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleAuthChange(e) {
    setAuthForm({ ...authForm, [e.target.name]: e.target.value })
  }

  async function submitComplaint(e) {
    e.preventDefault()
    setBusy(true)
    setMessage('')
    setError('')

    const payload = {
      ...form,
      studentName: currentUser ? currentUser.name : form.studentName,
      studentEmail: currentUser ? currentUser.email : form.studentEmail
    }

    try {
      const res = await fetch(`${API}/complaints`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.message || 'Validation failed. Please check form inputs.')
      }
      const created = await res.json()
      setMessage(`🎉 Complaint #${created.id} submitted successfully! Support team has been notified.`)
      setForm(emptyForm)
      await loadData()
      setCurrentTab('complaints')
    } catch (err) {
      setError(err.message || 'Failed to submit complaint.')
    } finally {
      setBusy(false)
    }
  }

  async function updateStatus(id, newStatus) {
    try {
      const res = await fetch(`${API}/complaints/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      })
      if (!res.ok) throw new Error('Failed to update status.')
      await loadData()
      setMessage(`Complaint #${id} updated to ${pretty(newStatus)}.`)
    } catch (err) {
      setError(err.message)
    }
  }

  function handleAuthSubmit(e) {
    e.preventDefault()
    if (authMode === 'register') {
      setCurrentUser({ name: authForm.name, email: authForm.email, role: authForm.role })
      setMessage(`Account created successfully for ${authForm.name} (${authForm.role}).`)
    } else {
      const role = authForm.email.includes('admin') ? 'ADMIN' : 'STUDENT'
      setCurrentUser({
        name: authForm.email.split('@')[0].toUpperCase(),
        email: authForm.email,
        role: role
      })
      setMessage(`Welcome back! Logged in as ${role}.`)
    }
    setCurrentTab('overview')
  }

  function logout() {
    setCurrentUser(null)
    setMessage('Logged out successfully.')
  }

  const pretty = val => val ? val.replaceAll('_', ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase()) : ''

  const filteredComplaints = complaints.filter(c => {
    if (filterStatus === 'ALL') return true
    return c.status === filterStatus
  })

  return (
    <div className="app-shell">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="brand-mark">Campus<span>Care</span></div>
        <p className="side-label">WORKSPACE</p>

        <button
          className={`nav-item ${currentTab === 'overview' ? 'active' : ''}`}
          onClick={() => setCurrentTab('overview')}
        >
          ▦ <span>Dashboard Overview</span>
        </button>

        <button
          className={`nav-item ${currentTab === 'submit' ? 'active' : ''}`}
          onClick={() => setCurrentTab('submit')}
        >
          ＋ <span>Raise a Complaint</span>
        </button>

        <button
          className={`nav-item ${currentTab === 'complaints' ? 'active' : ''}`}
          onClick={() => setCurrentTab('complaints')}
        >
          ▤ <span>Live Complaint Queue</span>
        </button>

        <button
          className={`nav-item ${currentTab === 'auth' ? 'active' : ''}`}
          onClick={() => setCurrentTab('auth')}
        >
          👤 <span>{currentUser ? `${currentUser.name} (${currentUser.role})` : 'Student / Admin Login'}</span>
        </button>

        <div className="sidebar-note">
          <div className="pulse"></div>
          <span>
            Campus Support 24/7<br />
            <b>Smart Grievance Portal</b>
          </span>
        </div>

        <div className="side-foot">
          SMART CAMPUS<br />
          MVP · TEAM COLLABORATION
        </div>
      </aside>

      {/* Main App Content */}
      <main className="main-content">
        <header className="topbar">
          <div>
            <div className="eyebrow">SMART CAMPUS OPERATIONS & GRIEVANCES</div>
            <h1>Campus Complaint Management System</h1>
          </div>

          <div className="user-profile-badge">
            {currentUser ? (
              <div className="admin-chip">
                <span className="avatar">{currentUser.role === 'ADMIN' ? '🛡️' : '🎓'}</span>
                <span>
                  <b>{currentUser.name}</b>
                  <small>{currentUser.role} · <a href="#logout" onClick={logout} style={{ color: '#d34e5b' }}>Logout</a></small>
                </span>
              </div>
            ) : (
              <button className="auth-btn" onClick={() => setCurrentTab('auth')}>
                Sign In / Register
              </button>
            )}
          </div>
        </header>

        {error && <div className="alert error">{error}</div>}
        {message && <div className="alert success">{message}</div>}

        {/* ================= TAB 1: OVERVIEW DASHBOARD ================= */}
        {currentTab === 'overview' && (
          <div>
            <div className="hero-banner">
              <div>
                <h2>Welcome to CampusCare Grievance Redressal</h2>
                <p>Submit campus infrastructure, cleanliness, Wi-Fi, and classroom complaints with real-time tracking.</p>
              </div>
              <button className="hero-action-btn" onClick={() => setCurrentTab('submit')}>
                + File New Complaint
              </button>
            </div>

            <section className="stats-grid">
              <Stat label="Total Complaints" value={stats.total} icon="▤" tone="blue" />
              <Stat label="Pending Review" value={stats.pending} icon="◷" tone="amber" />
              <Stat label="In Progress" value={stats.inProgress} icon="↗" tone="violet" />
              <Stat label="Resolved" value={stats.resolved} icon="✓" tone="green" />
            </section>

            <div className="quick-info-grid">
              <div className="info-card">
                <h3>📌 Student Services</h3>
                <p>Register classroom repairs, electricity issues, water filtration, and hostel complaints in seconds.</p>
              </div>
              <div className="info-card">
                <h3>⚡ Fast Escalation</h3>
                <p>Priority markers (Urgent, High, Medium, Low) ensure campus administration handles emergencies first.</p>
              </div>
              <div className="info-card">
                <h3>🛡️ Admin Transparency</h3>
                <p>Real-time status transitions (Pending → In Progress → Resolved) visible to students and staff.</p>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: COMPLAINT FORM ================= */}
        {currentTab === 'submit' && (
          <section className="panel form-panel">
            <div className="panel-heading">
              <div>
                <div className="eyebrow">STUDENT SERVICES</div>
                <h2>Submit a Campus Complaint</h2>
                <p>Fill out the details below. Our campus facility management will address your issue promptly.</p>
              </div>
              <span className="heading-icon">＋</span>
            </div>

            <form onSubmit={submitComplaint}>
              <div className="field-row">
                <Field label="Student Full Name">
                  <input
                    name="studentName"
                    value={currentUser ? currentUser.name : form.studentName}
                    onChange={handleFormChange}
                    placeholder="e.g. Ananya Rao"
                    required
                    maxLength={100}
                    disabled={!!currentUser}
                  />
                </Field>

                <Field label="College Email">
                  <input
                    name="studentEmail"
                    type="email"
                    value={currentUser ? currentUser.email : form.studentEmail}
                    onChange={handleFormChange}
                    placeholder="you@campus.edu"
                    required
                    maxLength={150}
                    disabled={!!currentUser}
                  />
                </Field>
              </div>

              <Field label="Complaint Title">
                <input
                  name="title"
                  value={form.title}
                  onChange={handleFormChange}
                  placeholder="e.g. Projector HDMI port not working in Block A Room 204"
                  required
                  maxLength={120}
                />
              </Field>

              <div className="field-row">
                <Field label="Category">
                  <select name="category" value={form.category} onChange={handleFormChange}>
                    {categories.map(c => (
                      <option key={c} value={c}>{pretty(c)}</option>
                    ))}
                  </select>
                </Field>

                <Field label="Urgency / Priority">
                  <select name="priority" value={form.priority} onChange={handleFormChange}>
                    {priorities.map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </Field>
              </div>

              <Field label="Exact Campus Location">
                <input
                  name="location"
                  value={form.location}
                  onChange={handleFormChange}
                  placeholder="e.g. Block B, 2nd Floor, Room 204 or Central Library"
                  required
                  maxLength={180}
                />
              </Field>

              <Field label="Detailed Description">
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleFormChange}
                  placeholder="Provide specific details about the issue to help staff resolve it quickly..."
                  rows={4}
                  required
                  maxLength={2000}
                />
              </Field>

              <button className="primary-button" type="submit" disabled={busy}>
                {busy ? 'Submitting to Portal…' : 'Submit Official Complaint'} <span>→</span>
              </button>
            </form>
          </section>
        )}

        {/* ================= TAB 3: COMPLAINTS LIST / QUEUE ================= */}
        {currentTab === 'complaints' && (
          <section className="panel list-panel">
            <div className="panel-heading list-heading">
              <div>
                <div className="eyebrow">LIVE QUEUE & AUDIT</div>
                <h2>Campus Grievance Records</h2>
                <p>Filter by status and update administrative progress.</p>
              </div>

              <div className="filter-group">
                <button
                  className={`filter-pill ${filterStatus === 'ALL' ? 'active' : ''}`}
                  onClick={() => setFilterStatus('ALL')}
                >
                  All ({complaints.length})
                </button>
                <button
                  className={`filter-pill ${filterStatus === 'PENDING' ? 'active' : ''}`}
                  onClick={() => setFilterStatus('PENDING')}
                >
                  Pending ({stats.pending})
                </button>
                <button
                  className={`filter-pill ${filterStatus === 'IN_PROGRESS' ? 'active' : ''}`}
                  onClick={() => setFilterStatus('IN_PROGRESS')}
                >
                  In Progress ({stats.inProgress})
                </button>
                <button
                  className={`filter-pill ${filterStatus === 'RESOLVED' ? 'active' : ''}`}
                  onClick={() => setFilterStatus('RESOLVED')}
                >
                  Resolved ({stats.resolved})
                </button>
                <button className="refresh-button" onClick={loadData} title="Refresh Live Data">↻</button>
              </div>
            </div>

            {filteredComplaints.length === 0 ? (
              <div className="empty-state">
                <div style={{ fontSize: 40 }}>📭</div>
                <b>No complaints found under this filter</b>
                <span>New submissions will automatically populate here.</span>
              </div>
            ) : (
              <div className="complaint-list">
                {filteredComplaints.map(c => (
                  <article className="complaint-card" key={c.id}>
                    <div className="complaint-top">
                      <span className="ticket">TICKET #{c.id}</span>
                      <span className={`status status-${c.status.toLowerCase()}`}>
                        {pretty(c.status)}
                      </span>
                    </div>

                    <h3>{c.title}</h3>
                    <p className="complaint-description">{c.description}</p>

                    <div className="meta-line">
                      <span>📍 {c.location}</span>
                      <span>🏷️ {pretty(c.category)}</span>
                      <span>🕒 {c.createdAt ? new Date(c.createdAt).toLocaleDateString() : 'Recent'}</span>
                    </div>

                    <div className="card-bottom">
                      <span className={`priority priority-${c.priority.toLowerCase()}`}>
                        ● {pretty(c.priority)} Priority
                      </span>

                      {/* Admin Status Change Control */}
                      <div className="admin-action-row">
                        <label className="admin-status-label">Update Status:</label>
                        <select
                          value={c.status}
                          onChange={e => updateStatus(c.id, e.target.value)}
                        >
                          <option value="PENDING">Pending</option>
                          <option value="IN_PROGRESS">In Progress</option>
                          <option value="RESOLVED">Resolved</option>
                        </select>
                      </div>
                    </div>

                    <div className="submitted-by">
                      Student: <b>{c.studentName}</b> ({c.studentEmail})
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        )}

        {/* ================= TAB 4: AUTH (LOGIN & REGISTER) ================= */}
        {currentTab === 'auth' && (
          <div className="auth-container">
            <div className="auth-box">
              <div className="auth-tabs">
                <button
                  className={`auth-tab-btn ${authMode === 'login' ? 'active' : ''}`}
                  onClick={() => setAuthMode('login')}
                >
                  Student / Admin Login
                </button>
                <button
                  className={`auth-tab-btn ${authMode === 'register' ? 'active' : ''}`}
                  onClick={() => setAuthMode('register')}
                >
                  New Student Registration
                </button>
              </div>

              <form onSubmit={handleAuthSubmit}>
                {authMode === 'register' && (
                  <Field label="Full Name">
                    <input
                      name="name"
                      placeholder="e.g. Sowseelya V"
                      value={authForm.name}
                      onChange={handleAuthChange}
                      required
                    />
                  </Field>
                )}

                <Field label="College Email">
                  <input
                    name="email"
                    type="email"
                    placeholder="student@campus.edu or admin@campus.edu"
                    value={authForm.email}
                    onChange={handleAuthChange}
                    required
                  />
                </Field>

                <Field label="Password">
                  <input
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={authForm.password}
                    onChange={handleAuthChange}
                    required
                  />
                </Field>

                {authMode === 'register' && (
                  <Field label="Role">
                    <select name="role" value={authForm.role} onChange={handleAuthChange}>
                      <option value="STUDENT">Student</option>
                      <option value="ADMIN">Campus Administrator</option>
                    </select>
                  </Field>
                )}

                <button className="primary-button" type="submit" style={{ marginTop: 15 }}>
                  {authMode === 'login' ? 'Sign In to Portal' : 'Create My Account'} <span>→</span>
                </button>
              </form>

              <div className="auth-demo-hint">
                <small>💡 <b>Tip for presentation:</b> Any email with "admin" (e.g. <code>admin@campus.edu</code>) logs in as Campus Administrator.</small>
              </div>
            </div>
          </div>
        )}

        <footer>
          CampusCare Grievance Redressal System <span>•</span> React 18 + Spring Boot 3 + MySQL 8 <span>•</span> Member 1 Frontend Deliverable
        </footer>
      </main>
    </div>
  )
}

function Stat({ label, value, icon, tone }) {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${tone}`}>{icon}</div>
      <div>
        <div className="stat-value">{value}</div>
        <div className="stat-label">{label}</div>
      </div>
      <div className={`stat-decoration ${tone}`}></div>
    </div>
  )
}

function Field({ label, children }) {
  return (
    <label className="field">
      <span>{label}</span>
      {children}
    </label>
  )
}
