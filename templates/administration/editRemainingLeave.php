<h1>Редакция на отпуска</h1>
<hr>

<div class="PageWrapper">

    <div id="InfoHeading" class="row">
        <div class="pull-left">
            <h4>Редакция на оставаща отпуска </h4>
        </div>
        <div class="pull-right">
        </div>
    </div>


    <div id="userAdministrationInfoUsersWrapper">

        <div class="row">

            <div id="usersList" class="col-lg-12">
                <table class="table table-bordered table-hover">
                    <thead>
                    <tr>
                        <th>Име</th>
                        <th>Потребител</th>
                        <th>Оставаща отпуска</th>
                        <th>Оставаща официална</th>
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
            <h4>Добавяне отнемане на официален отпуск</h4>
        </div>
        <div class="pull-right">
        </div>
    </div>

    <div id="addRemoveOfficialLeave">
        <div class="row">

            <div class="col-lg-3">
                <label>Служител</label>
                <input type="text" disabled="disabled" class="form-control">
            </div>
        </div>
        <div class="row">

            <div class="col-lg-3">
                <label>Дни</label>
                <input type="number" class="form-control">

            </div>
            <div class="col-lg-3">
                <label>Часове</label>
                <input type="number" class="form-control">


            </div>
            <div class="col-lg-3">
                <label>Минути</label>
                <input type="number" class="form-control">
            </div>


        </div>
        <div class="row">
           <div class="col-lg-12">
               <label>Описание</label>
               <textarea id="officialDescription" type="text" class="form-control"></textarea>
           </div>
        </div>
        <div class="row">
            <div class="col-lg-12" id="officialButtonsWrapper">
                <button class="btn btn-sm btn-success">Добави</button>
                <button class="btn btn-sm btn-warning">Отнеми</button>
            </div>
        </div>
    </div>

    <div id="InfoHeading" class="row">
        <div class="pull-left">
            <h4>Добавяне отнемане на отпуск </h4>
        </div>
        <div class="pull-right">
        </div>
    </div>

    <div id="addRemoveLeave">
        <div class="row">

            <div class="col-lg-3">
                <label>Служител</label>
                <input type="text" disabled="disabled" class="form-control">
            </div>
            <div class="col-lg-3">
                <label>Дни</label>
                <input type="number" class="form-control">

            </div>
        </div>
        <div class="row">
            <div class="col-lg-12" id="unOfficialButtonsWrapper">
                <button class="btn btn-sm btn-success">Добави</button>
                <button class="btn btn-sm btn-warning">Отнеми</button>
            </div>
        </div>
    </div>


</div>
<?php
/**
 * Created by PhpStorm.
 * User: Filip
 * Date: 27.5.2016 г.
 * Time: 09:20 ч.
 */