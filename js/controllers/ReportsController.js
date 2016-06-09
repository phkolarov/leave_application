var appCh = appCh || {};

appCh.ReportsController = (function () {



    function index(){

        console.log("report");

    }

    function myOfficialVacations(){

        $(".year").empty()
            .append("<option>" + (new Date().getFullYear() - 3) + "</option>")
            .append("<option>" + (new Date().getFullYear() - 2) + "</option>")
            .append("<option>" + (new Date().getFullYear() - 1) + "</option>")
            .append("<option>" + new Date().getFullYear() + "</option>")
            .append("<option selected='selected'>Година</option>");

        $("#showYear").change(function () {
            if ($("#showYear").val() != "Изберете година") {
                var id = app.connect.cookie.get("userID");
                var session = app.connect.cookie.get("session");
                var selectedYear = $("#showYear").val();
                app.connect.get("OfficialVacation/GetAllOfficialVacationsForPeriod?DateFrom=" + selectedYear + "-01-01&DateTo=" + selectedYear + "-12-31", {
                    "Content-type": "application/json",
                    "SessionId": session
                }).then(function (data) {
                    var obj = JSON.parse(data);
                    obj = obj.result;
                    //console.log(obj);
                    $("#tableData").empty();


                    obj.forEach(function (el) {


                        var dateFrom = el.DateFrom.split('T')[0];
                        console.log(dateFrom)
                        var dateTo = el.DateTo.split('T')[0];
                        console.log(dateTo);
                        var holidays = 0;
                        app.connect.get("Holiday/GetAllHolidaysForPeriod?DateFrom=" + dateFrom + "&DateTo=" + dateTo, {
                            "Content-type": "application/json",
                            "SessionId": session
                        }).then(function (data) {
                                var data = JSON.parse(data);
                                holidays = data.result.length;
                                console.log(data.result);
                                var workingDays = 1 + moment(dateTo).diff(moment(dateFrom), "days") - holidays; // Тук формулата е 1 + ....., защото при подаване на отпуска не включва и двата гранични дни (от дата до дата)
                                console.log(workingDays);
                                var debuty = el.SubstitutedBy.FullName;
                                $("#tableData").append(
                                    "<tr>" +
                                    "<td>" + dateFrom + " <strong>до </strong>" + dateTo + "</td>" +
                                    "<td>" + workingDays + "</td>" +
                                    "<td>" + debuty + "</td>" +
                                    "</tr>"
                                )

                            }
                        )

                    })
                })
            } else {
                $("#tableData").empty();
            }
        })

    }
    function officialHolidays(){

        let session = app.connect.cookie.get("session");

        function loadHolidays() {

            app.connect.get("Holiday/GetAllOfficialHolidaysForYear?year=2016", {
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