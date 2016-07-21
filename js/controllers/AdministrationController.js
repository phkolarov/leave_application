var appCh = appCh || {};

appCh.AdministrationController = (function () {

    function editRemainingLeave() {

        let session = app.connect.cookie.get("session");
        let adminId = app.connect.cookie.get("userID");

        function loadUsersList(param) {


            let tableString = "";
            let uri = "User/GetAllUsers";

            if (param == true || param == false) {

                uri += ("?active=" + param);
            }


            app.connect.get(uri, {
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
                let dataObject = (data.responseJSON);

                app.system.systemMessage(dataObject.error);

            }).then(function (data) {

                usersListObject = data;

                if(typeof (data)!= 'object'){

                    usersListObject = JSON.parse(data);
                }
                for (let i in usersListObject.result) {


                    let userElem = usersListObject.result[i];

                    let dayd = (parseInt((parseInt(userElem.VacationMinutes) / 60) / 8));
                    let hours = (parseInt((parseInt(userElem.VacationMinutes) / 60) % 8));
                    let tempMinutes = (((parseInt(userElem.VacationMinutes) / 60) % 8) + "").slice(+2);
                    let minutesLeft = parseInt(parseFloat("0." + tempMinutes) * 60);
                    let rowString = "<tr class='userListRow' totalMinutes='"+ userElem.VacationMinutes +"' userId='" + userElem.ID + "' name='" + userElem.FullName + "' username='" + userElem.UserName + "' officialLeave='" + userElem.OfficialVacationDays + "'>" +
                        "<td>" + userElem.FullName + "</td>" +
                        "<td>" + userElem.UserName + "</td>" +
                        "<td >" + dayd + " дни " + hours + " часа " + minutesLeft + " минути " + "</td>" +
                        "<td>" + userElem.OfficialVacationDays + " дни </td>" +
                        "</tr>";

                    tableString += rowString;

                }


                $('#usersListTableBody').html(tableString);

                $('.userListRow').on('click', function () {

                    $(".employee").val($(this).attr("name"));
                    $("#officialDays").val($(this).attr("officialLeave"));
                    $("#unEmployeeInput").attr("employeeId", $(this).attr("userId"));
                    $("#offEmployeeInput").attr("employeeId", $(this).attr("userId"));
                    $("#totalSelectedMinutes").val($(this).attr("totalminutes"));

                });

                $('#addUnofficial').on('click', function () {

                    let userId = $("#unEmployeeInput").attr("employeeId");
                    let description = $("#unOfficialDescription").val();

                    let totalMinutes = 0;

                    if ($("#unDays").val()) {

                        totalMinutes += (parseInt($("#unDays").val()) * 8) * 60;
                    }
                    if($("#unHours").val()){

                        totalMinutes += (parseInt($("#unHours").val()) * 60);
                    }

                    if($("#unMinutes").val()){

                        totalMinutes += parseInt($("#unMinutes").val());
                    }

                    if (!isNaN(userId) && totalMinutes != 0) {


                        if(!isNaN(parseInt($("#totalSelectedMinutes").val()))){
                            totalMinutes += parseInt($("#totalSelectedMinutes").val());
                        }

                        let unofficialObject = {
                            "ChangedFrom": adminId,
                            "UserID": userId,
                            "Minutes": totalMinutes,
                            "Description": description
                        };

                        app.connect.post("User/EditMinutes", {
                            "Content-type": "application/json",
                            "SessionId": session
                        }, unofficialObject).error(function (data) {

                            if (data.responseText) {

                                let errorObject = JSON.parse(data.responseText);

                                if (errorObject.error == 'Session not exists or expired') {
                                    app.connect.cookie.delete('session');
                                    location.href = "/leave_application/user/login"
                                }

                            }

                            let dataObject = (data.responseJSON);

                            app.system.systemMessage(dataObject.error);

                        }).then(function (data) {

                            if(typeof(data) != 'object'){

                                data = JSON.parse(data);
                            }

                            if (data.result) {

                                app.system.systemMessage("Успешно добавена отпуска",true);
                                console.log(data);
                            } else {

                                app.system.systemMessage("Неуспешно добавена отпуска",true);
                                console.log(data);

                            }

                        })

                    } else {

                        if(totalMinutes == 0){

                            app.system.systemMessage("Моля въведете коректни данни за отпуск");
                        }else{
                            app.system.systemMessage("Моля изберете служител");
                        }

                    }


                })

                $('#substrUnofficial').on('click', function () {
                    let userId = $("#unEmployeeInput").attr("employeeId");
                    let description = $("#unOfficialDescription").val();

                    let totalMinutes = 0;

                    if ($("#unDays").val()) {

                        totalMinutes += (parseInt($("#unDays").val()) * 8) * 60;
                    }
                    if($("#unHours").val()){

                        totalMinutes += (parseInt($("#unHours").val()) * 60);
                    }

                    if($("#unMinutes").val()){

                        totalMinutes += parseInt($("#unMinutes").val());
                    }

                    let totalUnoficialMinutes = parseInt($("#totalSelectedMinutes").val());

                    console.log(totalUnoficialMinutes);

                    if (!isNaN(userId) && totalMinutes != 0 && totalUnoficialMinutes > 0) {

                        totalUnoficialMinutes -= totalMinutes;

                        if(totalUnoficialMinutes >= 0 ) {

                            let unofficialObject = {
                                "ChangedFrom": adminId,
                                "UserID": userId,
                                "Minutes": totalUnoficialMinutes,
                                "Description": description
                            };

                            app.connect.post("User/EditMinutes", {
                                "Content-type": "application/json",
                                "SessionId": session
                            }, unofficialObject).error(function (data) {

                                if (data.responseText) {

                                    let errorObject = JSON.parse(data.responseText);

                                    if (errorObject.error == 'Session not exists or expired') {
                                        app.connect.cookie.delete('session');
                                        location.href = "/leave_application/user/login"
                                    }

                                }

                                let dataObject = (data.responseJSON);

                                app.system.systemMessage(dataObject.error);

                            }).then(function (data) {

                                if(typeof(data) != 'object'){

                                    data = JSON.parse(data);
                                }

                                if (data.result) {

                                    app.system.systemMessage("Успешно отнета отпуска",true);
                                } else {

                                    app.system.systemMessage("Неуспешно отнета отпуска",true);

                                }

                            })

                        }else{

                            app.system.systemMessage("Надвишавате текущата неофициална отпуска");
                        }
                    } else {

                        if(totalMinutes == 0){

                            app.system.systemMessage("Моля въведете коректни данни за отпуск");
                        }else{
                            app.system.systemMessage("Служителят няма отпуска, която да бъде отнета");
                        }

                        console.log(totalUnoficialMinutes);
                    }

                });

                $('#changeOfficial').on('click', function () {


                    let employeeId = $('#offEmployeeInput').attr('employeeId');

                    if (!isNaN(employeeId)) {


                        let days = 0;


                        if ($("#officialDays").val()) {

                            days += parseInt($("#officialDays").val());
                        }

                        let employeeObject = {
                            "ChangedFrom": adminId,
                            "UserID": employeeId,
                            "Days": days,
                            "Description": ""
                        };

                        app.connect.post("User/EditOfficialVacation", {
                            "Content-type": "application/json",
                            "SessionId": session
                        }, employeeObject).error(function (data) {

                            if (data.responseText) {

                                let errorObject = JSON.parse(data.responseText);

                                if (errorObject.error == 'Session not exists or expired') {
                                    app.connect.cookie.delete('session');
                                    location.href = "/leave_application/user/login"
                                }

                            }

                            let dataObject = (data.responseJSON);

                            app.system.systemMessage(dataObject.error);

                        }).then(function (data) {


                            console.log(data);

                            if(typeof(data) != 'object'){

                                data = JSON.parse(data);
                            }
                            if (data.result) {

                                app.system.systemMessage("Успешно добавена официална отпуска", true);

                            } else {

                                app.system.systemMessage("Неуспешно добавена официална отпуска");
                            }
                        })

                    } else {


                        app.system.systemMessage("Моля изберете служител");
                    }


                })

                $('#substrOfficial').on('click', function () {


                    let employeeId = $('#offEmployeeInput').attr('employeeId');

                    if (!isNaN(employeeId)) {


                        let days = 0;


                        if ($("#officialDays").val()) {

                            days += parseInt($("#officialDays").val());
                        }

                        days = (days * -1);

                        let employeeObject = {
                            "ChangedFrom": adminId,
                            "UserID": employeeId,
                            "Days": days,
                            "Description": ""
                        };

                        app.connect.post("User/EditOfficialVacation", {
                            "Content-type": "application/json",
                            "SessionId": session
                        }, employeeObject).error(function (data) {

                            if (data.responseText) {

                                let errorObject = JSON.parse(data.responseText);

                                if (errorObject.error == 'Session not exists or expired') {
                                    app.connect.cookie.delete('session');
                                    location.href = "/leave_application/user/login"
                                }

                            }

                            let dataObject = (data.responseJSON);

                            app.system.systemMessage(dataObject.error);

                        }).then(function (data) {

                            data = JSON.parse(data);
                            if (data.result) {

                                app.system.systemMessage("Успешно отнета официална отпуска", true);

                            } else {

                                app.system.systemMessage("Неуспешно отнета официална отпуска");
                            }
                        })

                    } else {

                        app.system.systemMessage("Моля изберете служител");
                    }
                })

                $('tr').on('click', function () {


                    $('.table-hover > tbody > tr').css('background-color', 'transparent');
                    $('.table-hover > tbody > tr').css('color', 'black');

                    $(this).css('background-color', 'darkgrey')
                    $(this).css('color', 'white')
                    console.log(121221212121);
                })
            })


        }

        loadUsersList(true);


    }

    function usersList() {


        let uriParams = location.pathname.match(/added=((\btrue\b)|(\bfalse\b))/);
        let message = location.href.match(/message=(.+)/);


        setTimeout(function () {
            if (uriParams) {

                if (uriParams[1] == 'true') {
                    app.system.systemMessage("Успешно добавен потребител");
                } else {
                    app.system.systemMessage("Неуспешно добавен потребител");
                }
            }
        },100);


        let session = app.connect.cookie.get("session");

        $("#usersFilter").on('change', function () {
            if ($("#usersFilter").val() == 1) {

                loadUsersList(true)
            } else if ($("#usersFilter").val() == 2) {

                loadUsersList()
            } else {
                loadUsersList(false)
            }
        });

        $("#generatePassword").on('click', function () {
            generatePassword();
        });


        $("#addUser").on('click', function () {

            let username = $("#username").val();
            let names = $("#names").val();
            let email = $("#email").val();
            let role = $("#userRoleOptions").val();
            let isActive = $("#isActive").val();
            let password = $("#password").val();


        });


        function loadUsersList(param) {


            let tableString = "";
            let session = app.connect.cookie.get("session");

            let uri = "User/GetAllUsers";

            if (param == true || param == false) {

                uri += ("?active=" + param);
            }


            app.connect.get(uri, {
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

                let dataObject = (data.responseJSON);

                app.system.systemMessage(dataObject.error);

            }).then(function (data) {

                let usersListObject = data;

                if (typeof(data) != "object") {

                    usersListObject = JSON.parse(data);
                }

                for (let i in usersListObject.result) {


                    let userElem = usersListObject.result[i];

                    let dayd = (parseInt((parseInt(userElem.VacationMinutes) / 60) / 8));
                    let hours = (parseInt((parseInt(userElem.VacationMinutes) / 60) % 8));
                    let tempMinutes = (((parseInt(userElem.VacationMinutes) / 60) % 8) + "").slice(+2);
                    let minutesLeft = parseInt(parseFloat("0." + tempMinutes) * 60);


                    let rowString = "<tr>" +
                        "<td>" + userElem.FullName + "</td>" +
                        "<td>" + userElem.UserName + "</td>" +
                        "<td>" + userElem.isActive + "</td>" +
                        "<td>" + userElem.Role + "</td>" +
                        "<td>" + dayd + " дни " + hours + " часа " + minutesLeft + " минути " + "</td>" +
                        "<td>" + userElem.OfficialVacationDays + "</td>" +
                        "<td><a href='#' class='deleteUser' id='" + userElem.ID + "'>Изтрий</a></td>" +
                        "</tr>";

                    tableString += rowString;
                }


                $("#usersListTableBody").html(tableString);


                $(".deleteUser").on('click', function () {

                    app.connect.delete('User/DeactivateUser?ID=' + $(this)[0].id, {
                        "Content-type": "application/json",
                        "SessionId": session
                    }).then(function (data) {

                        let response = data;
                        if (typeof(data) != "object") {

                            response = JSON.parse(data);
                        }


                        if (response.result) {

                            app.system.systemMessage("Успешно изтрит потребител");
                        } else {
                            app.system.systemMessage("Неуспешно изтрит потребител");
                        }

                        loadUsersList(true);
                    });


                });
            })


        }


        function generatePassword() {
            String.prototype.pick = function (min, max) {
                var n, chars = '';

                if (typeof max === 'undefined') {
                    n = min;
                } else {
                    n = min + Math.floor(Math.random() * (max - min + 1));
                }

                for (var i = 0; i < n; i++) {
                    chars += this.charAt(Math.floor(Math.random() * this.length));
                }

                return chars;
            };


            String.prototype.shuffle = function () {
                var array = this.split('');
                var tmp, current, top = array.length;

                if (top) while (--top) {
                    current = Math.floor(Math.random() * (top + 1));
                    tmp = array[current];
                    array[current] = array[top];
                    array[top] = tmp;
                }

                return array.join('');
            };

            let specials = '!@#$%^&*()_+{}:"<>?\|[];\',./`~';
            let lowercase = 'abcdefghijklmnopqrstuvwxyz';
            let uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            let numbers = '0123456789';

            let all = specials + lowercase + uppercase + numbers;

            let password = '';
            password += specials.pick(1);
            password += lowercase.pick(1);
            password += uppercase.pick(1);
            password += all.pick(3, 10);
            password = password.shuffle();


            $("#password").val(password);

        }


        loadUsersList(true);

    }

    function officialHolidays() {

        var session = app.connect.cookie.get("session");
        var currentYear = new Date().getFullYear();


        let date = $("#datepicker").datepicker();
        let isWorked = $("#isWorked").val() == 1 ? false : true;
        let dayDescription = $("#description");


        $('#addHoliday').on('click', function () {

            let currentDate = moment($("#datepicker").datepicker("getDate"));
            let holyProject = {
                "Date": currentDate.format("YYYY-MM-DD"),
                "isWorking": isWorked,
                "Description": dayDescription.val()
            };

            if (currentDate.format("YYYY-MM-DD") == "Invalid date") {
                app.system.systemMessage("Невалидна дата");
            } else {
                app.connect.post("Holiday/AddOfficialHoliday", {
                    "Content-type": "application/json",
                    "SessionId": session
                }, holyProject).error(function (data) {

                    if (data.responseText) {

                        let errorObject = JSON.parse(data.responseText);

                        if (errorObject.error == 'Session not exists or expired') {
                            app.connect.cookie.delete('session');
                            location.href = "/leave_application/user/login"
                        }

                    }

                    let dataObject = (data.responseJSON);

                    app.system.systemMessage(dataObject.error);

                }).then(function (data) {

                    if(typeof(data) != "object"){
                        data = JSON.parse(data);
                    }

                    if (data.result) {
                        loadHolidays();
                        loadYearHolidays();
                        $("#datepicker").datepicker().val("");
                        $("#isWorked").val("");
                        $("#description").val("");
                        app.system.systemMessage("Успешно добавен почивен ден");
                    } else {

                        app.system.systemMessage("Неуспешно добавен почивен ден", true);

                    }

                });

            }
        });

        function loadYearHolidays() {


            let year = new Date();

            app.connect.get("Holiday/GetAllOfficialHolidaysForYear?year="+ year.getFullYear(), {
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

                let dataObject = (data.responseJSON);

                app.system.systemMessage(dataObject.error);

            }).then(function (data) {

                let holidaysTableString = "";
                let holidaysObject = data;


                if(typeof(data) != "object"){
                    holidaysObject = JSON.parse(data);
                }

                for (let i in holidaysObject.result) {

                    let currentDate = moment(holidaysObject.result[i].Date);
                    let description = holidaysObject.result[i].Description;
                    let holiId = holidaysObject.result[i].ID;
                    let isWorking = holidaysObject.result[i].isWorking == true ? "Работен" : "Неработен";
                    let workingCSS = holidaysObject.result[i].isWorking == true ? "red" : "green";

                    let tempString = "<tr><td style=' color:" + workingCSS + "'>" + isWorking + "</td><td>" + currentDate.format("MM-DD-YYYY") + "</td><td>" + description + "</td><td>" +
                        '<a href="#" class="deleteHoliday" id="' + holiId + '">Изтрий</a>' +
                        "</td></tr>";

                    holidaysTableString += tempString;
                }

                $("#monthHolidaysTableBody").html(holidaysTableString);


                $(".deleteHoliday").on('click', function () {

                    let holyId = $(this)[0].id;

                    app.connect.delete("Holiday/DeleteOfficialHolidayByID?ID=" + holyId, {
                        "Content-type": "application/json",
                        "SessionId": session
                    }).then(function (data) {

                        if(typeof(data) != "object"){
                            holidaysObject = JSON.parse(data);
                        }

                        if (data.result) {
                            loadHolidays();
                            loadYearHolidays();
                            app.system.systemMessage("Успешно изтрит почивен ден", true);

                        } else {
                            app.system.systemMessage("Неуспешно изтрит почивен ден", true);
                        }


                    });
                });
            });
        }

        function loadHolidays() {


            app.connect.get("Holiday/GetAllHolidaysForPeriod?DateFrom=2016-1-1&DateTo=2016-12-30", {
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

                let dataObject = (data.responseJSON);

                app.system.systemMessage(dataObject.error);

            }).then(function (data) {

                let today = new Date();
                let y = today.getFullYear();
                let m = today.getMonth();

                let date;
                let dateArray = [];
                let holidayDates = data;

                if(typeof(data) != "object"){
                    holidayDates = JSON.parse(data);
                }

                for (var i in holidayDates.result) {

                    let tempDate = moment(holidayDates.result[i]);
                    let date = tempDate.format("L");
                    dateArray.push(date);
                }

                $('#full-year').multiDatesPicker({
                    onSelect: function (date) {


                        let currentDate = moment(date);


                        app.connect.get('Holiday/GetHolidayByDate?Date=' + currentDate.format('YYYY-MM-DD'), {
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

                            let dataObject = (data.responseJSON);

                            app.system.systemMessage(dataObject.error);

                        }).then(function (data) {


                            if(typeof (data) != 'object'){
                                data = JSON.parse(data);
                            }


                            $('#previewDate').text('');

                            $('#previewType').text('');

                            $('#previewMessage').text('');

                            if (data.result && data.result != null) {


                                let outputDate = moment(data.result.Date);
                                let type = 'Работен';

                                if (type == false) {

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
                    numberOfMonths: [1, 3],
                    defaultDate: m + '/1/' + y
                });

            });
        }

        loadHolidays();
        loadYearHolidays();


        $(document).ready(function () {

            $('td').hover(function (data) {


                console.log(data)
            })
        })
    }

    function officialLeaveReport() {

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

                let dataObject = (data.responseJSON);

                app.system.systemMessage(dataObject.error);

            }).then(function (data) {

                tableSource = "";
                let offleaveObject = data;

                if (typeof(data) != "object") {
                    offleaveObject = JSON.parse(data)
                }

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
                        "<td>" + leaveElement.FullName + "</td>" +
                        "<td>" + fromDay + " " + fromMoth + " - " + toDay + " " + toMoth + "</td>" +
                        "<td>" + leaveElement.WorkingDays + "</td>" +
                        "<td>" + leaveElement.SubstitutedBy + "</td>" +
                        "</tr>";
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

        for (var i = currentYear - 3; i <= currentYear; i++) {

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

            app.connect.get("Request/GetRequestsForPeriod?DateFrom=" + year + "-" + month + "-1&DateTo=" + year + "-" + month + "-" + lastDate.getDate() + "&UserID=-1",
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

                let dataObject = (data.responseJSON);

                app.system.systemMessage(dataObject.error);

            }).then(function (data) {

                tableSource = "";
                let offleaveObject = data;

                if (typeof(data) != 'object') {
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

                        plAppr = "Одобрена";
                    }
                    if (leaveElement.isApproved == null) {

                        status = "Чакаща";
                    } else if (leaveElement.isApproved == true) {

                        status = "Одобрена";
                    }


                    let tempStr = "<tr>" +
                        "<td>" + leaveElement.User.FullName + "</td>" +
                        "<td>" + requestDate.getDate() + "." + (requestDate.getMonth() + 1) + "." + requestDate.getFullYear() + " " + requestDate.getHours() + ":" + ('0' + requestDate.getMinutes()).slice(-2) + "</td>" +
                        "<td>" + dateFrom + "</td>" +
                        "<td>" + dateTo + "</td>" +
                        "<td>" + days + " / " + hours + " / " + minutes + "</td>" +
                        "<td>" + plAppr + "</td>" +
                        "<td>" + mtAppr + "</td>" +
                        "<td>" + status + "</td>" +
                        "</tr>";
                    tableSource += tempStr;
                }

                $("#requestReportTableBody").html(tableSource);
            });
        }
    }

    function boardroom() {

        let session = app.connect.cookie.get('session');
        let userId = app.connect.cookie.get('userID');
        var selectedDay;
        let selectedElement;
        //$('#calendar').attr('oncontextmenu','return false;');

        $('#fromDate').datetimepicker({
            dateFormat: 'yy-mm-dd',
            timeFormat: 'HH:mm',
            time: 'Време',
            hourText: 'Час',
            minuteText: 'Минути',
            secondText: 'Секуни',
            currentText: 'В момента',
            closeText: 'Затвори'

        });

        $('#toDate').datetimepicker({
            dateFormat: 'yy-mm-dd',
            timeFormat: 'HH:mm',
            timeOnlyTitle: 'Изберете време',
            timeText: 'Време',
            hourText: 'Час',
            minuteText: 'Минути',
            secondText: 'Секуни',
            currentText: 'В момента',
            closeText: 'Затвори'
        });

        $('#fromDate').on('change', function () {

            let date = moment($('#fromDate').val()).add(1, 'hour');
            let pickersDate = new Date(date);
            $("#toDate").datepicker('setDate', pickersDate);
        });

        $('.modal-footer').on('click', '#deleteSystemMessage', function () {
            deleteMeeting();
        });


        $('body').on('click', function () {
            $('#meetingRightClickMenu').remove();
        });


        $('#addEvent').on('click', '#addMeeting', function () {

            let description = $('#description').val();
            let tempDateTime = $('#fromDate').val().split(" ");
            let fromDate = $('#fromDate').val();
            let toDate = $('#toDate').val();
            let meetingTitle = $('#meetingTitle').val();

            if (tempDateTime.length != 2 || tempDateTime[1] == "00:00" || toDate == '') {

                app.system.systemMessage("Моля въведете час и продължителност преди да добавите заседание");
            } else if (meetingTitle == '') {
                app.system.systemMessage("Моля въведете заглавие на заседанието преди да добавите заседание");

            } else {

                let tempDate = tempDateTime[0];
                let tempTime = tempDateTime[1];
                let outputDate = tempDate + "T" + tempTime + ":00";
                let title = $('#meetingTitle').val();

                let dateCompareStart = moment(fromDate);
                let dateCompareEnd = moment(toDate);

                var duration = moment.duration(dateCompareEnd.diff(dateCompareStart));


                if(duration > 0){
                    let meetObject = {
                        "UserID": userId,
                        "Title": title,
                        "Start": outputDate,
                        "Duration": duration.asMinutes(),
                        "Constraint": description
                    };

                    app.connect.post('Meeting/AddMeeting', {
                        'Content-type': 'application/json',
                        'SessionId': session
                    }, meetObject).error(function (data) {

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

                        if(typeof(data) != 'object'){

                            data = JSON.parse(data);
                        }

                        if (data.result) {

                            app.system.systemMessage("Успешно добавено заседание", true);
                            getMeetings();

                        } else {
                            app.system.systemMessage("Неупешно добавено заседание");
                        }

                        $('#meetingTitle').val('');
                        $('#description').val('');
                        $('#fromDate').val('');
                        $('#fromTime').val('');
                    });

                }else{

                    app.system.systemMessage("Невалидно времетраене на заседание!");
                }


            }
        });


        function getMeetings() {

            let currentYear = new Date();

            app.connect.get('Meeting/GetMeetingsForPeriod?DateFrom='+ currentYear.getFullYear()+'-01-01&DateTo='+ currentYear.getFullYear()+'-12-30', {
                'Content-type': 'application/json',
                'SessionId': session
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
                    app.system.systemMessage("Сървърна грешка!")
                }
            }).then(function (data) {

                let meetendsArray = data;

                if(typeof(data) != "object"){

                    meetendsArray = JSON.parse(data);
                }

                console.log(meetendsArray);

                $(document).ready(function () {

                    let currentLangCode = 'bg';

                    $('#calendar').fullCalendar({
                        header: {
                            left: 'prev,next today',
                            center: 'title',
                            right: 'month,agendaWeek,agendaDay',
                        },
                        defaultView: 'month',
                        defaultDate: new Date(),
                        lang: currentLangCode,
                        height: 640,
                        buttonIcons: false, // show the prev/next text
                        weekNumbers: false,
                        editable: true,
                        eventLimit: true, // allow "more" link when too many events
                        selectable: true,
                        dayRightclick: function (date, jsEvent, view, aasd) {

                            $('#addMeetingRightClickMenu').remove();
                            $('#meetingRightClickMenu').remove();

                            if (view.isSelected) {

                                let tempDate = date._d + '';
                                tempDate = tempDate.replace(/( GMT).*/, '');
                                let tempDate2 = selectedDay._d + '';
                                tempDate2 = tempDate2.replace(/( GMT).*/, '');
                                let currentDate = new Date(tempDate);
                                let currentDate2 = new Date(tempDate2);
                                let elementDate = $(selectedElement).attr('data-date');
                                let clickedDateForCompare = currentDate.getFullYear() + "-" + ('0' + (currentDate.getMonth() + 1)).slice(-2) + "-" + ('0' + (currentDate.getDate())).slice(-2);
                                let clickedDateForCompare2 = currentDate2.getFullYear() + "-" + ('0' + (currentDate2.getMonth() + 1)).slice(-2) + "-" + ('0' + (currentDate2.getDate())).slice(-2);

                                if (clickedDateForCompare == clickedDateForCompare2) {

                                    let element = '<div id="addMeetingRightClickMenu"><input type="hidden" id="meetId" value="' + event.id + '"><p><a href="#">Ново заседание</a></p></div>';
                                    $('#boardroomSchedule').append(element);
                                    $('#addMeetingRightClickMenu').css({
                                        position: 'fixed',
                                        'top': jsEvent.clientY,
                                        'left': jsEvent.clientX
                                    });

                                    $('#addMeetingRightClickMenu>p').on('click', function () {


                                        app.system.addEvent();
                                    });
                                } else {
                                    selectedDay = date;
                                    let tempDate = date._d + '';
                                    tempDate = tempDate.replace(/( GMT).*/, '');
                                    let currentDate = new Date(tempDate);
                                    let currentSelectionDate = currentDate.getFullYear() + "-" + ('0' + (currentDate.getMonth() + 1)).slice(-2) + "-" + ('0' + (currentDate.getDate())).slice(-2);
                                    $('#fromDate').val(currentSelectionDate + " 00:00");

                                    let element = '<div id="addMeetingRightClickMenu"><input type="hidden" id="meetId" value="' + event.id + '"><p><a href="#">Ново заседание</a></p></div>';
                                    $('#boardroomSchedule').append(element);
                                    $('#addMeetingRightClickMenu').css({
                                        position: 'fixed',
                                        'top': jsEvent.clientY,
                                        'left': jsEvent.clientX
                                    });

                                    $('#calendar').fullCalendar('select', currentSelectionDate, currentSelectionDate, true);

                                    $('#addMeetingRightClickMenu>p').on('click', function () {


                                        app.system.addEvent();
                                    });

                                }
                            } else {

                                selectedDay = date;
                                let tempDate = date._d + '';
                                tempDate = tempDate.replace(/( GMT).*/, '');
                                let currentDate = new Date(tempDate);
                                let currentSelectionDate = currentDate.getFullYear() + "-" + ('0' + (currentDate.getMonth() + 1)).slice(-2) + "-" + ('0' + (currentDate.getDate())).slice(-2);
                                $('#fromDate').val(currentSelectionDate + " 00:00");

                                let element = '<div id="addMeetingRightClickMenu"><input type="hidden" id="meetId" value="' + event.id + '"><p><a href="#">Ново заседание</a></p></div>';
                                $('#boardroomSchedule').append(element);
                                $('#addMeetingRightClickMenu').css({
                                    position: 'fixed',
                                    'top': jsEvent.clientY,
                                    'left': jsEvent.clientX
                                });

                                $('#addMeetingRightClickMenu>p').on('click', function () {


                                    app.system.addEvent();
                                });

                                $('#calendar').fullCalendar('select', currentSelectionDate, currentSelectionDate, true);


                            }
                            return false;
                        },
                        eventAfterAllRender: function (data) {

                            $('.fc-more').on('click', function () {

                                $('.fc-body.fc-widget-content div a').css({

                                    "position": "relative",
                                    "display": "block",
                                    "font-size": "1.2em",
                                    "line-height": "1.6",
                                    "border-radius": "3px",
                                    "border": "1px solid #3a87ad",
                                    "background-color": "#3a87ad",
                                    "font-weight": "normal"
                                });

                            });
                        },
                        dayClick: function (date, allDay, jsEvent, view) {


                            $('#addMeetingRightClickMenu').remove();
                            $('#meetingRightClickMenu').remove();

                            if (!$('#meetingRightClickMenu').length) {

                                selectedDay = date;

                                let currentDate = new Date(date._d);
                                let year = currentDate.getFullYear();
                                let month = ("0" + (currentDate.getMonth() + 1)).slice(-2)
                                let day = ("0" + currentDate.getDate() ).slice(-2);
                                let fullDate = year + "-" + month + "-" + day + " 00:00";

                                $('#fromDate').val(fullDate);
                                $('#toDate').val(fullDate);

                            } else {
                                $('#addMeetingRightClickMenu').remove();
                                $('#meetingRightClickMenu').remove();
                            }
                        },
                        eventClick: function (event, jsEvent, view) {

                            let date = moment(event.start._i.split('T')[0] + " " + event.start._i.split('T')[1]);

                            console.log(event);
                            let dateTo = moment(event.end._i.split('T')[0] + " " + event.end._i.split('T')[1]);
                            let duration = moment.duration(dateTo.diff(date));
                            let hours = duration.asHours();
                            let minutes = (duration.asMinutes() - hours * 60);

                            app.system.systemMessage('<input type="hidden" id="meetId" value="' + event.id + '"><p>Дата: ' + date.format('DD-MM-Y') + '</p><p>Час: ' + date.format('HH:mm') + '</p><p>Времетраене: ' + hours + " часа " + minutes + ' минути</p><p>Регистрирано от: ' + event.FullName + '</p><p>Заглавие: ' + event.title + ' </p><p>Описание: ' + event.constraint + '</p>', false, true, 'Детайли на заседание', true, false)
                        },
                        eventRender: function (event, element, view) {

                            element.attr('name', 'event');
                            element.bind('mousedown', function (e) {

                                $(e.currentTarget).attr('oncontextmenu', 'return false;');

                                $('#addMeetingRightClickMenu').remove();
                                $('#meetingRightClickMenu').remove();
                                if (e.button == 2) {

                                    let element = '<div id="meetingRightClickMenu"><input type="hidden" id="meetId" value="' + event.id + '"><p><a href="#">Изтрий</a></p></div>';
                                    $('#boardroomSchedule').append(element);
                                    $('#meetingRightClickMenu').css({
                                        position: 'fixed',
                                        'top': e.clientY,
                                        'left': e.clientX
                                    });

                                    $('#meetingRightClickMenu>p').on('click', function () {
                                        deleteMeeting();
                                    });

                                }
                            });
                        },
                        events: meetendsArray.result
                    });

                    $('#monthName').text('- ' + $('.fc-center>h2').text());

                    $('.fc-day').click(function () {
                        selectedElement = this;


                    });

                    $('.fc-day-number').click(function () {

                        selectedElement = this;
                    });

                    $('.fc-agendaDay-button').click(function () {

                        $('#addMeetingRightClickMenu').remove();
                        $('#meetingRightClickMenu').remove();

                        $('#calendar').fullCalendar('gotoDate', selectedDay);
                        $('#calendar').fullCalendar('changeView', 'agendaDay');

                        setTimeout(function () {


                            let dayDate = $('.fc-day-header').attr('data-date');
                            let day = $('.fc-day-header').text();
                            $('.fc-day-header').text(day + " - " + dayDate);

                            location.href = '#event';
                        }, 50);
                    });

                    $('.fc-agendaWeek-button').click(function () {

                        $('#addMeetingRightClickMenu').remove();
                        $('#meetingRightClickMenu').remove();

                        $('#calendar').fullCalendar('gotoDate', selectedDay);
                        $('#calendar').fullCalendar('changeView', 'agendaWeek');
                        setTimeout(function () {


                            location.href = '#event';
                        }, 50);
                    });

                    $('.fc-month-button ').click(function () {


                    });

                    $('.fc-prev-button').click(function () {
                        $('#monthName').text('- ' + $('.fc-center>h2').text());
                    });

                    $('.fc-next-button').click(function () {
                        $('#monthName').text('- ' + $('.fc-center>h2').text());
                    });


                    $('#descriptionView').css({
                        'display': 'none',
                        'position': 'fixed',
                        'border-radius': '3px',
                        'z-index': '3000',
                        'border': '1px solid black',
                        'border-radius': '3px',
                        'margin': '0px',
                        'padding': '10px',
                        'top': 0,
                        'left': 0,
                        'bottom': 0,
                        'right': 0
                    })
                    ;

                });
            });


        }

        function deleteMeeting() {

            let meetId = $('#meetId').val();

            app.connect.delete('Meeting/DeleteMeeting?Id=' + meetId, {
                'Content-type': 'application/json',
                'SessionId': session
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

                let jsonObjet = data;

                if(typeof(data) != 'object'){
                    jsonObjet = JSON.parse(data);
                }

                if (jsonObjet.result) {
                    $('#calendar').html('');

                    setTimeout(function () {

                        app.system.systemMessage("Успешно изтрито заседание", true);

                    }, 500);
                } else {
                    app.system.systemMessage("Неуспешно изтрито заседание", true);


                }
            });
        }

        function objectSelector(that) {

        }

        getMeetings();


    }

    return {
        editRemainingLeave: editRemainingLeave,
        usersList: usersList,
        officialHolidays: officialHolidays,
        officialLeaveReport: officialLeaveReport,
        requestReport: requestReport,
        boardroom: boardroom
    }


})();