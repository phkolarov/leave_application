var appCh = appCh || {};

appCh.LeaveApplicationController = (function () {

    function index(){

        console.log("index");
    }

    function addOfficialLeaveApplication(){

        $(".year").empty();
        $(".year").append("<option>"+(new Date().getFullYear()-3)+"</option>");
        $(".year").append("<option>"+(new Date().getFullYear()-2)+"</option>");
        $(".year").append("<option>"+(new Date().getFullYear()-1)+"</option>");
        $(".year").append("<option selected='selected'>"+ new Date().getFullYear()+"</option>");
        $("#startDate,#endDate").on('click', function () {
            console.log("datetimepicker here");
        });


        console.log("addOfficialLeaveApplication");
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