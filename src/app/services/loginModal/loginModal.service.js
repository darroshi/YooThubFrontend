(function() {
    'use strict';

    angular
        .module('yoothub')
        .controller('LoginModalController', LoginModalController);

    LoginModalController.$inject = ['AccountService', '$log', '$window', '$rootScope', '$scope'];
    function LoginModalController(AccountService, $log, $window, $rootScope, $scope) {
        var vm = this;
        vm.schemas = [];
        vm.formAction = '/api/Account/ExternalLogin';
        vm.previousUrl = '/' + $window.location.hash;

        activate();

        ////////////////
        var destroyLocationChangedHandler = null;

        function activate() {
            $log.debug('Activate LoginModalController');
            destroyLocationChangedHandler = $rootScope.$on('$locationChangeSuccess', locationChanged);

            $scope.$on('$destroy', function() {
                destroyLocationChangedHandler();
            });

            AccountService.getAuthSchemas().then(setSchemas);
        }

        function locationChanged() {
            vm.previousUrl = '/' + $window.location.hash;
        }

        function setSchemas(data) {
            $log.debug('Set schema ', data);
            vm.schemas = data;
        }
    }

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


