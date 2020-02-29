<?php
session_start();
if(isset($_SESSION["filepath"])) {
    $filepath = $_SESSION["filepath"];
    include($filepath);
}
?>