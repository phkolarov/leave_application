<!--<h1>Справка всички молби</h1>-->
<div class="PageWrapper">

    <div id="InfoHeading" class="row">
        <div class="pull-left">
            <h4>Справка всички молби</h4>
        </div>
        <div class="pull-right">
        </div>
    </div>


    <div id="requestReportContainer">


        <div id="yearOption" class="form-group">
            <label for="sel1">Година</label>
            <select class="form-control" id="year">
            </select>
        </div>
        <div id="monthOption" class="form-group">
            <label for="sel1">Месец</label>
            <select class="form-control" id="month">
                <option value="1">Януари</option>
                <option value="2">Февруари</option>
                <option value="3">Март</option>
                <option value="4">Април</option>
                <option value="5">Май</option>
                <option value="6">Юни</option>
                <option value="7">Юли</option>
                <option value="8">Август</option>
                <option value="9">Септември</option>
                <option value="10">Октомври</option>
                <option value="11">Ноември</option>
                <option value="12">Декември</option>
            </select>
        </div>

        <div class="innerTableContainer">
            <table class="table table-bordered">
                <thead>
                <tr>
                    <th>Служител</th>
                    <th>Заявена на</th>
                    <th>От дата</th>
                    <th>До дата</th>
                    <th>дни/часове/минути</th>
                    <th>Пламен</th>
                    <th>Митко</th>
                    <th>Статус</th>
                </tr>
                </thead>
                <tbody id="requestReportTableBody">

                </tbody>
            </table>
        </div>

    </div>
</div>
<?php
/**
 * Created by PhpStorm.
 * User: Filip
 * Date: 27.5.2016 г.
 * Time: 09:27 ч.
 */