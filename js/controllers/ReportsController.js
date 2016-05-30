var appCh = appCh || {};

appCh.ReportsController = (function () {



    function index(){

        console.log("report");

    }

    function myOfficialVacations(){
        console.log("myOfficialVacations")
    }
    function officialHolidays(){


        console.log("officialHolidays")

    }

    return {
        myOfficialVacations: myOfficialVacations,
        officialHolidays: officialHolidays
    }

})();