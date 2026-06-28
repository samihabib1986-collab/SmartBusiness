<?php
$host = "localhost";
$username = "root";
$password = "";
$databases = ["BUSINESS_SYSTEM", "business_system", "project_management"];

$conn = null;
$database = null;

foreach ($databases as $name) {
    $conn = @new mysqli($host, $username, $password, $name);
    if (!$conn->connect_error) {
        $database = $name;
        break;
    }
}

if (!$conn || $conn->connect_error) {
    die("Connection failed: " . ($conn ? $conn->connect_error : "Unable to connect to MySQL"));
}
?>