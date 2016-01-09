(function () {
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

        function response(response) {
            if (response.status === 403 || response.status === 401 || response.status === 0) {
                $injector.get('$state').go('login');
            }

            return response;
        }
    }
})();
