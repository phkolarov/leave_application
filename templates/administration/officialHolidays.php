<!--<h1>Добавяне на официални празници</h1>-->
<!--<hr>-->


<div class="PageWrapper">

    <div id="InfoHeading" class="row">
        <div class="pull-left">
            <h4>Администрация почивни/работни дни</h4>
        </div>
        <div class="pull-right">
        </div>
    </div>


    <div class="row" id="officialHolidaysAdministration">

        <div id="holidaysAdminOptions" class="col-lg-4">

            <label for="datepicker">Дата</label>
            <input type="text" id="datepicker" class="form-control">


            <div id="workedOption" class="form-group">
                <label for="isWorked">Работен ден</label>
                <select class="form-control" id="isWorked">
                    <option value="1">Неработен</option>
                    <option value="2">Работен</option>
                </select>
            </div>
            <label for="description">Описание</label>
            <textarea type="text" id="description" class="form-control"></textarea>
            <input type="button" id="addHoliday" class="btn btn-success btn-sm" value="Добави" >
        </div>
        <div class="col-lg-8">
            <div class="datePreviewContainer ">
                <div id="full-year" class="pull-left"></div>

                <div id="previewBox">

                    <p ><strong>Дата:</strong> <span id="previewDate"></span></p>

                    <p ><strong>Тип:</strong> <span id="previewType"> </span></p>

                    <p ><strong>Описание:</strong> <span id="previewMessage"></span></p>

                </div>
            </div>
        </div>

    </div>

    <div class="row">


        <div id="monthHolidays" class="col-lg-12">
            <table class="table table-bordered">
                <thead>
                <tr>
                    <th>Тип</th>
                    <th>Дата</th>
                    <th>Описание</th>
                    <th></th>
                </tr>
                </thead>
                <tbody id="monthHolidaysTableBody">

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
 * Time: 09:21 ч.
 */