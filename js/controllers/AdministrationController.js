var appCh = appCh || {};

appCh.AdministrationController = (function () {

    function editRemainingLeave() {

        console.log('editRemainingLeave');
    }

    function usersList() {
        console.log('usersList');

    }

    function officialHolidays() {

        console.log('officialHolidays');

    }

    function officialLeaveReport() {
        console.log('officialLeaveReport');

    }

    function requestReport() {

        console.log('requestReport');

    }

    return {
        editRemainingLeave: editRemainingLeave,
        usersList: usersList,
        officialHolidays: officialHolidays,
        officialLeaveReport: officialLeaveReport,
        requestReport: requestReport
    }


})();