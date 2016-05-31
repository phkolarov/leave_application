app = app || {};

app.system = (function () {


    function systemMessage(message, reload){

        $("#systemMessage").text(message);
        $("#myModal").modal('show');

        if(reload == true){
            $('#closeSystemMessage').on('click', function () {

                window.location.reload();
            });
        }
    }

    return {
        systemMessage:systemMessage
    }

})();