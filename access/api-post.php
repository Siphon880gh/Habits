<?php
session_start();
if(isset($_SESSION["filepath"]) && isset($_POST["html"])) {
    $filepath = $_SESSION["filepath"];
    $html = $_POST["html"];
    $debug = file_put_contents("../$filepath", $html);
    // var_dump($filepath . "<<Expect match ls.");
}
?>