var appCh = appCh || {};

appCh.HomeController = (function () {



    function index(){

        //app.system.notificationSeeker();

        let userId = app.connect.cookie.get('userID');
        let session = app.connect.cookie.get('session');
        let today = new Date();
        let year = today.getFullYear();

        if(session){


            app.connect.get("User/GetUserByID?ID=" + userId,{'Content-type': 'application/json', SessionId : session}).error(function (data) {

                console.log(data);
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

                if(typeof(data)!= 'object'){
                    data = JSON.parse(data);
                }

                $('#userNames').text(data.result.FullName);
                $('#userName').text(data.result.UserName);
                $('#userName').css({
                    'color': '#5bc0de',
                    'font-size': '18px'
                })

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


                $('#unOfficialLeaveInfo').text(dayd + ' дни ' + hours + ' часа ' + minutesLeft + ' минути');
                $('#unOfficialLeaveInfo').css({
                    'font-weight': 'bold'

                });

                $('#officialLeaveInfo').text(data.result.OfficialVacationDays);

                $('#officialLeaveInfo').css({
                    'font-weight': 'bold'

                });

            });


            app.connect.get("OfficialVacation/GetAllOfficialVacationsForPeriodAndUser?UserID="+ userId +"&DateFrom=" + year + "-01-01&DateTo=" + year + "-12-30",
                {
                    "Content-type": "application/json",
                    "SessionId": session
                }
            ).error(function (data) {

                if (data.responseText) {

                    let errorObject = JSON.parse(data.responseText);

                    if (errorObject.error == 'Session not exists or expired') {
                        app.connect.cookie.delete('session');
                        location.href = "/leave_application/user/login"
                    }
                }

                let errorMessage = (data.responseJSON);

                if(errorMessage.result){
                    app.system.systemMessage(errorMessage.result)

                }else if(errorMessage.error){
                    app.system.systemMessage(errorMessage.error)
                }

            }).then(function (data) {

                if(data.result && data.result.length){

                    data.result.reverse();
                    let offLeaveLastOne = data.result[0];
                    let dateFrom = moment(offLeaveLastOne.DateFrom);
                    let dateTo = moment(offLeaveLastOne.DateTo);
                    let status = 'Чакаща';

                    $('#offLeaveInfoStatus').css({
                        'color': 'rgb(178, 178,8 )',
                        'font-weight': 'bold'
                    });

                    if(offLeaveLastOne.isApproved == '1'){
                        status = 'Одобрена';
                        $('#offLeaveInfoStatus').css({
                            'color': 'rgb(68, 157, 68)',
                            'font-weight': 'bold'
                        });
                    }else if(offLeaveLastOne.isApproved == '0'){
                        status = 'Отказана';
                        $('#offLeaveInfoStatus').css({
                            'color': 'rgb(255, 51, 51)',
                            'font-weight': 'bold'
                        });
                    };


                    $('#LastOfficialLeaveInfo').text("от "+dateFrom.format('L') + " до " + dateTo.format('L'));
                    $('#LastOfficialLeaveInfo').css({
                        'font-weight':'bold'

                    });
                    $('#offLeaveInfoStatus').text(status);
                }
            });
        }
    }

    function home(){

        console.log("HOME2")

    }
    return {
        index: index,
        home: home
    }

})();