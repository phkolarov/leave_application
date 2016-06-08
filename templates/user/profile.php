<h1>Профил</h1>
<hr>


<div class="PageWrapper">
   <div id="InfoHeading" class="row">
       <div class="pull-left">
           <h4>Потребителска информация: </h4>
       </div>
       <div class="pull-right">
           <h5>Оставаща неофициална отпуска: <span id="leaveLeft"></span></h5>
       </div>
   </div>
    <div class="row">
        <div id="profileImageContainer" class="col-lg-2">
            <img src="/leave_application/css/images/default_profile.png" id="profileImage">
            <label class="btn btn-info btn-file btn-sm">
                промени <input type="file" style="display: none;">
            </label>
        </div>

        <div id="userInformationContainer" class="col-lg-6">

            <form method="post" action="/leave_application/user/changeUserParams">
                <p><strong>Статус на профила: <span id="profileStatus"></span></strong></p>
                <label>Имена:</label>
                <input id="names" name="names"  class="form-control">
                <label>Потребителско име:</label>
                <input id="username"  name="username" disabled class="form-control">
                <label>Email адрес:</label>
                <input id="email"  name="email" class="form-control">
                <label>Роля</label>
                <input id="role"  disabled class="form-control">
                <label>Парола:</label>
                <input type="password"  name="password" class="form-control">
                <label>Повтори парола:</label>
                <input type="password"  name="repassword" class="form-control">
                <input type="submit" value="Запази" class="btn btn-success" id="saveUserInfo">
            </form>
        </div>
    </div>


</div>

<?php
/**
 * Created by PhpStorm.
 * User: Filip
 * Date: 30.5.2016 г.
 * Time: 12:33 ч.
 */