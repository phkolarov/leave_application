<div class="container">
    <div class="card card-container">

        <img id="profile-img" class="profile-img-card" src="/leave_application/css/images/Logo_ITS.png" />

        <p id="profile-name" class="profile-name-card"></p>
        <form class="form-signin" method="post" action="/leave_application/user/signIn">
            <span id="reauth-email" class="reauth-email"></span>
            <input name="username" type="username" id="username" class="form-control" placeholder="Потребителско име" required autofocus>
            <input name="password" type="password" id="password" class="form-control" placeholder="Парола" required>
            <button class="btn btn-lg btn-primary btn-block btn-signin" type="submit">Вход</button>
        </form>
<!--        <a href="#" class="forgot-password">-->
<!--            Забравена парола? --><?php //echo $this->test; ?>
<!--        </a>-->
    </div>
</div>
