<?php
session_start();
if(isset($_SESSION["filepath"]) && isset($_POST["html"])) {
    $filepath = $_SESSION["filepath"];
    $html = $_POST["html"];
    file_put_contents($filepath, $html);
}
?>