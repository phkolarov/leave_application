<h1>Добави официална отпуска</h1>
<hr/>
<div class="PageWrapper">
    <div class="row" id="InfoHeading">

        <h4>Добавяне</h4>
    </div>
    <hr/>

    <div class="row">
        <div class='col-sm-4'>
            <label for="startDate">От дата</label>
            <input type='text' class="form-control" id='startDate'/>
        </div>

        <div class='col-sm-4	'>
            <label for="endDate">До дата</label>
            <input type='text' class="form-control" id='endDate'/>
        </div>
        <div class="col-sm-4">
            <label for="debuty">Ще бъда заместван от</label>
            <select id="debuty" class="form-control"></select>
        </div>
    </div>
    <hr/>
    <div class="row">
        <div class="col-lg-12">
            <input type="button" class="btn btn-sm btn-success" value="Добави" id="submit"/>
        </div>
    </div>
    <hr/>
    <div class="row heading-div">
        <h4>Заявени отпуски</h4>
    </div>
    <hr/>

    <div class="row">
        <div class="col-sm-12">
            <label for="showYear">Година</label>
            <select class="year form-control" id="showYear"></select>
        </div>
    </div>
    <hr/>
    <div id="officialLeavesTable">
        <table class="table table-bordered table-hover">
            <th>Период</th>
            <th>Брой работни дни</th>
            <th>Заместван от</th>
        </table>
    </div>
</div>
<?php
/**
 * Created by PhpStorm.
 * User: Filip
 * Date: 26.5.2016 г.
 * Time: 16:06 ч.
 */