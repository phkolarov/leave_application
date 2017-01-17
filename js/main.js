var app = app || {};

app.run = (function () {

    String.prototype.capitalizeFirstLetter = function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
    };

    function loadController() {

        let params = urlParser();
        let controllerPath = "/leave_application/js/controllers/" + params.controllerName + ".js";
        let systemFuncPath = "/leave_application/js/extendedSystemFunctions/systemFunctions.js";
        //let moment = "/leave_application/libraries/moment/moment.js";
        let action = params.action;
        let controllerfileref = document.createElement('script');
        let systemfileref = document.createElement('script');
        //let momentfileref = document.createElement('script');

        controllerfileref.setAttribute("type", "text/javascript");
        controllerfileref.setAttribute("src", controllerPath);
        systemfileref.setAttribute("type", "text/javascript");
        systemfileref.setAttribute("src", systemFuncPath);
        //momentfileref.setAttribute("type", "text/javascript");
        //momentfileref.setAttribute("src", moment);

        asynchronizer();

        if (typeof controllerfileref != "undefined") {
            $(document.getElementsByTagName("head")[0]).append(controllerfileref);
        }
        if (typeof systemfileref != "undefined") {
            $(document.getElementsByTagName("head")[0]).append(systemfileref);
        }
        //if (typeof momentfileref != "undefined") {
        //    $(document.getElementsByTagName("head")[0]).append(momentfileref);
        //}

        $(document).ready(function () {

            setTimeout(function () {

                var counter = 0;

                function objectGetter() {

                    if (typeof(appCh) === 'undefined') {

                        counter++;

                        if (counter < 10000) {

                            setTimeout(function () {
                                objectGetter();
                            }, 1000);
                        } else {
                            console.log("ERROR: Can't load file controller: " + params.controllerName);
                            return;
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
                            console.log("ERROR: Controller does not implemented");
                        }
                    }
                }

                objectGetter();
            }, 0);
        })
    }

    function urlParser() {

        var fullLocation = window.location.pathname.replace("/leave_application/", "");
        var params = fullLocation.split("/");
        var controller = params[0];
        var action = "index";

        if(params[0] == ""){
            controller = "Home";
            action = "index";
        }
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

