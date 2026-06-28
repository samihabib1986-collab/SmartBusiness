<?php
$conn = new mysqli("localhost","root","","project_management");

if($conn->connect_error){
    die("Connection Failed");
}
?>