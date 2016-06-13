var appCh = appCh || {};

appCh.ReportsController = (function () {



    function index(){

        console.log("report");

    }

    function myOfficialVacations(){

        var optionSource = "";
        var session = app.connect.cookie.get("session");
        var currentYear = new Date().getFullYear();

        for (var i = currentYear - 2; i <= currentYear; i++) {

            if (i == currentYear) {
                var tempOption = "<option selected='selected' value='" + i + "'>" + i + "</option>";
            } else {
                var tempOption = "<option value='" + i + "'>" + i + "</option>";
            }
            optionSource += tempOption;
        }

        $("#year").html(optionSource);

        let tableSource = "";

        datePicker();

        $('#year').on('change', function () {

            datePicker();
        });


        function datePicker() {

            let year = $("#year").val();
            let userId = app.connect.cookie.get('userID');

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

                let dataObject = JSON.parse(data.responseJSON);

                app.system.systemMessage(dataObject.error);

            }).then(function (data) {

                tableSource = "";
                let offleaveObject = JSON.parse(data);

                for (let i in offleaveObject.result) {

                    let leaveElement = offleaveObject.result[i];
                    let moths = ["ян", "фев", "март", "апр", "май", "юни", "юли", "авг", "сеп", "окт", "ное", "дек"];

                    let dateFrom = new Date(leaveElement.DateFrom);
                    let fromMoth = moths[dateFrom.getMonth()];
                    let fromDay = dateFrom.getDate();
                    let dateTo = new Date(leaveElement.DateTo);
                    let toMoth = moths[dateTo.getMonth()];
                    let toDay = dateTo.getDate();
                    let tempStr = "<tr>" +
                        "<td>" + offleaveObject.result[i].User.FullName + "</td>" +
                        "<td>" + fromDay + " " + fromMoth + " - " + toDay + " " + toMoth + "</td>" +
                        "<td>" + offleaveObject.result[i].WorkingDays + "</td>" +
                        "<td>" + offleaveObject.result[i].SubstitutedBy.FullName + "</td>" +
                        "</tr>";
                    tableSource += tempStr;
                }

                $("#leaveReportTableBody").html(tableSource);
            });
        }

    }
    function officialHolidays(){

        let session = app.connect.cookie.get("session");

        function loadHolidays() {

            app.connect.get("Holiday/GetAllOfficialHolidaysForYear?year=2016", {
                "Content-type": "application/json",
                "SessionId": session
            }).error(function (data) {

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


                let today = new Date();
                let y = today.getFullYear();
                let m = today.getMonth();

                let date;
                let dateArray = [];
                let holidayDates = JSON.parse(data);

                for (var i in holidayDates.result) {


                    let tempDate = moment(holidayDates.result[i].Date);
                    let date = tempDate.format("L");
                    dateArray.push(date);
                }


                $('#full-year').multiDatesPicker({
                    onSelect: function(date) {


                        let currentDate = moment(date);


                        app.connect.get('Holiday/GetHolidayByDate?Date=' + currentDate.format('YYYY-MM-DD'),{
                            "Content-type": "application/json",
                            "SessionId": session
                        }).error(function (data) {

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

                            data = JSON.parse(data);

                            if(data.result && data.result != null){

                                let outputDate = moment(data.result.Date);
                                let type = 'Работен';

                                if(type == false){

                                    type = 'Неработен'
                                }
                                $('#previewDate').text(outputDate.format('L'));

                                $('#previewType').text(type);

                                $('#previewMessage').text(data.result.Description);
                            }


                        });

                        //alert(date);
                    },
                    addDates: dateArray,
                    dateFormat: "m/d/yy",
                    numberOfMonths: [3, 4],
                    defaultDate: '1' + '/1/' + y
                });

            });
        }

        loadHolidays();

        $("document").ready(function(){

            $(".ui-datepicker-inline").width("78em");
        });

    }

    return {
        myOfficialVacations: myOfficialVacations,
        officialHolidays: officialHolidays
    }

})();