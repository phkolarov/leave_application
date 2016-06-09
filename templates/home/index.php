<h1>Начална страница</h1>
<hr>
<div class="PageWrapper">

    <div id="InfoHeading" class="row">
        <div class="pull-left">
            <h4>Потребителска информация</h4>
        </div>
        <div class="pull-right">
        </div>
    </div>


    <div class="row">

            <div class="col-lg-12">

                <h3>Здравей: <span id="userNames"></span> ..майка</h3>
                <div class="row">
                    <div class="col-lg-12">
                        <p>Потребителско име: <strong><span id="userName"></span></strong></p>
                        <p>Статус : <strong><span id="isActive"></span></strong></p>
                        <p>Вие имате <span id="unOfficialLeaveInfo"></span> неофициална отпуска</p>
                        <a href="/leave_application/leaveApplication/addOfficialLeaveApplication"><input type="button" class="btn btn-success btn-sm" value="Нова молба"></a>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-12">
                        <p>Последна официална одобрена отпуска: <span id="officialLeaveInfo"> от 12.12.2016 до 15.12.2016</span> </p>
                        <a href="/leave_application/leaveApplication/addUnofficialLeaveApplication"><input type="button" class="btn btn-success btn-sm" value="Нова молба"></a>
                    </div>
                </div>

            </div>
    </div>
</div>
<?php

