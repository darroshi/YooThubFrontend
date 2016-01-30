(function () {
    'use strict';

    angular
        .module('yoothub')
        .factory('ToastService', ToastService);

    ToastService.$inject = ['toastr'];
    function ToastService(toastr) {
        var service = {
            success: success,
            error: error,
        };

        return service;

        ////////////////
        function success(content) {
            toastr["success"](content);
            //return show(content, 'success');


        }

        function error(content) {
            return show(content, 'error')
        }

        function show(content, type) {
            return toastr.pop({
                type: type,
                body: content,
                timeout: 2000,
            });
        }
    }
})();