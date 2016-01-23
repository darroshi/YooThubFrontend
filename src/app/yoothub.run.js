(function () {
    'use strict';

    angular
        .module('yoothub')
        .run(checkAuth);

    /** @ngInject */
    function checkAuth(AccountService, $log) {
    }

})();
