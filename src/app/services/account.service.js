(function () {
    'use strict';

    angular
        .module('yoothub')
        .factory('AccountService', AccountService);

    AccountService.$inject = ['$http'];
    function AccountService($http) {
        var service = {
            getAuthStatus: getAuthStatus,
            getAuthSchemas: getAuthSchemas
        };

        return service;

        ////////////////
        
        
        function getAuthStatus() {// TODO: extract urls
            var url = '/api/Account/GetLoggedUserInfo';

            return $http.get(url).then(getAuthenticatedStatusCode);
        }

        function getAuthenticatedStatusCode(response) {
            return response.status;
        }

        function getAuthSchemas() {
            var url = '/api/Account/GetExternalAuthenticationSchemes';

            return $http.get(url).then(getData);
        }

        function getData(response) {
            return response.data;
        }
    }
})();