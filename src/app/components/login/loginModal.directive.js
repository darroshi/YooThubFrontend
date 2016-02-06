(function () {
    'use strict';

    angular
        .module('yoothub')
        .directive('ytLoginModal', ytLoginModal);

    ytLoginModal.$inject = [];
    function ytLoginModal() {
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

    LoginModalController.$inject = ['AccountService', '$log', '$window','$rootScope'];
    
    /* @ngInject */
    function LoginModalController(AccountService, $log,$window,$rootScope) {
        var vm = this;
        vm.schemas = [];
        vm.formAction = '/api/Account/ExternalLogin';
        vm.previousUrl = '/'+$window.location.hash;



        activate();

        ////////////////

        function activate() {
            $log.debug('Activate LoginModalController');
            $rootScope.$on('$locationChangeSuccess', locationChanged);
            
            AccountService.getAuthSchemas().then(setSchemas);
        }
        
        function locationChanged(event, newUrl, oldUrl){
            vm.previousUrl ='/'+ $window.location.hash;
        }

        function setSchemas(data) {
            $log.info('Set schema ', data);
            vm.schemas = data;
        }
    }
})();