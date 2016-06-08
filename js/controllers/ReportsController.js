var appCh = appCh || {};

appCh.ReportsController = (function () {



    function index(){

        console.log("report");

    }

    function myOfficialVacations(){
        console.log("myOfficialVacations")
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