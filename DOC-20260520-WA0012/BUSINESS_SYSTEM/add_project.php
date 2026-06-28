<?php
include 'db.php'; 

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $description = $_POST['description'];

    $sql = "INSERT INTO projects (name, description) VALUES ('$name', '$description')";

    if ($conn->query($sql) === TRUE) {
        echo "تم إضافة المشروع بنجاح في قاعدة البيانات!";
    } else {
        echo "خطأ في الإضافة: " . $conn->error;
    }
}
?>

<form method="POST" action="add_project.php">
    <h3>إضافة مشروع جديد</h3>
    اسم المشروع: <input type="text" name="name" required><br><br>
    وصف المشروع: <textarea name="description"></textarea><br><br>
    <button type="submit">حفظ المشروع</button>
</form>