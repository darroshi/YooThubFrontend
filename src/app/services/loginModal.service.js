(function () {
    'use strict';

    angular
        .module('yoothub')
        .factory('LoginModalService', LoginModalService);

    LoginModalService.$inject = ['$log'];
    function LoginModalService($log) {
        var service = {
            show: show
        };

        return service;

        ////////////////
        function show() {
            $log.debug('Show login modal');
            angular.element('#loginModal').openModal();
        }

    }
})();
