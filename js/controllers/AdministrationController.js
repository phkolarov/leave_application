var appCh = appCh || {};

appCh.AdministrationController = (function () {

    function editRemainingLeave() {

        console.log('editRemainingLeave');
    }

    function usersList() {
        console.log('usersList');

    }

    function officialHolidays() {

        console.log('officialHolidays');

    }

    function officialLeaveReport() {

        var optionSource = "";
        var session = app.connect.cookie.get("session");
        var currentYear = new Date().getFullYear();

        for (var i = currentYear - 2; i <= currentYear; i++) {

            var tempOption = "<option value='" + i + "'>" + i + "</option>"
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

            app.connect.get("OfficialVacation/GetAllOfficialVacationsForPeriod?DateFrom=" + year + "-01-01&DateTo=" + year + "-12-30",
                {
                    "Content-type": "application/json",
                    "SessionId": session
                }
            ).then(function (data) {


                tableSource = "";

                let offleaveObject = JSON.parse(data);

                for (let i in offleaveObject.result) {

                    let leaveElement = offleaveObject.result[i];


                    let moths = ["ян", "фев", "март", "апр", "май", "юни", "юли", "авг", "сеп", "окт", "ное", "дек"];
                    let dateFrom = new Date(leaveElement.DateFrom);
                    let fromMoth = moths[dateFrom.getMonth()];
                    let fromDay = dateFrom.getDate();

                    let dateTo = new Date(leaveElement.DateFrom);
                    let toMoth = moths[dateTo.getMonth()];
                    let toDay = dateTo.getDate();

                    let tempStr = "<tr><td>" + offleaveObject.result[i].User.FullName + "</td><td>" + fromDay + " " + fromMoth + " - " + toDay + " " + toMoth + "</td><td>" + offleaveObject.result[i].SubstitutedBy.FullName + "</td></tr>";
                    tableSource += tempStr;
                }

                $("#leaveReportTableBody").html(tableSource);


            });
        }

    }

    function requestReport() {

        let optionSource = "";
        let session = app.connect.cookie.get("session");
        let currentYear = new Date().getFullYear();

        for (var i = currentYear - 2; i <= currentYear; i++) {

            if (i == currentYear) {
                var tempOption = "<option selected='selected' value='" + i + "'>" + i + "</option>"

            } else {
                var tempOption = "<option value='" + i + "'>" + i + "</option>"
            }
            optionSource += tempOption;
        }

        let date = new Date();
        let month = date.getMonth();

        $($("#month").children()[month]).attr("selected", "selected");


        $("#year").html(optionSource);

        let tableSource = "";

        datePicker();

        $('#year').on('change', function () {

            datePicker();
        });
        $('#month').on('change', function () {

            datePicker();
        });

        function datePicker() {

            let year = $("#year").val();
            let month = $("#month").val();
            let lastDate = new Date(year, month, 0);

            app.connect.get("Request/GetRequestsForPeriod?DateFrom="+year+"-"+month+"-1&DateTo="+year+"-"+month+"-"+ lastDate.getDate()+"&UserID=-1",
                {
                    "Content-type": "application/json",
                    "SessionId": session
                }
            ).then(function (data) {


                tableSource = "";

                let offleaveObject = JSON.parse(data);

                for (let i in offleaveObject.result) {

                    let leaveElement = offleaveObject.result[i];

                    console.log(leaveElement);

                    let moths = ["ян", "фев", "март", "апр", "май", "юни", "юли", "авг", "сеп", "окт", "ное", "дек"];
                    let dateFrom = new Date(leaveElement.DateFrom);
                    let fromMoth = moths[dateFrom.getMonth()];
                    let fromDay = dateFrom.getDate();

                    let dateTo = new Date(leaveElement.DateFrom);
                    let toMoth = moths[dateTo.getMonth()];
                    let toDay = dateTo.getDate();

                    let tempStr = "<tr><td>" + offleaveObject.result[i].User.FullName + "</td><td>" + fromDay + " " + fromMoth + " - " + toDay + " " + toMoth + "</td><td>" + offleaveObject.result[i].SubstitutedBy.FullName + "</td></tr>";
                    tableSource += tempStr;
                }

                $("#requestReportTableBody").html(tableSource);


            });
        }
    }

    return {
        editRemainingLeave: editRemainingLeave,
        usersList: usersList,
        officialHolidays: officialHolidays,
        officialLeaveReport: officialLeaveReport,
        requestReport: requestReport
    }


})();