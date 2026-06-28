<?php
include_once __DIR__ . '/../../DOC-20260520-WA0012/BUSINESS_SYSTEM/db.php';

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$input = json_decode(file_get_contents('php://input'));
if (!$input || empty($input->name) || empty($input->email) || empty($input->password)) {
    http_response_code(400);
    echo json_encode(['message' => 'Incomplete data.']);
    exit;
}

$name = $conn->real_escape_string(trim($input->name));
$email = $conn->real_escape_string(trim($input->email));
$password = password_hash($input->password, PASSWORD_BCRYPT);

$query = "INSERT INTO users (username, email, password) VALUES ('$name', '$email', '$password')";
if ($conn->query($query) === TRUE) {
    http_response_code(201);
    echo json_encode(['success' => true, 'message' => 'User registered successfully.']);
    exit;
}

http_response_code(500);
echo json_encode(['message' => 'Unable to register user.', 'error' => $conn->error]);
