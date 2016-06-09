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

            let dataObject = JSON.parse(data.responseJSON);

            app.system.systemMessage(dataObject.error);

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

        //$("#saveUserInfo").on('click', function () {
        //
        //    var userObject = {};
        //    var session = app.connect.cookie.get("session");
        //
        //    userObject.ID = app.connect.cookie.get("userID");
        //    userObject.UserName = app.connect.cookie.get("username");
        //    userObject.Password = null;
        //    userObject.FullName = $('#names').val();
        //    userObject.Email = $('#email').val();
        //    userObject.Role = app.connect.cookie.get("role");
        //    userObject.isActive = isActive;
        //
        //    var response = app.connect.post("User/EditUser",{"Content-type": "application/json", SessionId : session},userObject);
        //
        //    response.then(function (data) {
        //
        //        if(data){
        //
        //            var resultObject = JSON.parse(data);
        //
        //            if(resultObject.result){
        //
        //                app.system.systemMessage("Успешно променен профил");
        //            }else{
        //                app.system.systemMessage("Проблем при промяна на профил",true);
        //            }
        //
        //        }
        //    })
        //})
    }

    return {
        index : index,
        profile: profile
    }



})();