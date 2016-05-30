var appCh = appCh || {};

appCh.HomeController = (function () {



    function index(){

        app.connect.get("http://192.168.4.96/VacationsWebAPI/api/User/GetUserByID?ID=3",{SessionId : "7ccd29d5-b1f2-4b12-b322-787912d58c1b"});


        console.log("HOME")
    }

    function home(){

        console.log("HOME2")

    }
    return {
        index: index,
        home: home
    }

})();