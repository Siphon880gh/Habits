<?php
if(isset($_GET["username"]) && isset($_GET["password"]) ) {
    if(strlen($_GET["username"])>0 && strlen($_GET["password"])>0 ) {
        header(sprintf("Location: access/login.php?username=%s&passw=%s", $_GET["username"], $_GET["password"]));
    }
}

session_start();

//     include("access/api-grant-guest.php");
// }
// if(!isset($_GET["guest"]) && (!isset($_SESSION["loggedIn"]) || !isset($_SESSION["filepath"]))) {
//     echo '<meta http-equiv="refresh" content="2; URL=access/login.php" />';
//     echo "Access denied. Please login...<br/><br/>";
//     die();
// }
?>
<!DOCTYPE html>
<html lang="en">
  <head>
   <title>Habit Formation</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">

    <!-- jQuery and Bootstrap  -->
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
    <script src="//code.jquery.com/jquery-2.1.4.min.js"></script>
    <script src="//cdn.jsdelivr.net/npm/handlebars@latest/dist/handlebars.js"></script>
    <script src="//raw.githack.com/hazzik/livequery/master/src/jquery.livequery.js"></script>
    <script src="//cdn.jsdelivr.net/npm/moment@2.24.0/min/moment.min.js"></script>

    <script src="vendors/multi-text-states.js"></script>
    <link href="vendors/multi-text-states.css" rel="stylesheet">

    <link href="css/index.css?v=<?php echo time(); ?>" rel="stylesheet">
    <script src="js/app.js?v=<?php echo time(); ?>"></script>
    <script src="js/utility.js?v=<?php echo time(); ?>"></script>

    <?php
        include("comps/nav.init.php");
        include("comps/category.init.php");
        include("comps/habit.init.php");
        include("comps/log.init.php");
        include("comps/indicator.init.php");
    ?>

</head>
    <body>
        <div class="container">
            <div id="title">Build Habits</div>
            <div id="app-desc">
                <b style="display:block; font-weight:600; margin-bottom:10px;">By Weng Fei Fung</b>
                <?php echo date("m/d/y"); ?>
            </div>
            <?php include("comps/nav.php"); ?>

            <main class="list-categories">
            <?php
                if(isset($_GET["guest"])) {
                    include("access/include-guest.php");
                } else if(isset($_SESSION["loggedIn"]) && isset($_SESSION["filepath"])) {
                    if(strpos($_SESSION["filepath"], md5("guest"))===false) { // reassert is user, not guest
                        include("access/include-user.php");
                    } else { // is guest but no URL param guest
                        unset($_SESSION["filepath"]);
                    }
                } // user account
            ?>
            </main>

            <div class="hide0" id="tests1">
                    <!-- <div>Change logging date:</div> -->
                    <div>
                        <span style="width:135px; display:inline-block; margin-bottom:5px;">Today's date: </span>
                        <span id="todays-date"></span>
                    </div>
                    <div>
                        <label for="override-date">Override today's date</label>
                            <input id="override-date" type="date" onchange="$(this).addClass('active')">
                        </label>
                        <span>
                            <span>&nbsp;&nbsp;</span>
                            <i class="fa fa-arrow-left clickable" onclick="itrPrevDate();"></i>
                            <span>&nbsp;&nbsp;</span>
                            <i class="fa fa-arrow-right clickable" onclick="itrNextDate();"></i>
                        </span>
                    </div>
            </div>

            <div id="account-manage">
                    <!-- <div>Manage Account:</div> -->
                    <div>
                        <a href="?guest">Guest</a>
                        <span>&nbsp;</span>
                        <?php
                            if( isset($_SESSION["loggedIn"]) && $_SESSION["loggedIn"]===1 ) {
                                echo '<a href="access/login.php">Switch</a>';
                            } else {
                                echo '<a href="access/login.php">Login</a>';
                            }
                        ?>
                        <span>&nbsp;</span>
                        <?php
                            if( isset($_SESSION["loggedIn"]) && $_SESSION["loggedIn"]===1 ) {
                                echo '<a href="access/refresh-logout.php">Logout</a>';
                            }
                        ?>
                    </div>
            </div>

        </div> <!-- /.container -->

        <!-- Templates -->
        <?php include("comps/category.php"); ?>
        <?php include("comps/habit.php"); ?>

        
        <!-- Designer: Open Sans, Lato, FontAwesome, Waypoints, Skrollr, Pixel-Em-Converter -->
        <!-- <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,300|Open+Sans+Condensed:300" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet"> -->
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/font-awesome@4.5.0/css/font-awesome.min.css">
        <script src="https://cdn.jsdelivr.net/npm/waypoints@4.0.0/lib/jquery.waypoints.min.js"></script>
        <script src="https://cdn.bootcdn.net/ajax/libs/skrollr/0.6.30/skrollr.min.js"></script>
        <script src="//raw.githack.com/filamentgroup/jQuery-Pixel-Em-Converter/master/pxem.jQuery.js"></script>
        
        <!-- Rendering: Handlebars JS, Sprintf JS -->
        <script src="https://cdn.jsdelivr.net/npm/handlebars@4.0.5/dist/handlebars.min.js"></script>
        <script src="//raw.githack.com/azatoth/jquery-sprintf/master/jquery.sprintf.js"></script>
        
        <!-- Compatibility: Modernizr, jQuery Migrate (check browser) -->
        <script src="https://cdn.jsdelivr.net/npm/npm-modernizr@2.8.3/modernizr.min.js"></script>
        <script src="//code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
        
        <!-- Mobile: jQuery UI, jQuery UI Touch Punch -->
        <link href="//code.jquery.com/ui/1.11.3/themes/ui-lightness/jquery-ui.css" rel="stylesheet"/>
        <script src="//code.jquery.com/ui/1.11.4/jquery-ui.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/jquery-ui-touch-punch@0.2.3/jquery.ui.touch-punch.min.js"></script>
       
        <!-- Bootstrap JS -->
        <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
        
        <!-- Friendlier API: ListHandlers, Timeout -->
        <script src="//raw.githack.com/Inducido/jquery-handler-toolkit.js/master/jquery-handler-toolkit.js"></script>
        <script src="//raw.githack.com/tkem/jquery-timeout/master/src/jquery.timeout.js"></script>

    </body>
</html>