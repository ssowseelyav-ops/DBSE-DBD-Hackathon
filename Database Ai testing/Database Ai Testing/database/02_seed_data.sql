-- ====================================================================
-- SMART CAMPUS COMPLAINT MANAGEMENT SYSTEM
-- MEMBER 3: COMPLETE SEED DATA ACROSS ALL 6 TABLES (PART A)
-- ====================================================================

USE campus_complaints;

-- 1. Insert Campus Departments
INSERT INTO departments (department_id, name, contact_email, contact_phone) VALUES
(1, 'Electrical & Power Infrastructure', 'electrical@campus.edu', '+91-9876500001'),
(2, 'IT & Campus Network Services', 'network@campus.edu', '+91-9876500002'),
(3, 'Civil & Estate Maintenance', 'estate@campus.edu', '+91-9876500003'),
(4, 'Housekeeping & Sanitation', 'sanitation@campus.edu', '+91-9876500004'),
(5, 'Hostel Administration', 'hostel@campus.edu', '+91-9876500005')
ON DUPLICATE KEY UPDATE name=VALUES(name);

-- 2. Insert Categories
INSERT INTO categories (category_id, name, description, department_id) VALUES
(1, 'CLASSROOM', 'Projectors, sound systems, podiums, benches', 3),
(2, 'WIFI', 'Wi-Fi access points, slow internet, network ports', 2),
(3, 'ELECTRICITY', 'Power cuts, switches, lighting, air conditioning', 1),
(4, 'WATER', 'Drinking water dispensers, plumbing leaks, taps', 3),
(5, 'CLEANLINESS', 'Washrooms, dustbins, hallway cleaning', 4),
(6, 'HOSTEL', 'Hostel room fixtures, laundry, hot water', 5),
(7, 'OTHER', 'General campus facilities and feedback', 3)
ON DUPLICATE KEY UPDATE name=VALUES(name);

-- 3. Insert Users (Students, Staff, Admins)
INSERT INTO users (user_id, name, email, password, role, department_id, phone) VALUES
(1, 'Admin Sowseelya', 'admin@campus.edu', 'admin123', 'ADMIN', NULL, '+91-9800011111'),
(2, 'Ramesh Kumar', 'ramesh.staff@campus.edu', 'staff123', 'STAFF', 1, '+91-9800022222'),
(3, 'Suresh Verma', 'suresh.staff@campus.edu', 'staff123', 'STAFF', 2, '+91-9800033333'),
(4, 'Lakshmi Devi', 'lakshmi.staff@campus.edu', 'staff123', 'STAFF', 4, '+91-9800044444'),
(5, 'Aarav Sharma', 'aarav.sharma@campus.edu', 'student123', 'STUDENT', NULL, '+91-9800055555'),
(6, 'Priya Patel', 'priya.patel@campus.edu', 'student123', 'STUDENT', NULL, '+91-9800066666'),
(7, 'Rohan Verma', 'rohan.verma@campus.edu', 'student123', 'STUDENT', NULL, '+91-9800077777')
ON DUPLICATE KEY UPDATE email=VALUES(email);

-- 4. Insert Complaints
INSERT INTO complaints (id, user_id, student_name, student_email, title, description, category, category_id, location, priority, status, assigned_staff, created_at) VALUES
(1, 5, 'Aarav Sharma', 'aarav.sharma@campus.edu', 'Classroom Projector Not Working', 'The HDMI port on ceiling projector is loose and display shows green flickering lines during lectures.', 'CLASSROOM', 1, 'Block A, Room 204', 'MEDIUM', 'IN_PROGRESS', 'Ramesh Kumar (Electrical)', NOW() - INTERVAL 3 DAY),
(2, 6, 'Priya Patel', 'priya.patel@campus.edu', 'Library Wi-Fi Disconnecting Frequently', 'Wi-Fi disconnects every 5 minutes in the 2nd floor reading hall, disrupting online exam research.', 'WIFI', 2, 'Central Library, 2nd Floor', 'HIGH', 'PENDING', NULL, NOW() - INTERVAL 2 DAY),
(3, 7, 'Rohan Verma', 'rohan.verma@campus.edu', 'Water Cooler Leaking Heavily', 'Drinking water dispenser is continuously leaking water, making the corridor floor slippery and hazardous.', 'WATER', 4, 'Block C, 3rd Floor Corridor', 'MEDIUM', 'RESOLVED', 'Suresh Verma (Estate)', NOW() - INTERVAL 4 DAY),
(4, 5, 'Aarav Sharma', 'aarav.sharma@campus.edu', 'Computer Lab AC Blowing Warm Air', 'Split AC unit #2 in Computer Lab 3 is blowing warm air causing systems to overheat.', 'ELECTRICITY', 3, 'IT Building, Lab 3', 'URGENT', 'IN_PROGRESS', 'Ramesh Kumar (Electrical)', NOW() - INTERVAL 5 HOUR),
(5, 6, 'Priya Patel', 'priya.patel@campus.edu', 'Hostel Corridor Light Broken', 'Tube light outside room 312 is completely fused, hallway is dark.', 'HOSTEL', 6, 'Girls Hostel 1, 3rd Floor', 'LOW', 'RESOLVED', 'Ramesh Kumar (Electrical)', NOW() - INTERVAL 6 DAY),
(6, 7, 'Rohan Verma', 'rohan.verma@campus.edu', 'Dustbin Overflowing Outside Canteen', 'Large waste container outside student canteen is overflowing with food wrappers.', 'CLEANLINESS', 5, 'Student Center, Canteen Lawn', 'LOW', 'PENDING', NULL, NOW() - INTERVAL 2 HOUR)
ON DUPLICATE KEY UPDATE title=VALUES(title);

-- 5. Insert Staff Task Assignments
INSERT INTO assignments (assignment_id, complaint_id, staff_id, notes) VALUES
(1, 1, 2, 'Inspected HDMI cable, requested replacement transmitter adapter from inventory.'),
(2, 3, 3, 'Tightened inlet valve and replaced rubber gasket. Leakage resolved.'),
(3, 4, 2, 'Checked refrigerant pressure. Compressor technician scheduled for 4 PM.'),
(4, 5, 2, 'Replaced starter and 36W LED tube light. Working properly.')
ON DUPLICATE KEY UPDATE notes=VALUES(notes);

-- 6. Insert Complaint Audit History
INSERT INTO complaint_history (history_id, complaint_id, changed_by_user_id, old_status, new_status, remarks) VALUES
(1, 1, 1, 'PENDING', 'IN_PROGRESS', 'Assigned to Electrical maintenance team.'),
(2, 3, 1, 'PENDING', 'IN_PROGRESS', 'Assigned to estate plumbing technician.'),
(3, 3, 3, 'IN_PROGRESS', 'RESOLVED', 'Plumbing leak repaired and floor dried.'),
(4, 4, 1, 'PENDING', 'IN_PROGRESS', 'Flagged as URGENT due to computer lab overheating.'),
(5, 5, 1, 'PENDING', 'IN_PROGRESS', 'Assigned to hostel electrician.'),
(6, 5, 2, 'IN_PROGRESS', 'RESOLVED', 'Replacement bulb installed.')
ON DUPLICATE KEY UPDATE remarks=VALUES(remarks);
