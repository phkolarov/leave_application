var appCh = appCh || {};

appCh.LeaveApplicationController = (function () {

    function index(){

        console.log("index");
    }

    function addOfficialLeaveApplication() {
        console.log($.datepicker.formatDate('yy/mm/dd', new Date()));
        $(".year").empty()
            .append("<option>" + (new Date().getFullYear() - 3) + "</option>")
            .append("<option>" + (new Date().getFullYear() - 2) + "</option>")
            .append("<option>" + (new Date().getFullYear() - 1) + "</option>")
            .append("<option selected='selected'>" + new Date().getFullYear() + "</option>");
        $("#startDate, #endDate").datepicker();

        var date = new Date();
        function makeLeaveRequest(){

            let id = app.connect.cookie.get("userID");

            app.connect.post("VacationsWebAPI/api/Request/AddRequest", {
                "Content-type": "application/json",
                    "SessionId": session
            },{
              "DateFrom": $("#fromDate").val(),
                "Description":$("#desc").val(),
                "isApproved": "false",
                "isApprovedByMitko": "false",
                "isApprovedByPlamen": "false",
                "RequestDateTime": ""+$.datepicker.formatDate('yy-mm-dd', new Date())+"",
                "RequestedMinutes": $("#numberDays").val()*60+$("#numberHours").val()*60+$("#numberMinutes").val()+"",
                "Type": "Неофициална отпуска",
                "UserID": ""+id
                })
        }
        $("#submit").on("click",
            function(){makeLeaveRequest()});
    }



    function addUnofficialLeaveApplication(){
        $("#fromDate").datepicker();
        let session = app.connect.cookie.get("session");

        function loadHolidays() {


            app.connect.get("Holiday/GetAllHolidaysForPeriod?DateFrom="+new Date().getFullYear()+"-1-1&DateTo="+new Date().getFullYear()+"-12-30", {
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
                    addDates: dateArray,
                    dateFormat: "m/d/yy",
                    numberOfMonths: [1, 3],
                    defaultDate: m + '/1/' + y
                });
            });
        }
       // loadHolidays();
    }

    function pendingRequests(){

        console.log("pendingRequests");

    }

    return{
        addOfficialLeaveApplication: addOfficialLeaveApplication,
        addUnofficialLeaveApplication: addUnofficialLeaveApplication,
        pendingRequests: pendingRequests
    }

})();