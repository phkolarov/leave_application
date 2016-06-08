<style>

    .navbar-brand { position: relative; z-index: 2; }

    .navbar-nav.navbar-right .btn { position: relative; z-index: 2; padding: 4px 20px; margin: 10px auto; }

    .navbar .navbar-collapse { position: relative; }
    .navbar .navbar-collapse .navbar-right > li:last-child { padding-left: 22px; }

    .navbar .nav-collapse { position: absolute; z-index: 1; top: 0; left: 0; right: 0; bottom: 0; margin: 0; padding-right: 120px; padding-left: 80px; width: 100%; }
    .navbar.navbar-default .nav-collapse { background-color: #f8f8f8; }
    .navbar.navbar-inverse .nav-collapse { background-color: #222; }
    .navbar .nav-collapse .navbar-form { border-width: 0; box-shadow: none; }
    .nav-collapse>li { float: right; }

    .btn.btn-circle { border-radius: 50px; }
    .btn.btn-outline { background-color: transparent; }

    @media screen and (max-width: 767px) {
        .navbar .navbar-collapse .navbar-right > li:last-child { padding-left: 15px; padding-right: 15px; }

        .navbar .nav-collapse { margin: 7.5px auto; padding: 0; }
        .navbar .nav-collapse .navbar-form { margin: 0; }
        .nav-collapse>li { float: none; }
    }


</style>

    <nav class="navbar navbar-default">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse-2">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="#">Отпуски</a>
            </div>

            <div class="collapse navbar-collapse" id="navbar-collapse-2">
                <ul class="nav navbar-nav navbar-right">
                    <li><a href="/leave_application/home">Начало</a></li>
                    <li><a href="#" data-toggle="dropdown">Добавяне<b class="caret"></b></a>
                        <ul class="dropdown-menu">
                            <li><a href="/leave_application/leaveApplication/addOfficialLeaveApplication" tabindex="-1">Официални отпуски</a></li>
                            <li><a href="/leave_application/leaveApplication/addUnofficialLeaveApplication" tabindex="-1">Молба за отпуск</a></li>
                        </ul>
                    </li>
                    <li><a href="#" data-toggle="dropdown">Справки<b class="caret"></b></a>
                        <ul class="dropdown-menu">
                            <li><a href="/leave_application/reports/myOfficialVacations" tabindex="-1">Официални отпуски</a></li>
                            <li><a href="/leave_application/reports/officialHolidays" tabindex="-1">Официални празници</a></li>
                        </ul>
                    </li>
                    <li><a href="/leave_application/leaveApplication/pendingRequests">Чакащи молби</a>

                    </li>
                    <li><a href="" data-toggle="dropdown">Администрация<b class="caret"></b></a>

                        <ul class="dropdown-menu multi-level" role="menu" aria-labelledby="dropdownMenu">
                            <li><a href="/leave_application/administration/editRemainingLeave">Редакция на оставаща отпуска</a></li>
                            <li><a href="/leave_application/administration/usersList">Потребители</a></li>
                            <li><a href="/leave_application/administration/officialHolidays">Официални празници</a></li>
                            <li class="divider"></li>
                            <li class="dropdown-submenu">
                                <a tabindex="-1" href="#">Справки</a>
                                <ul class="dropdown-menu">
                                    <li><a tabindex="-1" href="/leave_application/administration/officialLeaveReport">Официални отпуски</a></li>
                                    <li><a tabindex="-1" href="/leave_application/administration/requestReport">Регистър молби</a></li>
<!--                                    <li><a href="#">Second level</a></li>-->

                                    <!--                                    <li class="dropdown-submenu">-->
<!--                                        <a href="#">Even More..</a>-->
<!--                                        <ul class="dropdown-menu">-->
<!--                                            <li><a href="#">3rd level</a></li>-->
<!--                                            <li><a href="#">3rd level</a></li>-->
<!--                                        </ul>-->
<!--                                    </li>-->
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li><a href="/leave_application/user/profile">Профил</a>

                    <li>
                        <a class="btn btn-default btn-outline btn-circle"  href="/leave_application/user/logout"  >Изход</a>
<!--                        <a class="btn btn-default btn-outline btn-circle"  data-toggle="collapse" href="/leave_application/user/login" aria-expanded="false" aria-controls="nav-collapse2" >Изход</a>-->
                    </li>
                </ul>
                <!--<div class="collapse nav navbar-nav nav-collapse" id="nav-collapse2">-->
                    <!--<form class="navbar-form navbar-right form-inline" role="form">-->
                        <!--<div class="form-group">-->
                            <!--<label class="sr-only" for="username">Потребителско име</label>-->
                            <!--<input type="username" class="form-control" id="username" placeholder="Потребителско име" autofocus required />-->
                        <!--</div>-->
                        <!--<div class="form-group">-->
                            <!--<label class="sr-only" for="Password">Password</label>-->
                            <!--<input type="password" class="form-control" id="Password" placeholder="Парола" required />-->
                        <!--</div>-->
                        <!--<button type="submit" class="btn btn-success">Вход</button>-->
                    <!--</form>-->
                <!--</div>-->
            </div>
        </div>
    </nav>

<!--<div class="container-fluid">-->
<!--    <nav class="navbar navbar-default">-->
<!--        <div class="container">-->
<!---->
<!--            <p id="userData">-->
<!---->
<!--            </p>-->
<!--        </div>-->
<!--    </nav>-->
<!--</div>-->