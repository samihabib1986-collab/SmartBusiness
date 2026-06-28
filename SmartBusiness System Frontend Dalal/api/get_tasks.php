<?php
include_once __DIR__ . '/../../DOC-20260520-WA0012/BUSINESS_SYSTEM/db.php';

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');

$tasks = [];

if (isset($conn) && !$conn->connect_error) {
    $sql = 'SELECT t.id, t.title, t.description, t.status_id, t.project_id, p.name as project_name FROM tasks t LEFT JOIN projects p ON t.project_id = p.id';
    $result = $conn->query($sql);

    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $row['status'] = $row['status_id'] == 1 ? 'Pending' : ($row['status_id'] == 2 ? 'In Progress' : 'Completed');
            $tasks[] = $row;
        }
    }
}

if (empty($tasks)) {
    $tasks = [
        [
            'id' => 1,
            'title' => 'Design Database Schema',
            'description' => 'Create the main database structure and relationships.',
            'project_name' => 'Smart Business Management System',
            'status' => 'In Progress'
        ],
        [
            'id' => 2,
            'title' => 'Build Dashboard Layout',
            'description' => 'Create the dashboard UI and navigation panels.',
            'project_name' => 'Mobile App Dashboard',
            'status' => 'Pending'
        ]
    ];
}

echo json_encode(['success' => true, 'tasks' => $tasks]);
