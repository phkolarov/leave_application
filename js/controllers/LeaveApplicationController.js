var appCh = appCh || {};

appCh.LeaveApplicationController = (function () {

    function index() {

        console.log("index");
    }

    function addOfficialLeaveApplication() {
        let session = app.connect.cookie.get("session");
        $("#expand").hide();
        $("#showExpand").click(function () {
            if ($("#expand").is(":visible")) {
                $("#expand").hide("slow");
            } else {
                $("#expand").show("slow");

            }
        });

        $(document).ready(function () {
            app.connect.get("User/GetAllUsers?active=true", {
                "Content-type": "application/json",
                "SessionId": session
            }).then(function (data) {

                var obj = (data);

                if (typeof (data) != "object") {
                    obj = JSON.parse(data);
                }
                obj = obj.result;
                obj.forEach(function (el) {
                    var debutyId = el.ID;
                    var name = el.FullName;
                    $("#debuty").append("<option value='" + debutyId + "'>" + name + "</option>");
                })
            })

        });

        $(".year").empty()
            .append("<option>" + (new Date().getFullYear() - 3) + "</option>")
            .append("<option>" + (new Date().getFullYear() - 2) + "</option>")
            .append("<option>" + (new Date().getFullYear() - 1) + "</option>")
            .append("<option>" + new Date().getFullYear() + "</option>")
            .append("<option selected='selected'>Изберете година</option>");

        $("#hideTable").hide();

        $("#showYear").change(function () {
            $("#tableData").empty();
            if ($("#showYear").val() != "Изберете година") {
                var id = app.connect.cookie.get("userID");
                var session = app.connect.cookie.get("session");
                var selectedYear = $("#showYear").val();

                app.connect.get("OfficialVacation/GetAllOfficialVacationsForPeriodAndUser?UserID=" + id + "&DateFrom=" + selectedYear + "-01-01&DateTo=" + selectedYear + "-12-30", {
                    "Content-type": "application/json",
                    "SessionId": session
                }).then(function (data) {

                    var obj = (data);

                    if (typeof (data) != "object") {
                        obj = JSON.parse(data);
                    }
                    obj = obj.result;
                    $("#tableData").empty();

                    if (obj !== undefined) {
                        obj.reverse();
                        obj.forEach(function (el) {

                                var dateFrom = el.DateFrom.split(' ')[0];
                                var dateTo = el.DateTo.split(' ')[0];
                                var debuty = el.SubstitutedBy.FullName;

                                $("#tableData").append(
                                    "<tr>" +
                                    "<td><strong>" + dateFrom + "</strong> до <strong>" + dateTo + "</strong></td>" +
                                    "<td>" + el.WorkingDays + "</td>" +
                                    "<td>" + debuty + "</td>" +
                                    "</tr>"
                                )
                            }
                        )
                    }
                    $("#hideTable").show("slow");
                })
            } else {
                $("#hideTable").hide("slow");
                $("#tableData").empty();
            }
        })
        $("#startDate, #endDate").datepicker();

        $("#submit").click(function () {

            var startDate = $("#startDate").val().split('.');
            var startDateFormated = startDate[2] + "-" + startDate[1] + "-" + startDate[0] + "";
            var endDate = $("#endDate").val().split('.');
            var endDateFormated = endDate[2] + "-" + endDate[1] + "-" + endDate[0] + "";
            var data = {
                "UserID": app.connect.cookie.get("userID"),
                "DateFrom": startDateFormated,
                "DateTo": endDateFormated,
                "isApproved": null,
                "SubstitutedBy": $("#debuty").val()
            };
            app.connect.post("OfficialVacation/AddOfficialVacation", {
                "Content-type": "application/json",
                "SessionId": session
            }, data).error(function (data) {

                if (data.responseText) {

                    let errorObject = JSON.parse(data.responseText);

                    if (errorObject.error == 'Session not exists or expired') {
                        app.connect.cookie.delete('session');
                        location.href = "/leave_application/user/login"
                    }
                }

                let errorMessage = (data.responseJSON);

                if (errorMessage.result) {
                    app.system.systemMessage(errorMessage.result)

                } else if (errorMessage.error) {
                    app.system.systemMessage(errorMessage.error)
                }

            }).then(function (data) {

                    if (data.result) {

                        app.system.systemMessage("Молбата за отпуска беше изпратена за потвърждение")
                    } else {

                        console.log(data);
                        app.system.systemMessage(data.error)
                    }

                }
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
            }).error(function (data) {

                if (data.responseText) {

                    let errorObject = JSON.parse(data.responseText);

                    if (errorObject.error == 'Session not exists or expired') {
                        app.connect.cookie.delete('session');
                        location.href = "/leave_application/user/login"
                    }
                }

                let errorMessage = (data.responseJSON);

                if (errorMessage.result) {
                    app.system.systemMessage(errorMessage.result)

                } else if (errorMessage.error) {
                    app.system.systemMessage(errorMessage.error)
                }

            }).then(function (data) {

                let today = new Date();
                let y = today.getFullYear();
                let m = today.getMonth();
                let date;
                let dateArray = [];

                let holidayDates = (data);


                // for (var i in holidayDates.result) {
                //
                //     tempDate = moment(holidayDates.result[i]);
                //     let date = tempDate.format("L");
                //     dateArray.push(date);
                // }

                $('#full-year').multiDatesPicker({
                    dateFormat: "m/d/yy",
                    numberOfMonths: [1, 2],
                    defaultDate: m + '/1/' + y,
                });
            });

        }

        function getRequests() {
            var session = app.connect.cookie.get("session");
            app.connect.get("Request/GetRequestsForPeriod?DateFrom=" + new Date().getFullYear() + "-01-01&DateTo=" + new Date().getFullYear() + "-12-31&UserID=" + app.connect.cookie.get("userID"), {
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

                let errorMessage = (data.responseJSON);

                if (errorMessage.result) {
                    app.system.systemMessage(errorMessage.result)

                } else if (errorMessage.error) {
                    app.system.systemMessage(errorMessage.error)
                }

            }).then(function (data) {

                var res = (data);
                if (typeof(data) != 'object') {

                    res = JSON.parse(data);
                }
                var index = 0;
                $("#unOfficialLeaveTable").hide("slow");
                $("#unOfficialLeaveTable tbody").empty();
                res.result.forEach(function (leave) {
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
                            "<td ></td>" +
                            "<td class='link'></td>" +
                            "</tr>");
                    }

                    var requestedFrom = leave.RequestDateTime.split(' ');
                    requestedFromDate = requestedFrom[0];
                    requestedFromTime = requestedFrom[1].split('.')[0];
                    requestedFromDate += "/" + requestedFromTime;
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

                    $(tableCells[3]).text(calculateDays(leaveTimeInMins))
                    $(tableCells[4]).text(leave.isApprovedByPlamen === null ? "Чакаща" : leave.isApprovedByPlamen == true ? "Одобрена" : "Отказана");
                    $(tableCells[5]).text(leave.isApprovedByMitko === null ? "Чакаща" : leave.isApprovedByMitko == true ? "Одобрена" : "Отказана");


                    if (leave.isApproved == '1') {
                        $(tableCells[6]).text('Одобрена');
                    } else if (leave.isApproved == '0') {
                        $(tableCells[6]).text('Неодобрена');
                    } else {
                        $(tableCells[6]).text('Чакаща');
                    }


                    if (leave.isApproved == null) {
                        $(tableCells[7]).append("<a href='#' class='deleteRequest' id='" + leave.ID + "'>Изтрий</a>");
                    }

                });

                $(".deleteRequest").on("click", (function () {


                    let session = app.connect.cookie.get("session");
                    let unofficialID = $(this)[0].id;
                    app.connect.delete("Request/DeleteRequest?ID=" + unofficialID, {
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

                        let errorMessage = data.responseJSON;

                        if (errorMessage.result) {
                            app.system.systemMessage(errorMessage.result)

                        } else if (errorMessage.error) {
                            app.system.systemMessage(errorMessage.error)
                        }

                    }).then(function () {

                        getRequests();
                        app.system.systemMessage("Молбата беше изтрита", true);

                    })
                }));


            });


        }

        $("#expand").click(function () {
            if ($("#unOfficialLeaveTable").is(':visible')) {
                $("#unOfficialLeaveTable").hide('slow');
            }
            else {
                $("#unOfficialLeaveTable").show('slow');

            }
        })


        getRequests();
        loadHolidays();

        $("#submit").click(function () {
            var id = app.connect.cookie.get("userID");
            var session = app.connect.cookie.get("session");
            var date = $("#fromDate").val().split('.');
            var dateFormat = "" + date[2] + "-" + date[1] + "-" + date[0];
            var theDate = new Date();
            theDate.setHours(theDate.getHours() + 3);
            var isodate = theDate.toISOString();
            var data = {
                "DateFrom": dateFormat,
                "Description": $("#desc").val(),
                "isApproved": null,
                "isApprovedByMitko": null,
                "isApprovedByPlamen": null,
                "RequestDateTime": "" + isodate,
                "RequestedMinutes": ($("#numberDays").val() * 8 * 60 + $("#numberHours").val() * 60 + $("#numberMinutes").val() * 1).toString(),
                "Type": "Неофициална отпуска",
                "UserID": id
            };
            app.connect.post("Request/AddRequest", {
                "Content-type": "application/json",
                "SessionId": session
            }, data).then(function (data) {

                if (data.result) {
                    app.system.systemMessage("Молбата беше подадена");

                } else {
                    app.system.systemMessage(data.error);
                }
                getRequests();
            });
        });

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
            ).error(function (data) {

                if (data.responseText) {

                    let errorObject = JSON.parse(data.responseText);

                    if (errorObject.error == 'Session not exists or expired') {
                        app.connect.cookie.delete('session');
                        location.href = "/leave_application/user/login"
                    }
                }

                let errorMessage = (data.responseJSON);

                if (errorMessage.result) {
                    app.system.systemMessage(errorMessage.result)

                } else if (errorMessage.error) {
                    app.system.systemMessage(errorMessage.error)
                }

            }).then(function (data) {

                tableSource = "";

                let offleaveObject = (data);

                if (typeof (data) != 'object') {
                    offleaveObject = JSON.parse(data);
                }


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

                    if (status == 'Одобрена' || status == 'Неодобрена') {

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
                        "<td >" + "<button " + disabled + "  requestId='" + leaveElement.ID + "' class='apprUnnofficial btn btn-sm btn-success'>Одобри</button>" + "</td>" +
                        "<td>" + "<button " + disabled + " requestId='" + leaveElement.ID + "' class='deniedUnnofficial btn btn-sm btn-warning'>Откажи</button>" + "</td>" +
                        "</tr>";
                    tableSource += tempStr;
                }

                $("#requestReportTableBody").html(tableSource);


                $(".apprUnnofficial").on('click', function () {

                    let requestId = $(this).attr('requestId');

                    app.connect.post('Request/AcceptDeclineRequest?EditUserID=' + userId + '&action=accept&requestID=' + requestId, {
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

                        let errorMessage = (data.responseJSON);

                        if (errorMessage.result) {
                            app.system.systemMessage(errorMessage.result)

                        } else if (errorMessage.error) {
                            app.system.systemMessage(errorMessage.error)
                        }

                    }).then(function (data) {

                        if (typeof (data) != 'object') {
                            data = JSON.parse(data);
                        }

                        if (data.result) {

                            app.system.systemMessage("Успешно одобрена отпуска", true);
                        } else {
                            app.system.systemMessage("Неуспешно одобрена отпуска", true);
                        }
                    })

                });

                $(".deniedUnnofficial").on('click', function () {

                    let requestId = $(this).attr('requestId');

                    app.connect.post('Request/AcceptDeclineRequest?EditUserID=' + userId + '&action=reject&requestID=' + requestId, {
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

                        let errorMessage = (data.responseJSON);

                        if (errorMessage.result) {
                            app.system.systemMessage(errorMessage.result)

                        } else if (errorMessage.error) {
                            app.system.systemMessage(errorMessage.error)
                        }

                    }).then(function (data) {

                        if (typeof (data) != 'object') {
                            data = JSON.parse(data);
                        }
                        if (data.result) {

                            app.system.systemMessage("Успешно отхвърлена отпуска", true);
                        } else {
                            app.system.systemMessage("Неуспешно отхвърлена отпуска", true);
                        }
                    })
                });

                $('tr').on('click', function () {


                    $('.table-hover > tbody > tr').css('background-color', 'transparent');

                    $(this).css('background-color', 'darkgrey');
                })

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
                ).error(function (data) {

                    if (data.responseText) {

                        let errorObject = JSON.parse(data.responseText);

                        if (errorObject.error == 'Session not exists or expired') {
                            app.connect.cookie.delete('session');
                            location.href = "/leave_application/user/login"
                        }
                    }

                    let errorMessage = (data.responseJSON);

                    if (errorMessage.result) {
                        app.system.systemMessage(errorMessage.result)

                    } else if (errorMessage.error) {
                        app.system.systemMessage(errorMessage.error)
                    }

                }).then(function (data) {

                    tableSource = "";
                    let offleaveObject = (data);

                    if (typeof (data) != 'object') {
                        offleaveObject = JSON.parse(data);
                    }

                    let status = 'Чакаща';


                    for (let i in offleaveObject.result) {


                        if (offleaveObject.result[i].isApproved == true) {

                            status = 'Одобрена';
                        } else if (offleaveObject.result[i].isApproved == false) {

                            status = 'Неодобрена';
                        } else {

                            status = 'Чакаща';
                        }

                        let leaveElement = offleaveObject.result[i];
                        let moths = ["ян", "фев", "март", "апр", "май", "юни", "юли", "авг", "сеп", "окт", "ное", "дек"];
                        let dateFrom = new Date(leaveElement.DateFrom);
                        let fromMoth = moths[dateFrom.getMonth()];
                        let fromDay = dateFrom.getDate();
                        let dateTo = new Date(leaveElement.DateTo);
                        let toMoth = moths[dateTo.getMonth()];
                        let toDay = dateTo.getDate();

                        let tempStr = "<tr>" +
                            "<td>" + offleaveObject.result[i].FullName + "</td>" +
                            "<td>" + fromDay + " " + fromMoth + " - " + toDay + " " + toMoth + "</td>" +
                            "<td>" + offleaveObject.result[i].SubstitutedBy + "</td>" +
                            "<td>" + status + "</td>" +
                            "<td>" + "<button id='" + leaveElement.ID + "' class='apprOfficial btn btn-sm btn-success'>Одобри</button>" + "</td>" +
                            "<td>" + "<button id='" + leaveElement.ID + "' class='deniedOfficial btn btn-sm btn-warning'>Откажи</button>" + "</td>" +
                            "</tr>";
                        tableSource += tempStr;
                    }

                    $("#officialReportTableBody").html(tableSource);


                    $('.apprOfficial').on('click', function () {

                        let leaveAppId = $(this)[0].id;

                        app.connect.post('OfficialVacation/AcceptDeclineOfficialVacation?EditUserID=' + userId + '&action=accept&requestID=' + leaveAppId, {
                            "Content-type": "application/json",
                            "SessionId": session
                        }, null).error(function (data) {

                            if (data.responseText) {

                                let errorObject = JSON.parse(data.responseText);

                                if (errorObject.error == 'Session not exists or expired') {
                                    app.connect.cookie.delete('session');
                                    location.href = "/leave_application/user/login"
                                }
                            }

                            let errorMessage = (data.responseJSON);

                            if (errorMessage.result) {
                                app.system.systemMessage(errorMessage.result)

                            } else if (errorMessage.error) {
                                app.system.systemMessage(errorMessage.error)
                            }

                        }).then(function (data) {

                            if (data.result) {

                                app.system.systemMessage("Успешно одобрена официална отпуска", true);
                            } else {
                                app.system.systemMessage("Неуспешно одобрена официална отпуска", true);
                            }
                        });
                    });

                    $('.deniedOfficial').on('click', function () {

                        let leaveAppId = $(this)[0].id;

                        app.connect.post('OfficialVacation/AcceptDeclineOfficialVacation?EditUserID=' + userId + '&action=reject&requestID=' + leaveAppId, {
                            "Content-type": "application/json",
                            "SessionId": session
                        }, null).error(function (data) {

                            if (data.responseText) {

                                let errorObject = JSON.parse(data.responseText);

                                if (errorObject.error == 'Session not exists or expired') {
                                    app.connect.cookie.delete('session');
                                    location.href = "/leave_application/user/login"
                                }
                            }

                            let errorMessage = (data.responseJSON);

                            if (errorMessage.result) {
                                app.system.systemMessage(errorMessage.result)

                            } else if (errorMessage.error) {
                                app.system.systemMessage(errorMessage.error)
                            }

                        }).then(function (data) {

                            if (data.result) {

                                app.system.systemMessage("Успешно отхвърлена официална отпуска", true);
                            } else {
                                app.system.systemMessage("Неуспешно отхвърлена официална отпуска", true);
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

