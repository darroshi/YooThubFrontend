(function() {
    'use strict';

    angular
        .module('yoothub')
        .factory('AuthenticationInterceptor', AuthenticationInterceptor);

    AuthenticationInterceptor.$inject = ['$injector'];

    /* @ngInject */
    function AuthenticationInterceptor($injector) {
        var service = {
            response: response,
            responseError: response
        };
        return service;

        ////////////////

        function response(resp) {
            if (resp.status === 403 || resp.status === 401 || resp.status === 0) {
                $injector.get('LoginModalService').show();
            }

            return resp;
        }
    }
})();
