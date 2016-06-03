var appCh = appCh || {};

appCh.AdministrationController = (function () {

    function editRemainingLeave() {

        console.log('editRemainingLeave');
    }

    function usersList() {

        let session = app.connect.cookie.get("session");
        $("#usersFilter").on('change', function () {
            if ($("#usersFilter").val() == 1) {

                loadUsersList()
            } else if ($("#usersFilter").val() == 2) {

                loadUsersList(true)
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

            if(username && names && email && password){

                var userObject = {
                    UserName : username,
                    FullName : names,
                    Email : email,
                    VacationMinutes: 0,
                    OfficialVacationDays: 0,
                    Role: role,
                    isActive: isActive,
                    Password: password

                };

                app.connect.post("User/AddUser",{
                    "Content-type": "application/json",
                    "SessionId": session
                },  userObject).then(function (data) {


                    console.log(data);
                })



            }else {

                app.system.systemMessage("Mоля попълнете всички данни");
            }

        });


        function loadUsersList(param) {


            let tableString = "";
            let session = app.connect.cookie.get("session");

            let uri = "User/GetAllUsers";

            if (param == true || param == false) {

                console.log(param);
                uri += ("?active=" + param);
            }


            app.connect.get(uri, {
                "Content-type": "application/json",
                "SessionId": session
            }).then(function (data) {

                usersListObject = JSON.parse(data);

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
                        "<td><a>Изтрий</a></td>" +
                        "</tr>"

                    tableString += rowString;
                }


                $("#usersListTableBody").html(tableString);
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


        loadUsersList();

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
                }, holyProject).then(function () {

                    loadHolidays();
                    loadYearHolidays();
                    $("#datepicker").datepicker().val("");
                    $("#isWorked").val("");
                    $("#description").val("");
                    app.system.systemMessage("Успешно добавен почивен ден");
                });

            }
        });

        function loadYearHolidays() {

            app.connect.get("Holiday/GetAllOfficialHolidaysForYear?year=2016", {
                "Content-type": "application/json",
                "SessionId": session
            }).then(function (data) {

                let holidaysTableString = "";
                let holidaysObject = JSON.parse(data);

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
                    }).then(function () {

                        loadHolidays();
                        loadYearHolidays();
                        app.system.systemMessage("Успешно изтрит почивен ден", true);

                    });

                    console.log($(this)[0].id);

                });
            });
        }

        function loadHolidays() {


            app.connect.get("Holiday/GetAllHolidaysForPeriod?DateFrom=2016-1-1&DateTo=2016-12-30", {
                "Content-type": "application/json",
                "SessionId": session
            }).then(function (data) {

                let today = new Date();
                let y = today.getFullYear();
                let m = today.getMonth();
                let date;
                let dateArray = [];
                let holidayDates = JSON.parse(data);

                for (var i in holidayDates.result) {

                    tempDate = moment(holidayDates.result[i]);
                    let date = tempDate.format("L");
                    dateArray.push(date);
                }

                $('#full-year').multiDatesPicker({
                    addDates: dateArray,
                    dateFormat: "m/d/yy",
                    numberOfMonths: [1, 3],
                    defaultDate: m + '/1/' + y
                });
            });
        }

        loadHolidays();
        loadYearHolidays();
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

            let year = 2013; //$("#year").val();
            let month = 11;//$("#month").val();
            let lastDate = new Date(year, month, 0);

            app.connect.get("Request/GetRequestsForPeriod?DateFrom=" + year + "-" + month + "-1&DateTo=" + year + "-" + month + "-" + lastDate.getDate() + "&UserID=-1",
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

    return {
        editRemainingLeave: editRemainingLeave,
        usersList: usersList,
        officialHolidays: officialHolidays,
        officialLeaveReport: officialLeaveReport,
        requestReport: requestReport
    }


})();