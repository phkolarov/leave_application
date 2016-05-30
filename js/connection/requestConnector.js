var app = app || {};


app.connect = (function () {

    var baseServiceURL = "http://192.168.4.96/VacationsWebAPI/api/";

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
            async: false,
            url: baseServiceURL + url,
            method: method,
            headers: headers,
            data: data
        }).done(function () {
             
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

    return {
        get: _get,
        put: _put,
        post: _post,
        delete: _delete,
        cookie: {
            get: getCookie,
            set: setCookie
        }
    }
})();