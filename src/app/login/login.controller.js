(function () {
    'use strict';

    angular
        .module('yoothub')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['AccountService'];
    function LoginController(AccountService) {
        var vm = this;
        vm.schemas = [];
        vm.useSchema = useSchema;
        vm.formAction = '/api/Account/ExternalLogin';
        vm.previousUrl = '/';

        activate();

        ////////////////

        function activate() {
            AccountService.getAuthSchemas().then(setSchemas);
        }

        function setSchemas(data) {
            vm.schemas = data;
        }

        function useSchema(schema) {
            AccountService.logInWithSchema(schema);
        }
    }
})();