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
                let dataObject = JSON.parse(data.responseJSON);

                app.system.systemMessage(dataObject.error);

            }).then(function (data) {

                usersListObject = JSON.parse(data);

                for (let i in usersListObject.result) {


                    let userElem = usersListObject.result[i];

                    let dayd = (parseInt((parseInt(userElem.VacationMinutes) / 60) / 8));
                    let hours = (parseInt((parseInt(userElem.VacationMinutes) / 60) % 8));
                    let tempMinutes = (((parseInt(userElem.VacationMinutes) / 60) % 8) + "").slice(+2);
                    let minutesLeft = parseInt(parseFloat("0." + tempMinutes) * 60);
                    let rowString = "<tr class='userListRow' userId='"+ userElem.ID +"' name='"+ userElem.FullName +"' username='"+ userElem.UserName+"' officialLeave='"+ userElem.OfficialVacationDays+"'>" +
                        "<td>" + userElem.FullName + "</td>" +
                        "<td>" + userElem.UserName + "</td>" +
                        "<td>" + dayd + " дни " + hours + " часа " + minutesLeft + " минути " + "</td>" +
                        "<td>" + userElem.OfficialVacationDays + " дни </td>" +
                        "</tr>";

                    tableString += rowString;

                }


                $('#usersListTableBody').html(tableString);

                $('.userListRow').on('click', function () {

                    $(".employee").val($(this).attr("name"));
                    $("#officialDays").val($(this).attr("officialLeave"));
                    $("#unEmployeeInput").attr("employeeId",$(this).attr("userId"));
                    $("#offEmployeeInput").attr("employeeId",$(this).attr("userId"));
                });

                $('#addUnofficial').on('click', function () {

                    let userId = $("#unEmployeeInput").attr("employeeId");
                    let description = $("#unOfficialDescription").val();
                    let days = (parseInt($("#unDays").val()) * 8) * 60;
                    let hours = (parseInt($("#unDays").val()) *  60);
                    let minutes = parseInt($("#unMinutes").val()) ;

                    let totalMinutes = 0;

                    if(!isNaN(days)){
                        totalMinutes += days;
                    }
                    if(!isNaN(hours)){
                        totalMinutes += hours;
                    }
                    if(!isNaN(minutes)){
                        totalMinutes += minutes;
                    }



                    if(!isNaN(userId)){

                        let unofficialObject =	{
                            "ChangedFrom": adminId,
                            "UserID" : userId,
                            "Minutes" : totalMinutes,
                            "Description": description
                        };

                        app.connect.post("User/EditMinutes",{
                            "Content-type": "application/json",
                            "SessionId" : session
                        }, unofficialObject).error(function (data) {

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

                            data = JSON.parse(data);

                            if(data.results){

                                app.system.systemMessage("Успешно добавена отпуска");
                                console.log(data);
                            }else {

                                app.system.systemMessage("Неуспешно добавена отпуска");
                                console.log(data);

                            }

                        })

                    }else {


                        app.system.systemMessage("Моля изберете служител");
                    }




                })

                $('#substrUnofficial').on('click', function () {
                    let adminId = app.connect.cookie.get("userID");
                    let userId = $("#unEmployeeInput").attr("employeeId");
                    let description = $("#unOfficialDescription").val();
                    let days = (parseInt($("#unDays").val()) * 8) * 60;
                    let hours = (parseInt($("#unDays").val()) *  60);
                    let minutes = parseInt($("#unMinutes").val()) ;

                    let totalMinutes = 0;

                    if(!isNaN(days)){
                        totalMinutes += days;
                    }
                    if(!isNaN(hours)){
                        totalMinutes += hours;
                    }
                    if(!isNaN(minutes)){
                        totalMinutes += minutes;
                    }

                    totalMinutes = (totalMinutes * -1);


                    if(!isNaN(userId)){

                        let unofficialObject =	{
                            "ChangedFrom": adminId,
                            "UserID" : userId,
                            "Minutes" : totalMinutes,
                            "Description": description
                        };

                        app.connect.post("User/EditMinutes",{
                            "Content-type": "application/json",
                            "SessionId" : session
                        }, unofficialObject).error(function (data) {

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


                            if(data.results){

                                app.system.systemMessage("Успешно отнета отпуска",true);
                            }else {

                                app.system.systemMessage("Неуспешно отнета отпуска");
                            }
                        })

                    }else {


                        app.system.systemMessage("Моля изберете служител");
                    }

                });

                $('#addOfficial').on('click', function () {


                    let employeeId = $('#offEmployeeInput').attr('employeeId');

                    if(!isNaN(employeeId)){


                        let days = 0;


                        if($("#officialDays").val()){

                            days += parseInt($("#officialDays").val());
                        }

                        let employeeObject ={
                            "ChangedFrom": adminId,
                            "UserID" : employeeId,
                            "Days" : days,
                            "Description": ""
                        };

                        app.connect.post("User/EditOfficialVacation", {
                            "Content-type" : "application/json",
                            "SessionId": session
                        }, employeeObject).error(function (data) {

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


                            if(data.result){

                                app.system.systemMessage("Успешно добавена официална отпуска",true);

                            }else{

                                app.system.systemMessage("Неуспешно добавена официална отпуска");
                            }
                        })

                    }else{


                        app.system.systemMessage("Моля изберете служител");
                    }




                })

                $('#substrOfficial').on('click', function () {


                    let employeeId = $('#offEmployeeInput').attr('employeeId');

                    if(!isNaN(employeeId)){


                        let days = 0;


                        if($("#officialDays").val()){

                            days += parseInt($("#officialDays").val());
                        }

                        days = (days * -1);

                        let employeeObject ={
                            "ChangedFrom": adminId,
                            "UserID" : employeeId,
                            "Days" : days,
                            "Description": ""
                        };

                        app.connect.post("User/EditOfficialVacation", {
                            "Content-type" : "application/json",
                            "SessionId": session
                        }, employeeObject).error(function (data) {

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

                            data = JSON.parse(data);
                            if(data.result){

                                app.system.systemMessage("Успешно отнета официална отпуска",true);

                            }else{

                                app.system.systemMessage("Неуспешно отнета официална отпуска");
                            }
                        })

                    }else{

                        app.system.systemMessage("Моля изберете служител");
                    }
                })

                $('tr').on('click', function () {


                    $('.table-hover > tbody > tr').css('background-color', 'transparent');
                    $('.table-hover > tbody > tr').css('color', 'black');

                    $(this).css('background-color','darkgrey')
                    $(this).css('color','white')
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
           if(uriParams){

               if(uriParams[1] == 'true'){
                   app.system.systemMessage("Успешно добавен потребител");
               }else{
                   app.system.systemMessage( decodeURIComponent(message[1]));
               }
           }
       }, 0);



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

                let dataObject = JSON.parse(data.responseJSON);

                app.system.systemMessage(dataObject.error);

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
                        "<td><a href='#' class='deleteUser' id='"+userElem.ID +"'>Изтрий</a></td>" +
                        "</tr>";

                    tableString += rowString;
                }


                $("#usersListTableBody").html(tableString);


                $(".deleteUser").on('click', function () {

                    app.connect.delete('User/DeactivateUser?ID='+ $(this)[0].id, {
                        "Content-type": "application/json",
                        "SessionId": session
                    }).then(function (data) {

                        if(data.result){

                            app.system.systemMessage("Успешно изтрит потребител");
                        }else {
                            app.system.systemMessage("Неуспешно изтрит потребител");
                        }

                        loadUsersList();
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
                }, holyProject).error(function (data) {

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

                    data = JSON.parse(data);

                    if(data.result){
                        loadHolidays();
                        loadYearHolidays();
                        $("#datepicker").datepicker().val("");
                        $("#isWorked").val("");
                        $("#description").val("");
                        app.system.systemMessage("Успешно добавен почивен ден");
                    }else{

                        app.system.systemMessage("Неуспешно добавен почивен ден",true);

                    }

                });

            }
        });

        function loadYearHolidays() {

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

                let dataObject = JSON.parse(data.responseJSON);

                app.system.systemMessage(dataObject.error);

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
                    }).then(function (data) {

                        data = JSON.parse(data);

                        if(data.result){
                            loadHolidays();
                            loadYearHolidays();
                            app.system.systemMessage("Успешно изтрит почивен ден", true);

                        }else{
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

                let dataObject = JSON.parse(data.responseJSON);

                app.system.systemMessage(dataObject.error);

            }).then(function (data) {

                let today = new Date();
                let y = today.getFullYear();
                let m = today.getMonth();

                let date;
                let dateArray = [];
                let holidayDates = JSON.parse(data);

                for (var i in holidayDates.result) {

                    let tempDate = moment(holidayDates.result[i]);
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

                            let dataObject = JSON.parse(data.responseJSON);

                            app.system.systemMessage(dataObject.error);

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

                let dataObject = JSON.parse(data.responseJSON);

                app.system.systemMessage(dataObject.error);

            }).then(function (data) {

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