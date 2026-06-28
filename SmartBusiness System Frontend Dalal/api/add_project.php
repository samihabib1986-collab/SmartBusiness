<?php
include_once __DIR__ . '/../../DOC-20260520-WA0012/BUSINESS_SYSTEM/db.php';

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

$input = json_decode(file_get_contents('php://input'), true);

if (!$input || empty($input['name'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Project name is required.']);
    exit;
}

if (!isset($conn) || $conn->connect_error) {
    http_response_code(503);
    echo json_encode(['success' => false, 'message' => 'Database connection unavailable.']);
    exit;
}

$name = $conn->real_escape_string(trim($input['name']));
$description = $conn->real_escape_string(trim($input['description'] ?? ''));

$sql = "INSERT INTO projects (name, description, created_at) VALUES ('$name', '$description', NOW())";
if ($conn->query($sql)) {
    echo json_encode(['success' => true, 'message' => 'Project added successfully.']);
    exit;
}

http_response_code(500);
echo json_encode(['success' => false, 'message' => 'Unable to save project.', 'error' => $conn->error]);
