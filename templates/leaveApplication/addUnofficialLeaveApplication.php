<link rel="stylesheet" type="text/css" href="/leave_application/css/css_n.css">
<h1>Добави неофициален формуляр</h1>
<hr/>
<div calss="newApplicationWrapper">
    <div class="row">
    <h4>Нова заявка</h4>
    </div>
    <div class="col-sm-3">
        <label for="fromDate" >От дата</label>
        <input type="text" id="fromDate" class="form-control col-sm-3"/>
    </div>

    <fieldset>
        <legend>Продължителност</legend>
        <div class="row">
        <div class="col-sm-4">
        <label for="numberDays" >Брой дни</label>
        <input id ="numberDays" class="form-control"type="number"/>
        </div>
        <div class="col-sm-4">
            <label for="numberHours" >Часове</label>
            <input id ="numberHours" max="7" class="form-control"type="number"/>
        </div>
        <div class="col-sm-4">
            <label for="numberMinutes" >Минути</label>
            <input id ="numberMinutes" step="15" max="45"class="form-control"type="number"/>
        </div>
        </div>
        <div class="row">
            <div class="col-sm-12">
                <label for="description">Описание</label>
                <input id="description" class="form-control"type="text"/>
            </div>
        </div>
    </fieldset>
</div>
<?php
/**
 * Created by PhpStorm.
 * User: Filip
 * Date: 26.5.2016 г.
 * Time: 16:06 ч.
 */