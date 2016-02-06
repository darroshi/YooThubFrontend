(function () {
    'use strict';

    angular
        .module('yoothub')
        .directive('ytLoginModal', ytLoginModal);

    ytLoginModal.$inject = [];
    function ytLoginModal() {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            templateUrl: 'app/components/login/login.html',
            bindToController: true,
            controller: LoginModalController,
            controllerAs: 'vm',
            link: link,
            restrict: 'E',
            scope: {
            }
        };
        return directive;

        function link(scope, element, attrs) {
        }
    }

    LoginModalController.$inject = ['AccountService', '$log','eventConstants', '$rootScope'];
    
    /* @ngInject */
    function LoginModalController(AccountService, $log, eventConstants, $rootScope) {
        var vm = this;
        vm.schemas = [];
        vm.formAction = '/api/Account/ExternalLogin';
        vm.previousUrl = '/';



        activate();

        ////////////////

        function activate() {
            $log.info('Activate LoginModalController');
            
            AccountService.getAuthSchemas().then(setSchemas);
        }
        
        function setSchemas(data) {
            $log.info('Set schema ', data);
            vm.schemas = data;
        }
    }
})();