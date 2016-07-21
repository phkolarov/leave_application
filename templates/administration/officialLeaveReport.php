<!--<h1>Справка официални отпуски</h1>-->
<!--<hr>-->

<div class="PageWrapper">

    <div id="InfoHeading" class="row">
        <div class="pull-left">
            <h4>Всички официални отпуски </h4>
        </div>
        <div class="pull-right">
        </div>
    </div>


    <div id="leaveReportContainer">


        <div id="yearOption" class="form-group">
            <label for="sel1">Година</label>
            <select class="form-control" id="year">
            </select>
        </div>

        <div class="innerTableContainer">

        <table class="table table-bordered">
            <thead>
            <tr>
                <th>Служител</th>
                <th>Период</th>
                <th>Работни дни</th>
                <th>Заместван от</th>
            </tr>
            </thead>
            <tbody id="leaveReportTableBody">

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