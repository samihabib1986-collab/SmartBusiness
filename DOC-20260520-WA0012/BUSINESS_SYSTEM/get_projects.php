<?php
include 'db.php'; 

$sql = "SELECT * FROM projects";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo "<h3>قائمة المشاريع الموجودة في قاعدة البيانات:</h3>";
    while($row = $result->fetch_assoc()) {
        echo "رقم المشروع: " . $row["id"] . " - اسم المشروع: " . $row["name"] . "<br>";
    }
} else {
    echo "قاعدة البيانات فارغة، لا يوجد مشاريع بعد.";
}
?>