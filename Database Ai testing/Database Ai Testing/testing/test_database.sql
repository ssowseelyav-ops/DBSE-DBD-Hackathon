-- ====================================================================
-- SMART CAMPUS COMPLAINT MANAGEMENT SYSTEM
-- MEMBER 3: DATABASE VERIFICATION & TEST SUITE (PART C)
-- ====================================================================

USE campus_complaints;

-- Test 1: Verify Table Row Counts
SELECT 'DEPARTMENTS' AS TableName, COUNT(*) AS RowCount FROM departments
UNION ALL
SELECT 'CATEGORIES', COUNT(*) FROM categories
UNION ALL
SELECT 'USERS', COUNT(*) FROM users
UNION ALL
SELECT 'COMPLAINTS', COUNT(*) FROM complaints
UNION ALL
SELECT 'ASSIGNMENTS', COUNT(*) FROM assignments
UNION ALL
SELECT 'COMPLAINT_HISTORY', COUNT(*) FROM complaint_history;

-- Test 2: Verify Complaint -> Category -> Department Relationship Join
SELECT 
    c.id AS ComplaintID,
    c.title AS ComplaintTitle,
    cat.name AS CategoryName,
    dept.name AS DepartmentResponsible,
    c.priority AS Priority,
    c.status AS Status
FROM complaints c
JOIN categories cat ON c.category_id = cat.category_id
JOIN departments dept ON cat.department_id = dept.department_id
ORDER BY c.id;

-- Test 3: Verify Staff Task Assignment Join
SELECT 
    a.assignment_id AS AssignmentID,
    c.title AS ComplaintTitle,
    u.name AS AssignedStaffMember,
    u.email AS StaffEmail,
    a.assigned_at AS AssignedTime,
    a.notes AS Notes
FROM assignments a
JOIN complaints c ON a.complaint_id = c.id
JOIN users u ON a.staff_id = u.user_id;

-- Test 4: Verify Audit Trail History Join
SELECT 
    h.history_id AS HistoryID,
    c.title AS ComplaintTitle,
    u.name AS ModifiedBy,
    h.old_status AS FromStatus,
    h.new_status AS ToStatus,
    h.remarks AS Remarks,
    h.updated_at AS ChangeTime
FROM complaint_history h
JOIN complaints c ON h.complaint_id = c.id
LEFT JOIN users u ON h.changed_by_user_id = u.user_id
ORDER BY h.history_id;
