var appCh = appCh || {};

appCh.LeaveApplicationController = (function () {

    function index(){

        console.log("index");
    }

    function addOfficialLeaveApplication(){


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