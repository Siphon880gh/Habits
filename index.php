<?php
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
    <link rel="stylesheet" href="../../offline/assets/bootstrap.min.css" data-old="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
    <script src="../../offline/assets/jquery-2.1.4.min.js" data-old="https://code.jquery.com/jquery-2.1.4.min.js"></script>
    <script src="../../offline/assets/handlebars.js" data-old="https://cdn.jsdelivr.net/npm/handlebars@latest/dist/handlebars.js"></script>
    <script src="../../offline/assets/jquery.livequery.js" data-old="https://raw.githack.com/hazzik/livequery/master/src/jquery.livequery.js"></script>
    <script src="js/vendors/multi-text-states.js"></script>
        
    <link href="css/index.css?v=<?php echo time(); ?>" rel="stylesheet">
    <script src="js/app.js?v=<?php echo time(); ?>"></script>
    
</head>
    <body>
        <div class="container">
            <div id="title">Prototype (Not Designed)</div>
            <?php include("comps/nav.php"); ?>

            <?php
                // if(isset($_SESSION["filepath"])) {
                //     var_dump("filepath: " . $_SESSION['filepath'] . " << Expect 5f4* for wff; Expect 084* if guest.");
                //     var_dump("loggedIn:" . isset($_SESSION["loggedIn"]) . "<< Expect 1 for wff");
                // }
            ?>

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

            <div style="margin-top:20px;">
                    <div>To rearrange visually</div>
                    <div>
                        <a href="?guest">Guest</a>
                        <span>&nbsp;</span>
                        <a href="access/login.php">Login</a>
                        <span>&nbsp;</span>
                        <a href="access/refresh-logout.php">Logout</a>
                    </div>
            </div>

        </div> <!-- /.container -->

        <!-- Templates -->
        <?php include("comps/category.php"); ?>
        <?php include("comps/habit.php"); ?>

        
        <!-- Designer: Open Sans, Lato, FontAwesome, Waypoints, Skrollr, Pixel-Em-Converter -->
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,300|Open+Sans+Condensed:300" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet">
        <link rel="stylesheet" href="../../offline/assets/font-awesome.css" data-old="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.css">
        <script src="../../offline/assets/jquery.waypoints.min.js" data-old="https://cdnjs.cloudflare.com/ajax/libs/waypoints/4.0.0/jquery.waypoints.min.js"></script>
        <script src="../../offline/assets/skrollr.min.js" data-old="https://cdnjs.cloudflare.com/ajax/libs/skrollr/0.6.30/skrollr.min.js"></script>
        <script src="../../offline/assets/pxem.jQuery.js" data-old="https://raw.githack.com/filamentgroup/jQuery-Pixel-Em-Converter/master/pxem.jQuery.js"></script>
        
        <!-- Rendering: Handlebars JS, Sprintf JS -->
        <script src="../../offline/assets/handlebars.js" data-old="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.5/handlebars.js"></script>
        <script src="../../offline/assets/jquery.sprintf.js" data-old="https://raw.githack.com/azatoth/jquery-sprintf/master/jquery.sprintf.js"></script>
        
        <!-- Compatibility: Modernizr, jQuery Migrate (check browser) -->
        <script src="../../offline/assets/modernizr.min.js" data-old="https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js"></script>
        <script src="../../offline/assets/jquery-migrate-1.2.1.min.js" data-old="https://code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
        
        <!-- Mobile: jQuery UI, jQuery UI Touch Punch -->
        <link href="../../offline/assets/jquery-ui.css" data-old="https://code.jquery.com/ui/1.11.3/themes/ui-lightness/jquery-ui.css" rel="stylesheet"/>
        <script src="../../offline/assets/jquery-ui.min.js" data-old="https://code.jquery.com/ui/1.11.4/jquery-ui.min.js"></script>
        <script src="../../offline/assets/jquery.ui.touch-punch.min.js" data-old="https://cdnjs.cloudflare.com/ajax/libs/jqueryui-touch-punch/0.2.3/jquery.ui.touch-punch.min.js"></script>
       
        <!-- Bootstrap JS -->
        <script src="../../offline/assets/bootstrap.min.js" data-old="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
        
        <!-- Friendlier API: ListHandlers, Timeout -->
        <script src="../../offline/assets/jquery-handler-toolkit.js" data-old="https://raw.githack.com/Inducido/jquery-handler-toolkit.js/master/jquery-handler-toolkit.js"></script>
        <script src="../../offline/assets/jquery.timeout.js" data-old="https://raw.githack.com/tkem/jquery-timeout/master/src/jquery.timeout.js"></script>

    </body>
</html>