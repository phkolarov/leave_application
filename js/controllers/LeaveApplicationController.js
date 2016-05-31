var appCh = appCh || {};

appCh.LeaveApplicationController = (function () {

    function index(){

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



    function addUnofficialLeaveApplication(){


        console.log("addUnofficialLeaveApplication");
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