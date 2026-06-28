<?php
include_once __DIR__ . '/../../DOC-20260520-WA0012/BUSINESS_SYSTEM/db.php';

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');

$projects = [];

if (isset($conn) && !$conn->connect_error) {
    $sql = 'SELECT id, name, description, created_at FROM projects';
    $result = $conn->query($sql);

    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $projects[] = $row;
        }
    }
}

if (empty($projects)) {
    $projects = [
        [
            'id' => 1,
            'name' => 'Smart Business Management System',
            'description' => 'Main system for managing projects, tasks, and employees.',
            'created_at' => date('Y-m-d H:i:s')
        ],
        [
            'id' => 2,
            'name' => 'Mobile App Dashboard',
            'description' => 'Dashboard for project overview and analytics.',
            'created_at' => date('Y-m-d H:i:s')
        ]
    ];
}

echo json_encode(['success' => true, 'projects' => $projects]);
