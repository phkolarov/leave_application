<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Leave App</title>


    <link href="/leave_application/libraries/boostrap/css/bootstrap.css" rel="stylesheet" type="text/css">
    <link href="/leave_application/libraries/jquery/jquery-ui.css" rel="stylesheet" type="text/css"/>
    <link href="/leave_application/libraries/pnotify/pnotify.custom.css" rel="stylesheet" type="text/css"/>
    <link href="/leave_application/libraries/jquery/jquery-ui-1.11.4.custom/jquery-ui.structure.css" rel="stylesheet"
          type="text/css">
    <link href="/leave_application/libraries/jquery/jquery-ui-1.11.4.custom/jquery-ui.theme.css" rel="stylesheet"
          type="text/css">
    <link href="/leave_application/libraries/jquery/jquery-ui-1.11.4.custom/jquery-ui-timepicker-addon.css"
          rel="stylesheet" type="text/css">
    <link href="/leave_application/libraries/fullcalendar/fullcalendar.css" rel="stylesheet" type="text/css">

    <link href="/leave_application/css/css_n.css" rel="stylesheet" type="text/css">
    <link href="/leave_application/css/css_p.css" rel="stylesheet" type="text/css">


    <script src="/leave_application/libraries/jquery/jquery-2.2.3.min.js"></script>
    <script src="/leave_application/libraries/jquery/jquery-ui-1.11.4.custom/jquery-ui.js"></script>
    <script src="/leave_application/libraries/moment/moment.js"></script>


    <script src="/leave_application/libraries/fullcalendar/fullcalendar.js"></script>
    <script src="/leave_application/libraries/fullcalendar/fullcalendar-rightclick.js"></script>
    <script src="/leave_application/libraries/fullcalendar/lang/bg.js"></script>
    <script src="/leave_application/libraries/moment/moment.js"></script>

    <script src="/leave_application/libraries/jquery/jquery-ui-1.11.4.custom/datepicker-bg.js"></script>
    <script src="/leave_application/libraries/jquery/jquery-ui-1.11.4.custom/jquery-ui-timepicker-addon.js"></script>
    <script src="/leave_application/libraries/jquery/jquery-ui-1.11.4.custom/jquery-ui.multidatespicker.js"></script>


    <script src="/leave_application/libraries/pnotify/pnotify.custom.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"
            integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS"
            crossorigin="anonymous"></script>


    <script src="/leave_application/js/main.js"></script>
    <script src="/leave_application/js/connection/requestConnector.js"></script>


</head>

<body>


<div id="pending">
    <img id="loadingAnimation" src="/leave_application/css/images/loading.gif">
</div>
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

<div id="myModal" class="modal fade" tabindex="-1" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                        aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">Системно съобщение</h4>
            </div>
            <div class="modal-body">
                <p id="systemMessage"></p>
            </div>
            <div class="modal-footer infoModal">
                <button id="closeSystemMessage" type="button" class="btn btn-info  btn-sm" data-dismiss="modal">Затвори</button>
            </div>
        </div><!-- /.modal-content -->
    </div>
</div>

<div id="addEvent" class="modal fade" tabindex="-1" role="dialog">
    <div class="col-lg-3"></div>
    <div class="col-lg-6">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                        aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">Ново на заседание</h4>
            </div>
            <div class="modal-body">
                <div id="addMeetingWrapper">

                    <div class="row">
                        <div class="col-lg-4">
                            <label for="meetingTitle">Заглавие</label>
                            <input id="meetingTitle" class="form-control">
                        </div>
                        <div class="col-lg-4">
                            <label for="fromDate">Дата</label>
                            <input type="datetime" id="fromDate" class="form-control">
                        </div>
                        <div class="col-lg-4">
                            <label for="toDate">Продължителност</label>
                            <input type="datetime" id="toDate" class="form-control">
                        </div>

                    </div>
                    <div class="row">
                        <div class="col-lg-12">
                            <label for="description">Описание</label>
                            <textarea id="description" name="description" class="form-control"></textarea>
                        </div>

                    </div>

                </div>
                <p id="systemMessage"></p>
            </div>
            <div class="modal-footer">
                <button class="btn btn-success btn-sm" id="addMeeting"  data-dismiss="modal">Добави</button>
                <button id="closeSystemMessage" type="button" class="btn btn-info btn-sm" data-dismiss="modal">Затвори</button>
            </div>
        </div><!-- /.modal-content -->
    </div>
    <div class="col-lg-3"></div>

</div>
<script>


</script>
</body>
</html>