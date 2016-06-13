var appCh = appCh || {};

appCh.UserController = (function () {

    function index(){

        console.log("PROFILE INDEX");
    }

    function profile(){


        let url = location.pathname;

        let isSaved = url.match(/changeParams&isValid=((\btrue\b)|(\bfalse\b))/);

        if(isSaved != undefined){

            if(isSaved[1] == 'true'){

                app.system.systemMessage("Успешно обновен профил");
            }else {
                app.system.systemMessage("Неуспешно обновен профил");
            }
        }


        var id = app.connect.cookie.get("userID");
        var session = app.connect.cookie.get("session");
        var isActive = app.connect.cookie.get("isActive");
        var requestResult = app.connect.get("User/GetUserByID?ID="+ id,{"Content-type": "application/json", SessionId : session});


        requestResult.error(function (data) {

            if (data.responseText) {

                let errorObject = JSON.parse(data.responseText);

                if (errorObject.error == 'Session not exists or expired') {
                    app.connect.cookie.delete('session');
                    location.href = "/leave_application/user/login"
                }
            }

            let errorMessage = JSON.parse(data.responseJSON);

            if(errorMessage.result){
                app.system.systemMessage(errorMessage.result)

            }else if(errorMessage.error){
                app.system.systemMessage(errorMessage.error)
            }

        }).then(function (data) {

            var userObject = JSON.parse(data);
            userObject = userObject.result;

            let dayd = (parseInt((parseInt(userObject.VacationMinutes) / 60) / 8));
            let hours = (parseInt((parseInt(userObject.VacationMinutes) / 60) % 8));
            let tempMinutes = (((parseInt(userObject.VacationMinutes) / 60) % 8) + "").slice(+2);
            let minutesLeft = parseInt(parseFloat("0." + tempMinutes) * 60);


            let outputDate =  dayd + " дни "  + hours +" часа " + minutesLeft + " минути ";

            $('#leaveLeft').text(outputDate)
            $('#names').val(userObject.FullName);
            $('#username').val(userObject.UserName);
            $('#email').val(userObject.Email);
            $('#role').val(userObject.Role);

            if(userObject.isActive == true){

                $("#profileStatus").text("Активен");
            }else{

                $("#profileStatus").text("Неактивен");
                $("#profileStatus").css("color","red")
            }

        });
    }

    function login(){

    }

    return {
        index : index,
        profile: profile,
        login  : login
    }



})();