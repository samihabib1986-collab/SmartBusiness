<?php
include_once __DIR__ . '/../../DOC-20260520-WA0012/BUSINESS_SYSTEM/db.php';

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

$input = json_decode(file_get_contents('php://input'), true);

if (!$input || empty($input['title'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Task title is required.']);
    exit;
}

if (!isset($conn) || $conn->connect_error) {
    http_response_code(503);
    echo json_encode(['success' => false, 'message' => 'Database connection unavailable.']);
    exit;
}

$title = $conn->real_escape_string(trim($input['title']));
$description = $conn->real_escape_string(trim($input['description'] ?? ''));
$projectId = (int)($input['project_id'] ?? 1);

$sql = "INSERT INTO tasks (title, description, status_id, project_id) VALUES ('$title', '$description', 1, $projectId)";
if ($conn->query($sql)) {
    echo json_encode(['success' => true, 'message' => 'Task added successfully.']);
    exit;
}

http_response_code(500);
echo json_encode(['success' => false, 'message' => 'Unable to save task.', 'error' => $conn->error]);
