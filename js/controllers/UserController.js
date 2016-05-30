var appCh = appCh || {};

appCh.UserController = (function () {

    function index(){

        console.log("PROFILE INDEX");
    }

    function profile(){

        var id = 3;
        var session = app.connect.cookie.get("session");
        var requestResult = app.connect.get("User/GetUserByID?ID="+ id,{"Content-type": "application/json", SessionId : session});
        var test =  null;

        requestResult.then(function (data) {


            var userObject = JSON.parse(data);
            userObject = userObject.result;
            console.log(userObject);
            $('#names').val(userObject.FullName)




        });


    }

    return {
        index : index,
        profile: profile
    }



})();