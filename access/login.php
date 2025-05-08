<?php
session_start();

if(isset($_GET["username"]) && isset($_GET["passw"]) ) {

    $hasErrored = false;

    if(strlen($_GET["username"])>0 && strlen($_GET["passw"])>0 ) {
        // Sanitize username and password
        $username = htmlspecialchars(strip_tags(trim($_GET["username"])), ENT_QUOTES, 'UTF-8');
        $password = htmlspecialchars(strip_tags(trim($_GET["passw"])), ENT_QUOTES, 'UTF-8');
        
        // Basic validation
        if(strlen($username) > 50 || !preg_match('/^[a-zA-Z0-9_]+$/', $username)) {
            // die("Invalid username format");
            $hasErrored = true;
        }
        
        // Replace original GET params with sanitized versions
        $_GET["username"] = $username;
        $_GET["passw"] = $password;
    } else {
        $hasErrored = true;
    }

	$folder = $_GET["username"];
	$filename_ = $_GET["passw"];

    // Forgot my password for wff so Im gonna go plain:
	// $filename = md5($filename_);
	$filename = $filename_;
    
	// die("data/$folder/$filename.txt");

	if(!$hasErrored && file_exists("../data/$folder/$filename.txt")) {
		$_SESSION["loggedIn"]=1;
		$_SESSION["filepath"]="data/$folder/$filename.txt";
		header("location: ../index.php");
	} else {
        echo "<div>Access denied</div>";
        // echo '<meta http-equiv="refresh" content="2; URL=../" />';
	} // else
} // username and passw
?>
<html>
<head><meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>Please login</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
    <div class="container">
        <h3>Enter your credentials</h3>
        <div class="login-form">

            <form action="login.php" method="GET">
                <input id="username" name="username" type="text"/><br>
                <input id="passw" name="passw" type="password" style="margin-top:.25rem;"/><br/>
                <input type="submit" value="Login"/>
            </form>
        </div>
    </div>
</body>
</html>