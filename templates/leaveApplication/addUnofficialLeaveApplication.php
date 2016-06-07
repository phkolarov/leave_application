
<h1>Добави неофициален формуляр</h1>
<hr/>
<div calss="newApplicationWrapper">
    <div class="row">
    <h4>Нова заявка</h4>
    </div>
        <div class="row">
            <div class="col-sm-3">
                <label for="fromDate" >От дата</label>
                <input type="text" id="fromDate" class="form-control col-sm-3"/>
            </div>
        <div class="col-sm-3">
        <label for="numberDays" >Брой дни</label>
        <input id ="numberDays" class="form-control"type="number"/>
        </div>
        <div class="col-sm-3">
            <label for="numberHours" >Часове</label>
            <input id ="numberHours" max="7" class="form-control"type="number"/>
        </div>
        <div class="col-sm-3">
            <label for="numberMinutes" >Минути</label>
            <input id ="numberMinutes" step="15" max="45"class="form-control"type="number"/>
        </div>
        </div>
       <div class="row">
           <div class="col-sm-12">
                <label for="desc">Описание</label>
                <input type="text" id="desc" class="form-control"/>
            </div>
       </div>
    <hr/>

    <div class="row buttonDiv">
        <button type="button" class="btn btn-info btn-file btn-sm" id="submit">Добави</button>
    </div>
    <hr/>

</div>
<div class="row">
<h4>Календар</h4>
<div class="col-lg-12">
    <div class="datePreviewContainer ">
        <div id="full-year" ></div>
    </div>
</div>
</div>

<div class="row">
    <h4>Регистър</h4>
</div>
<div class="row">
    <div>
        <table id="unOfficialLeaveTable">
            <thead>
            <th >Заявена на</th>
            <th >Служител</th>
            <th >От дата</th>
            <th >До дата</th>
            <th >дни/часове/минути</th>
            <th >Пламен</th>
            <th >Митко</th>
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