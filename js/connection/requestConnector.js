var app = app || {};


app.connect = (function () {

    //var baseServiceURL = "http://external.euroins.bg/VacationsWebAPI/api/";
    var baseServiceURL = "http://192.168.4.124:1234/back/";

    function _get(url, headers) {

        return connector(url, "GET", headers, null);
    }

    function _put(url, headers, data) {

        return connector(url, "PUT", headers, data);
    }

    function _post(url, headers, data) {

        return connector(url, "POST", headers, data);
    }

    function _delete(url, headers) {

        return connector(url, "DELETE", headers, null);
    }

    function connector(url, method, headers, data) {

        return $.ajax({
            url:( baseServiceURL + url),
            method: method,
            headers: headers,
            data: JSON.stringify(data),
            beforeSend: function () {

                $('#pending').css({
                    'z-index': 10,
                    'display': 'block',
                    'background-color': 'rgba(39, 39, 39, 0.29)'
                });
            },
            complete: function (data) {

                $('#pending').css({
                    'z-index': -10,
                    'display': 'none',
                    'background-color': 'transparent'
                });
            }
        });
    }

    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    }

    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    function deleteCookie(name) {
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;"
    }

    function eraseCookieFromAllPaths(name) {
        // This function will attempt to remove a cookie from all paths.
        var pathBits = location.pathname.split('/');
        var pathCurrent = ' path=';

        // do a simple pathless delete first.
        document.cookie = name + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT;';

        for (var i = 0; i < pathBits.length; i++) {
            pathCurrent += ((pathCurrent.substr(-1) != '/') ? '/' : '') + pathBits[i];
            document.cookie = name + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT;' + pathCurrent + ';';
        }
    }

    return {
        get: _get,
        put: _put,
        post: _post,
        delete: _delete,
        cookie: {
            get: getCookie,
            set: setCookie,
            delete: deleteCookie,
            deleteAll: eraseCookieFromAllPaths
        }
    }
})();