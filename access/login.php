<?php
session_start();

if(isset($_GET["username"]) && isset($_GET["passw"]) ) {
	$folder = $_GET["username"];
	$filename_ = $_GET["passw"];

    // Forgot my password for wff so Im gonna go plain:
	// $filename = md5($filename_);
	$filename = $filename_;
    
	// die("data/$folder/$filename.txt");

	if(file_exists("../data/$folder/$filename.txt")) {
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