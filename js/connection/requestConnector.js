var app = app || {};


app.connect = (function () {


    function _get(url,headers){

        return  connector(url,"GET",headers,null);
    }

    function _put(url,headers,data){

        return  connector(url,"PUT",headers,data);
    }

    function _post(url,headers,data){

        return  connector(url,"POST",headers,data);
    }

    function _delete(url,headers){

        return  connector(url,"DELETE",headers,null);
    }

    function connector(url,method,headers,data){

       return $.ajax({
            url: url,
            method : method,
            headers: headers,
            data: data,
        }).done(function (data) {
            console.log(data)
        });

    }

    return {
        get: _get,
        put: _put,
        post: _post,
        delete: _delete
}
})();