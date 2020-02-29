<?php
session_start();
unset($_SESSION["loggedIn"]);
unset($_SESSION["filepath"]);
echo '<meta http-equiv="refresh"
content="0; url=../">';
?>