app = app || {};

app.system = (function () {


    var stack_bar_bottom = {
        "dir1": "up",
        "dir2": "left",
        "push": "bottom",
        "spacing1": 25,
        "spacing2": 25,
        "context": $("body"),
        "modal": false
    };
    function show_stack_bar_bottom(type) {
        var opts = {
            title: "Over Here",
            text: "Check me out. I'm in a different stack.",
            cornerclass: "",
            width: "70%",
            stack: stack_bar_bottom,
            delay: 1000000,
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
        let notice = new PNotify(opts);
        notice.get().click(function () {
            notice.remove();
        });
    }


    function systemMessage(message, reload, title, titleMessage, deleteButton, enableSound) {

        $('#deleteSystemMessage').remove();
        $('#addMeetingRightClickMenu').remove();
        $("#systemMessage").html(message);
        $("#myModal").modal('show');

        if (reload == true) {
            $('#closeSystemMessage').on('click', function () {

                window.location.reload();
            });
        }

        if (title == true) {

            $('.modal-title').html(titleMessage);
        }
        if (deleteButton == true) {

            $('#deleteSystemMessage').remove();
            $('.modal-footer.infoModal').prepend('<button id="deleteSystemMessage" type="button" class="btn btn-warning" data-dismiss="modal">Изтрий</button>');
        }
        if (enableSound == true) {

            let audio = new Audio('/leave_application/css/audio/popup2.wav');
            audio.play();
        }
    }

    function addEvent(reload, title, titleMessage) {

        $('#deleteSystemMessage').remove();
        $('#addMeetingRightClickMenu').remove();
        $("#addEvent").modal('show');

        if (reload == true) {
            $('#closeSystemMessage').on('click', function () {

                window.location.reload();
            });
        }

        if (title == true) {

            $('.modal-title').html(titleMessage);
        }

    }

    function notificationSeeker() {

        let session = app.connect.cookie.get('session');
        let userId = app.connect.cookie.get('userID');

        jQuery.ajax({
            url: 'http://external.euroins.bg/VacationsWebApi/api/Message/GetMessage?UserID=' + userId,
            headers: {
                "Content-type": "application/json",
                "SessionId": session,
            },
            success: function (result) {

                show_stack_bar_bottom('approvedOff');
                notificationSeeker();
            },
            timeout: 10000
        }).then(function () {

            console.log(12121);
        });

    }


    return {
        systemMessage: systemMessage,
        notificationSeeker: notificationSeeker,
        addEvent: addEvent
    }

})();