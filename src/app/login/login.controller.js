(function () {
    'use strict';

    angular
        .module('yoothub')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['AccountService', '$log'];
    function LoginController(AccountService, $log) {
        var vm = this;
        vm.schemas = [];
        vm.formAction = '/api/Account/ExternalLogin';
        vm.previousUrl = '/';

        activate();

        ////////////////

        function activate() {
            $log.info('Activate LoginController');
            AccountService.getAuthSchemas().then(setSchemas);
        }

        function setSchemas(data) {
            $log.info('Set schema ' + data);
            vm.schemas = data;
        }
    }
})();