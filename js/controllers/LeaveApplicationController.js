var appCh = appCh || {};

appCh.LeaveApplicationController = (function () {

    function index() {

        console.log("index");
    }

    function addOfficialLeaveApplication() {
        let session = app.connect.cookie.get("session");

        $(document).ready(function(){
            app.connect.get("User/GetAllUsers",{
                "Content-type": "application/json",
                "SessionId": session
            }).then(function (data){
                var obj = JSON.parse(data);
                obj = obj.result;
                obj.forEach(function(el){
                    var name = el.FullName;
                    $("#debuty").append("<option value='"+name+"'>"+name+"</option>");
                })
            })
        })

        $(".year").empty()
            .append("<option>" + (new Date().getFullYear() - 3) + "</option>")
            .append("<option>" + (new Date().getFullYear() - 2) + "</option>")
            .append("<option>" + (new Date().getFullYear() - 1) + "</option>")
            .append("<option selected='selected'>" + new Date().getFullYear() + "</option>");
        $("#startDate, #endDate").datepicker();



        $("#submit").click(function(){
            var startDate = $("#startDate").val().split('.');
            var startDateFormated = startDate[2]+"-"+startDate[1]+"-"+startDate[0]+"";
            var endDate = $("#endDate").val().split('.');
            var endDateFormated = endDate[2]+"-"+endDate[1]+"-"+endDate[0]+"";
            var data = {
                "UserID": app.connect.cookie.get("userID"),
                "DateFrom":startDateFormated,
                "DateTo": endDateFormated,
                "isApproved": null,
                "SubstitutedBy": $("#debuty").val()
            }
            console.log(data);
            app.connect.post("OfficialVacation/AddOfficialVacation",{
                "Content-type": "application/json",
                "SessionId": session
            },data).then(
                app.system.systemMessage("Молбата за отпуска беше изпратена за потвърждение")
            );
        })



    }


    function addUnofficialLeaveApplication() {
        $("#fromDate").datepicker();
        let session = app.connect.cookie.get("session");

        function loadHolidays() {
            app.connect.get("Holiday/GetAllHolidaysForPeriod?DateFrom=" + new Date().getFullYear() + "-1-1&DateTo=" + new Date().getFullYear() + "-12-30", {
                "Content-type": "application/json",
                "SessionId": session
            }).then(function (data) {

                let today = new Date();
                let y = today.getFullYear();
                let m = today.getMonth();
                let date;
                let dateArray = [];
                let holidayDates = JSON.parse(data);
                 // for (var i in holidayDates.result) {
                 //
                 //     tempDate = moment(holidayDates.result[i]);
                 //     let date = tempDate.format("L");
                 //     dateArray.push(date);
                 // }

                $('#full-year').multiDatesPicker({
                    dateFormat: "m/d/yy",
                    numberOfMonths: [1, 2],
                    defaultDate: m + '/1/' + y
                });
            });

        }

        function getRequests() {
            var session = app.connect.cookie.get("session");
            app.connect.get("Request/GetRequestsForPeriod?DateFrom=" + new Date().getFullYear() + "-01-01&DateTo=" + new Date().getFullYear() + "-12-31&UserID=" + app.connect.cookie.get("userID"), {
                "Content-type": "application/json",
                "SessionId": session
            }).then(function (data) {
                var res = JSON.parse(data);
                var index = 0;
                $("#unOfficialLeaveTable").hide();
                $("#unOfficialLeaveTable tbody").empty();
                res.result.forEach(function (leave) {
                    console.log(!$("a#" + leave.ID));
                    index++;
                    if ($("a#" + leave.ID).length === 0) {
                        $("#unOfficialLeaveTable tbody").append(
                            "<tr id='" + index + "'>" +
                            "<td></td>" +
                            "<td></td>" +
                            "<td></td>" +
                            "<td></td>" +
                            "<td></td>" +
                            "<td></td>" +
                            "<td></td>" +
                            "<td class='link'></td>" +
                            "</tr>");
                    }

                    var requestedFrom = leave.RequestDateTime.split('T');
                    requestedFromDate = requestedFrom[0];
                    requestedFromTime = requestedFrom[1].split('.')[0];
                    requestedFromDate += " " + requestedFromTime;
                    console.log(requestedFromDate);
                    var tableCells = $("tr#" + index + " td").toArray();
                    $(tableCells[0]).text(requestedFromDate);
                    $(tableCells[1]).text(leave.User.FullName);
                    $(tableCells[2]).text(leave.DateFrom.split('T')[0]);

                    var leaveTimeInMins = leave.RequestedMinutes;

                    function calculateDays(leaveTimeInMins) {
                        var mins = leaveTimeInMins % 60;
                        leaveTimeInMins -= mins;
                        leaveTimeInMins /= 60;
                        var hours = leaveTimeInMins % 8;
                        leaveTimeInMins -= hours;
                        leaveTimeInMins /= 8;
                        var days = leaveTimeInMins;
                        var time = [days, hours, mins];
                        return time[0] + "/" + time[1] + "/" + time[2];
                    }

                    $(tableCells[4]).text(calculateDays(leaveTimeInMins))
                    $(tableCells[5]).text(leave.isApprovedByPlamen === null ? "Чакаща" : leave.isApprovedByPlamen == true ? "Одобрена" : "Отказана");
                    $(tableCells[6]).text(leave.isApprovedByMitko === null ? "Чакаща" : leave.isApprovedByMitko == true ? "Одобрена" : "Отказана");
                    console.log(res.result);
                    if (leave.isApproved === true) {
                        $(tableCells[7]).empty()
                    }
                    else {
                        $(tableCells[7]).append("<a href='#' class='deleteRequest' id='" + leave.ID + "'>Изтрий</a>");
                    }
                })

                $(".deleteRequest").on("click", (function () {


                    let session = app.connect.cookie.get("session");
                    let unofficialID = $(this)[0].id;
                    app.connect.delete("Request/DeleteRequest?ID=" + unofficialID, {
                        "Content-type": "application/json",
                        "SessionId": session
                    }).then(function () {

                        getRequests()
                        app.system.systemMessage("Молбата беше изтрита");

                    })
                }));


            });


        }

        $("#expand").click(function () {
            if ($("#unOfficialLeaveTable").is(':visible')) {
                $("#unOfficialLeaveTable").hide();
            }
            else {
                $("#unOfficialLeaveTable").show();

            }
        })


        getRequests();
        loadHolidays();
        $("#submit").click(function () {
            var id = app.connect.cookie.get("userID");
            var session = app.connect.cookie.get("session");
            var date = $("#fromDate").val().split('.');
            var dateFormat = "" + date[2] + "-" + date[1] + "-" + date[0];
            var data = {
                "DateFrom": dateFormat,
                "Description": $("#desc").val(),
                "isApproved": null,
                "isApprovedByMitko": null,
                "isApprovedByPlamen": null,
                "RequestDateTime": "" +new Date().toISOString()+ "",
                "RequestedMinutes": ($("#numberDays").val() * 8 * 60 + $("#numberHours").val() * 60 + $("#numberMinutes").val() * 1).toString(),
                "Type": "Неофициална отпуска",
                "UserID": id
            };
            app.connect.post("Request/AddRequest", {
                "Content-type": "application/json",
                "SessionId": session
            }, data).then(function () {
                getRequests();
            })
            app.system.systemMessage("Молбата беше подадена", true);
        });

    }

    function pendingRequests() {

        console.log("pendingRequests");

    }

    return {
        addOfficialLeaveApplication: addOfficialLeaveApplication,
        addUnofficialLeaveApplication: addUnofficialLeaveApplication,
        pendingRequests: pendingRequests
    }

})();