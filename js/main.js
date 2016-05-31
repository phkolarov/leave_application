var app = app || {};

app.run = (function () {

    String.prototype.capitalizeFirstLetter = function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
    };

    function loadController() {

        var params = urlParser();
        var controllerPath = "/leave_application/js/controllers/" + params.controllerName + ".js";
        var systemFuncPath = "/leave_application/js/extendedSystemFunctions/systemFunctions.js";
        var action = params.action;
        var controllerfileref = document.createElement('script');
        var systemfileref = document.createElement('script');

        controllerfileref.setAttribute("type", "text/javascript");
        controllerfileref.setAttribute("src", controllerPath);
        systemfileref.setAttribute("type", "text/javascript");
        systemfileref.setAttribute("src", systemFuncPath);

        asynchronizer();

        if (typeof controllerfileref != "undefined") {
            $(document.getElementsByTagName("head")[0]).append(controllerfileref);
        }
        if (typeof systemfileref != "undefined") {
            $(document.getElementsByTagName("head")[0]).append(systemfileref);
        }

        setTimeout(function () {
            var counter = 0;

            function objectGetter() {
                if (typeof appCh == undefined || !appCh) {

                    counter++;

                    if (counter < 1000) {

                        objectGetter();
                    } else {
                        console.log("ERROR: Can't load file controller");
                    }

                } else {
                    if (appCh[params.controllerName]) {

                        if (appCh[params.controllerName][action]) {

                            appCh[params.controllerName][action]();

                            return;
                        } else {
                            console.log("ERROR: Action idoess not implemented")
                        }
                    } else {
                        console.log(appCh);
                        console.log("ERROR: Controller does not implemented");
                    }
                }
            }

            objectGetter();
        }, 0);
    }

    function urlParser() {

        var fullLocation = window.location.pathname.replace("/leave_application/", "");
        var params = fullLocation.split("/");
        var controller = params[0];
        var action = "index";

        if (params.length > 1) {
            action = params[1];
        }

        return {
            controllerName: ( controller + "Controller").capitalizeFirstLetter(),
            action: action
        }
    }

    function asynchronizer(inputParam) {

        var checker = true;
        if (inputParam == false) {
            checker = false;
        }
        $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
            options.async = checker;
        });
    }

    loadController();

})();

