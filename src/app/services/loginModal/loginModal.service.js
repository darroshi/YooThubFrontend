/* global LoginModalController */
(function() {
    'use strict';

    angular
        .module('yoothub')
        .factory('LoginModalService', LoginModalService);

    LoginModalService.$inject = ['$log', '$mdDialog'];
    function LoginModalService($log, $mdDialog) {
        var service = {
            show: show
        };

        return service;

        ////////////////
        function show() {
            $log.debug('Show login modal');
            $mdDialog.show({
                templateUrl: 'app/services/loginModal/loginModal.html',
                controller: LoginModalController,
                controllerAs: 'vm'
            });
        }

    }
})();
