var appCh = appCh || {};

appCh.LeaveApplicationController = (function () {

    function index() {

        console.log("index");
    }

    function addOfficialLeaveApplication() {

        $(".year").empty()
            .append("<option>" + (new Date().getFullYear() - 3) + "</option>")
            .append("<option>" + (new Date().getFullYear() - 2) + "</option>")
            .append("<option>" + (new Date().getFullYear() - 1) + "</option>")
            .append("<option selected='selected'>" + new Date().getFullYear() + "</option>");

        $(document).ready(function () {
            var date_input = $("#datetimepicker4");
            var container = $('.bootstrap-iso form').length > 0 ? $('.bootstrap-iso form').parent() : "body";
            var options = {
                format: 'mm/dd/yyyy',
                container: container,
                todayHighlight: true,
                autoclose: true,
            };
            date_input.datepicker(options);
        });
    }


    function addUnofficialLeaveApplication() {


        console.log("addUnofficialLeaveApplication");
    }

    function pendingRequests() {

        let session = app.connect.cookie.get('session');
        let userId = app.connect.cookie.get('userID');

        function unOfficialLeaveApp() {


            let year = new Date().getFullYear();
            let month = new Date().getMonth() + 1;
            let lastDate = new Date(year, month, 0);


            app.connect.get("Request/GetRequestsForPeriod?DateFrom=" + year + "-" + '1' + "-1&DateTo=" + year + "-" + '12' + "-" + '30' + "&UserID=-1",
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
                    let requestDate = new Date(leaveElement.RequestDateTime);
                    let tempDateFrom = moment(leaveElement.DateFrom);
                    let tempDateTo = moment(leaveElement.DateFrom).add(leaveElement.RequestedMinutes, 'minutes');
                    let dateFrom = tempDateFrom.format("YYYY-MM-DD HH:mm");
                    let dateTo = tempDateTo.format("YYYY-MM-DD HH:mm");
                    let days = tempDateTo.diff(tempDateFrom, 'days');
                    let hours = 0;
                    let minutes = 0;

                    if (tempDateTo.diff(tempDateFrom, 'hours') < 24) {
                        hours = tempDateTo.diff(tempDateFrom, 'hours');
                    }
                    if (tempDateTo.diff(tempDateFrom, 'minutes') < 60) {
                        minutes = tempDateTo.diff(tempDateFrom, 'minutes');
                    }

                    let plAppr = "Неодобрена";
                    let mtAppr = "Неодобрена";
                    let status = "Неодобрена";

                    if (leaveElement.isApprovedByPlamen == true) {

                        plAppr = "Одобрена";
                    }
                    if (leaveElement.isApprovedByMitko == true) {

                        mtAppr = "Одобрена";
                    }
                    if (leaveElement.isApproved == null) {

                        status = "Чакаща";
                    } else if (leaveElement.isApproved == true) {

                        status = "Одобрена";
                    }

                    let disabled = '';

                    if(status == 'Одобрена' || status == 'Неодобрена'){

                        disabled = 'disabled'
                    }

                    let tempStr = "<tr >" +
                        "<td>" + leaveElement.User.FullName + "</td>" +
                        "<td>" + requestDate.getDate() + "." + (requestDate.getMonth() + 1) + "." + requestDate.getFullYear() + " " + requestDate.getHours() + ":" + ('0' + requestDate.getMinutes()).slice(-2) + "</td>" +
                        "<td>" + dateFrom + "</td>" +
                        "<td>" + dateTo + "</td>" +
                        "<td>" + days + " / " + hours + " / " + minutes + "</td>" +
                        "<td>" + plAppr + "</td>" +
                        "<td>" + mtAppr + "</td>" +
                        "<td>" + status + "</td>" +
                        "<td>" + "<button "+disabled +"  requestId='"+leaveElement.ID +"' class='apprUnnofficial btn btn-sm btn-success'>Одобри</button>" + "</td>" +
                        "<td>" + "<button "+disabled +" requestId='"+leaveElement.ID +"' class='deniedUnnofficial btn btn-sm btn-warning'>Откажи</button>" + "</td>" +
                        "</tr>";
                    tableSource += tempStr;
                }

                $("#requestReportTableBody").html(tableSource);


                $(".apprUnnofficial").on('click', function () {

                    let requestId = $(this).attr('requestId');

                    app.connect.post('Request/AcceptDeclineRequest?EditUserID='+ userId +'&action=accept&requestID=' + requestId, {
                        "Content-type": "application/json",
                        "SessionId": session
                    }).then(function (data) {

                        data = JSON.parse(data);
                        console.log(data);
                        if(data.result){

                            app.system.systemMessage("Успешно одобрена отпуска",true);
                        }else {
                            app.system.systemMessage("Неуспешно одобрена отпуска",true);
                        }
                    })

                });

                $(".deniedUnnofficial").on('click', function () {

                    let requestId = $(this).attr('requestId');

                    app.connect.post('Request/AcceptDeclineRequest?EditUserID='+ userId +'&action=reject&requestID=' + requestId, {
                        "Content-type": "application/json",
                        "SessionId": session
                    }).then(function (data) {
                        data = JSON.parse(data);
                        if(data.result){

                            app.system.systemMessage("Успешно отхвърлена отпуска",true);
                        }else {
                            app.system.systemMessage("Неуспешно отхвърлена отпуска",true);
                        }
                    })
                });
            });
        }

        function officialLeaveApp() {

            let optionSource = "";
            let session = app.connect.cookie.get("session");
            let currentYear = new Date().getFullYear();
            let tableSource = "";

            function getApps() {

                let year = new Date().getFullYear();


                app.connect.get("OfficialVacation/GetAllOfficialVacationsForPeriod?DateFrom=" + year + "-01-01&DateTo=" + year + "-12-30",
                    {
                        "Content-type": "application/json",
                        "SessionId": session
                    }
                ).then(function (data) {

                    tableSource = "";
                    let offleaveObject = JSON.parse(data);
                    let status = 'Чакаща';



                    for (let i in offleaveObject.result) {


                        console.log(offleaveObject.result[i].isApproved)
                        if(offleaveObject.result[i].isApproved == true){

                            status = 'Одобрена';
                        }else if(offleaveObject.result[i].isApproved == false){

                            status = 'Неодобрена';
                        }else {

                            status = 'Чакаща';
                        }

                        let leaveElement = offleaveObject.result[i];
                        let moths = ["ян", "фев", "март", "апр", "май", "юни", "юли", "авг", "сеп", "окт", "ное", "дек"];
                        let dateFrom = new Date(leaveElement.DateFrom);
                        let fromMoth = moths[dateFrom.getMonth()];
                        let fromDay = dateFrom.getDate();
                        let dateTo = new Date(leaveElement.DateFrom);
                        let toMoth = moths[dateTo.getMonth()];
                        let toDay = dateTo.getDate();

                        let tempStr = "<tr>" +
                            "<td>" + offleaveObject.result[i].User.FullName + "</td>" +
                            "<td>" + fromDay + " " + fromMoth + " - " + toDay + " " + toMoth + "</td>" +
                            "<td>" + offleaveObject.result[i].SubstitutedBy.FullName + "</td>" +
                            "<td>" + status + "</td>" +
                            "<td>" + "<button id='"+leaveElement.ID +"' class='apprOfficial btn btn-sm btn-success'>Одобри</button>" + "</td>" +
                            "<td>" + "<button id='"+leaveElement.ID +"' class='deniedOfficial btn btn-sm btn-warning'>Откажи</button>" + "</td>" +
                            "</tr>";
                        tableSource += tempStr;
                    }

                    $("#officialReportTableBody").html(tableSource);


                    $('.apprOfficial').on('click', function () {

                        let leaveAppId = $(this)[0].id;

                        app.connect.post('OfficialVacation/AcceptDeclineOfficialVacation?EditUserID='+ userId +'&action=accept&requestID=' + leaveAppId, {
                            "Content-type" : "application/json",
                            "SessionId" : session
                        },null).then(function (data) {
                            data = JSON.parse(data);

                            if(data.result){

                                app.system.systemMessage("Успешно одобрена официална отпуска",true);
                            }else{
                                app.system.systemMessage("Неуспешно одобрена официална отпуска",true);
                            }
                        });
                    });

                    $('.deniedOfficial').on('click', function () {

                        let leaveAppId = $(this)[0].id;

                        app.connect.post('OfficialVacation/AcceptDeclineOfficialVacation?EditUserID='+ userId +'&action=reject&requestID=' + leaveAppId, {
                            "Content-type" : "application/json",
                            "SessionId" : session
                        },null).then(function (data) {
                            data = JSON.parse(data);

                            if(data.result){

                                app.system.systemMessage("Успешно отхвърлена официална отпуска",true);
                            }else{
                                app.system.systemMessage("Неуспешно отхвърлена официална отпуска",true);
                            }
                        });
                    });
                });
            }
            getApps();
        }

        unOfficialLeaveApp();
        officialLeaveApp();

    }

    return {
        addOfficialLeaveApplication: addOfficialLeaveApplication,
        addUnofficialLeaveApplication: addUnofficialLeaveApplication,
        pendingRequests: pendingRequests
    }

})();