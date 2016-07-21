<!--<h1>Списък c потребители</h1>-->
<!--<hr>-->

<div class="PageWrapper">

    <div id="InfoHeading" class="row">
        <div class="pull-left">
            <h4>Администрация потребители </h4>
        </div>
        <div class="pull-right">
        </div>
    </div>

    <div id="userAdministrationInfoUsersWrapper">
        <div class="row">
            <div class="col-xs-2">
                <select id="usersFilter" class="form-control">
                    <option value="1">Активни</option>
                    <option value="2">Всички</option>
                    <option value="3">Неактивни</option>
                </select>
            </div>

        </div>
        <div class="row">

            <div id="usersList" class="col-lg-12">
                <table class="table table-bordered">
                    <thead>
                    <tr>
                        <th>Име</th>
                        <th>Потребител</th>
                        <th>Активен</th>
                        <th>Права</th>
                        <th>Оставаща отпуска</th>
                        <th>Оставаща официална</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody id="usersListTableBody">
                    </tbody>
                </table>
            </div>
        </div>

    </div>
    <div id="InfoHeading" class="row">
        <div class="pull-left">
            <h4>Добавяне на потребител</h4>
        </div>
        <div class="pull-right">
        </div>
    </div>
    <div id="userAdministrationUsersWrapper">

        <form method="post" action="/leave_application/administration/addUser">
        <div class="row">

            <div class="col-lg-4">
                <label for="username">Потребителско име</label>
                <input name="username" type="text" id="username" class="form-control">
                <label for="names">Имена на служителя</label>
                <input name="names" type="text" id="names" class="form-control">

            </div>


            <div class="col-lg-4">
                <label for="email">Email адрес</label>
                <input name="email" type="email" id="email" class="form-control">
                <label for="password">Парола</label>
                <strong><input name="password" type="text" id="password" class="form-control"></strong>


            </div>

            <div class="col-lg-4">
                <label for="userRoleOptions">Роля</label>
                <select name="userRoleOptions" id="userRoleOptions" class="form-control">
                    <option value="1">User</option>
                    <option value="2">Admin</option>
                </select>
                <div >
                    <label for="isActive">Статус</label>
                    <select disabled="disabled" name="isActive" id="isActive" class="form-control">
                        <option value="1">Активен</option>
                        <option value="2">Неактивен</option>
                    </select>

                </div>


            </div>
        </div>
        <div class="row">

           <div class="col-lg-12">
               <input type="button" class="btn btn-sm btn-warning" id="generatePassword" value="Генерирай парола">
               <input type="submit" class="btn btn-sm btn-success" id="addUser" value="Добави">
           </div>
        </div>
        </form>


    </div>


</div>
<?php
/**
 * Created by PhpStorm.
 * User: Filip
 * Date: 27.5.2016 г.
 * Time: 09:21 ч.
 */