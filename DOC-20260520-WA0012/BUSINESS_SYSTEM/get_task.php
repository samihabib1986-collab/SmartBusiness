<?php
include 'db.php';

$sql = "SELECT * FROM tasks";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo "<h3>قائمة المهام الحالية:</h3>";
    while($row = $result->fetch_assoc()) {
        echo "المهمة: " . $row["title"] . " - تابعة للمشروع رقم: " . $row["project_id"] . "<br>";
    }
} else {
    echo "لا يوجد مهام مضافة بعد.";
}
?>