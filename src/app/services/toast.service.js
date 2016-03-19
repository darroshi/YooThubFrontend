(function() {
    'use strict';

    angular
        .module('yoothub')
        .factory('ToastService', ToastService);

    ToastService.$inject = ['toastr'];
    function ToastService(toastr) {
        var service = {
            success: success,
            error: error
        };

        return service;

        ////////////////
        function success(content) {
            toastr.success(content);
        }

        function error(content) {
            toastr.error(content);
        }
    }
})();
