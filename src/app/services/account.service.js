(function () {
    'use strict';

    angular
        .module('yoothub')
        .factory('AccountService', AccountService);

    AccountService.$inject = ['$http'];
    function AccountService($http) {
        var service = {
            getAuthStatus: getAuthStatus
        };

        return service;

        ////////////////
        
        
        function getAuthStatus() {
            var url = '/api/Account/ExternalLoginCallback';

            return $http.get(url).then(checkAuthenticatedStatusCode);

        }

        function checkAuthenticatedStatusCode(response) {
            return response.status;
        }
    }
})();