var appCh = appCh || {};

appCh.HomeController = (function () {



    function index(){

        app.system.notificationSeeker();

        let userId = app.connect.cookie.get('userID');
        let session = app.connect.cookie.get('session');


        app.connect.get("User/GetUserByID?ID=" + userId,{'Content-type': 'application/json', SessionId : session}).error(function (data) {

            let dataObject = JSON.parse(data.responseJSON);

            app.system.systemMessage(dataObject.error);

        }).then(function (data) {

            data = JSON.parse(data);

            $('#userNames').text(data.result.FullName);
            $('#userName').text(data.result.UserName);

            if(data.result.isActive){
                $('#isActive').text('Активен');
                $('#isActive').css('color', '#449d44');

            }else{

                $('#isActive').text('Неактивен');
                $('#isActive').css('color', 'red');

            }



            let dayd = (parseInt((parseInt(data.result.VacationMinutes) / 60) / 8));
            let hours = (parseInt((parseInt(data.result.VacationMinutes) / 60) % 8));
            let tempMinutes = (((parseInt(data.result.VacationMinutes) / 60) % 8) + "").slice(+2);
            let minutesLeft = parseInt(parseFloat("0." + tempMinutes) * 60);


            $('#unOfficialLeave').text(dayd + ' дни ' + hours + ' часа ' + minutesLeft + ' минути');



            console.log(data);
        });

        //app.connect.get('', {'Content-type': 'application/json', SessionId : session}).error(function (data) {
        //
        //    let dataObject = JSON.parse(data.responseJSON);
        //
        //    app.system.systemMessage(dataObject.error);
        //
        //}).then(function (data) {
        //
        //
        //    console.log(data);
        //})
    }

    function home(){

        console.log("HOME2")

    }
    return {
        index: index,
        home: home
    }

})();