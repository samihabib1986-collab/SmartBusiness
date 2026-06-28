<?php
include 'db.php'; 

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $title = $_POST['title'];
    $description = $_POST['description'];
    $project_id = $_POST['project_id']; 

    $sql = "INSERT INTO tasks (title, description, project_id) VALUES ('$title', '$description', '$project_id')";

    if ($conn->query($sql) === TRUE) {
        echo "تم ربط وإضافة المهمة بنجاح!";
    } else {
        echo "خطأ: " . $conn->error;
    }
}
?>

<form method="POST" action="add_task.php">
    <h3>إضافة مهمة لمشروع معين</h3>
    عنوان المهمة: <input type="text" name="title" required><br><br>
    الوصف: <textarea name="description"></textarea><br><br>
    رقم المشروع التابعة له (ID): <input type="number" name="project_id" required><br><br>
    <button type="submit">حفظ المهمة</button>
</form>