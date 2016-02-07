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
            restrict: 'E'
        };
        return directive;
    }

    LoginModalController.$inject = ['AccountService', '$log', '$window', '$rootScope', '$scope'];

    /* @ngInject */
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

            $scope.$on('$destroy', function () {
                destroyLocationChangedHandler();
            });

            AccountService.getAuthSchemas().then(setSchemas);
        }

        function locationChanged() {
            vm.previousUrl = '/' + $window.location.hash;
        }

        function setSchemas(data) {
            $log.info('Set schema ', data);
            vm.schemas = data;
        }
    }
})();
