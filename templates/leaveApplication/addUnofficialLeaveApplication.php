<h1>Добави неофициален формуляр</h1>
<hr/>
<div class="PageWrapper">
    <div calss="newApplicationWrapper">
        <div class="row" id="InfoHeading">
            <h4>Нова заявка</h4>
        </div>
        <hr/>
        <div class="row fixedPosition">
            <div class="col-lg-6">
                <div class="row">
                    <div class="col-lg-6">
                        <label for="fromDate">От дата</label>
                        <input type="text" id="fromDate" class="form-control col-sm-3"/>
                    </div>
                    <div class="col-lg-6">
                        <label for="numberDays">Брой дни</label>
                        <input id="numberDays" class="form-control" type="number"/>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-6">
                        <label for="numberHours">Часове</label>
                        <input id="numberHours" max="7" class="form-control" type="number"/>
                    </div>
                    <div class="col-lg-6">
                        <label for="numberMinutes">Минути</label>
                        <input id="numberMinutes" step="15" max="45" class="form-control" type="number"/>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-12  descDiv">
                        <label for="desc">Описание</label>
                        <input type="textarea" id="desc" class="form-control"/>
                    </div>
                </div>

            </div>

            <div class="col-lg-6">
                <div class="datePreviewContainer ">
                    <div id="full-year"></div>
                </div>
            </div>

        </div>
        <div class="row">
            <div class="col-lg-12">
                <input type="button" class="btn btn-sm btn-success" value="Добави" id="submit"/>
            </div>
        </div>
       <hr/>
    </div>

    <div class="row heading-div">
        <h4>Регистър <span class="glyphicon glyphicon-plus pull-right" id="expand"></span></h4>
    </div>
    <div class="row ">
        <div class="col-lg-12" id="hideTable">
            <table id="unOfficialLeaveTable" class="table table-bordered table-hover">
                <thead>
                <th>Заявена на</th>
                <th>Служител</th>
                <th>От дата</th>
                <th>дни/часове/минути</th>
                <th>Пламен</th>
                <th>Митко</th>
                <th>Изтрий</th>
                </thead>
                <tbody>

                </tbody>
            </table>
        </div>
    </div>
</div>
<?php
/**
 * Created by PhpStorm.
 * User: Filip
 * Date: 26.5.2016 г.
 * Time: 16:06 ч.
 */