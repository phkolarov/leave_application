var appCh = appCh || {};

appCh.HomeController = (function () {



    function index(){

       // app.connect.get("http://192.168.4.96/VacationsWebAPI/api/User/GetUserByID?ID=3",{SessionId : "7ccd29d5-b1f2-4b12-b322-787912d58c1b"});

        var stack_bar_bottom = {"dir1": "up", "dir2": "left", "push": "bottom", "spacing1": 25, "spacing2": 25, "context": $("body"), "modal": false}

        function show_stack_bar_bottom(type) {
            var opts = {
                title: "Over Here",
                text: "Check me out. I'm in a different stack.",
                cornerclass: "",
                width: "70%",
                stack: stack_bar_bottom,
                delay: 100000,
                addclass: "stack-bottomright",
        };
            switch (type) {
                case 'deniedOff':
                    opts.title = "Системно съобщение";
                    opts.text = "Нова отхвърлена официална отпуска";
                    opts.type = "error";
                    break;
                case 'deniedUnoff':
                    opts.title = "Системно съобщение";
                    opts.text = "Нова отхвърлена неофициална отпуска";
                    opts.type = "error";
                    break;
                case 'info':
                    opts.title = "Breaking News";
                    opts.text = message;
                    opts.type = "info";
                    break;
                case 'approvedOff':
                    opts.title = "Системно съобщение";
                    opts.text = "Нова одобрена официална отпуска";
                    opts.type = "success";
                    break;
                case 'approvedUnoff':
                    opts.title = "Системно съобщение";
                    opts.text = "Нова одобрена неофициална отпуска";
                    opts.type = "success";
                    break;
            }
            new PNotify(opts);
        }

        show_stack_bar_bottom('approvedOff');
    }

    function home(){

        console.log("HOME2")

    }
    return {
        index: index,
        home: home
    }

})();