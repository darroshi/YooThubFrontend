(function () {
    'use strict';

    angular
        .module('yoothub')
        .factory('AccountService', AccountService);

    AccountService.$inject = ['$http'];
    function AccountService($http) {
        var service = {
            getAuthStatus: getAuthStatus,
            getAuthSchemas: getAuthSchemas,
            //logInWithSchema: logInWithSchema
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

        // function logInWithSchema(schema) {
        //     var url = '/api/Account/ExternalLogin';
        //     var body = {
        //         "Provider": schema.AuthenticationScheme,
        //         "ReturnURL": "/"
        //     };
        //     $http.post(url, body).then(logResponse);// redirect
        // }

        function logResponse(response) {

            console.log(response);
        }

    }
})();