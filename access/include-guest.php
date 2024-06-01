<?php
// Includable
// session_start();

// Check login
if(isset($_GET["guest"])) {
    $guest_password = md5("guest");
	$guest_filepath = "data/guest/$guest_password.txt";
	$_SESSION["filepath"]=$guest_filepath;

	if(file_exists($guest_filepath)) {
		include($guest_filepath);
	}
} // guest account

?>