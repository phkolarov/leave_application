<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link href="/leave_application/libraries/boostrap/css/bootstrap.css" rel="stylesheet" type="text/css">
    <link href="/leave_application/css/css_p.css" rel="stylesheet" type="text/css">
    <script src="/leave_application/libraries/jquery/jquery-2.2.3.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"
            integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS"
            crossorigin="anonymous"></script>
    <script src="/leave_application/js/main.js"></script>
    <script src="/leave_application/js/connection/requestConnector.js"></script>
</head>

<body>



<div class="mainContainer">


    <?php
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

    require_once("engine/Autoloader/Autoloader.php");
    require_once('engine/main.php');
    use engine\LeaveApp;
    use \engine\autoloader\Autoloader;

    Autoloader::init();
    $app = new LeaveApp();
    $app->run();

    //?>
</div>


</body>
</html>