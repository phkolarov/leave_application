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

            <div class="col-lg-12" >

                <h3>Здравей: <span id="userNames"></span></h3>
                <p>Потребителско име: <strong><span id="userName"></span></strong></p>
                <p>Статус : <strong><span id="isActive"></span></strong></p>

                    <div class="row">
                        <div class="col-lg-12 homePageInfoWraper">


                            <p>Вие имате <span id="unOfficialLeaveInfo"></span> неофициална отпуска</p>
                            <a href="/leave_application/leaveApplication/addOfficialLeaveApplication"><input type="button" class="btn btn-success btn-sm" value="Нова молба"></a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12 homePageInfoWraper">
                            <p>Последна официална подадена отпуска: <span id="officialLeaveInfo"> </span></p>
                            <p>Статус на молбата: <span id="offLeaveInfoStatus"> </span></p>
                            <a href="/leave_application/leaveApplication/addUnofficialLeaveApplication"><input type="button" class="btn btn-success btn-sm" value="Нова молба"></a>
                        </div>
                    </div>
                </div>

            </div>
    </div>
</div>
<?php

