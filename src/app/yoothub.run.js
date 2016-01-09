(function () {
    'use strict';

    angular
        .module('yoothub')
        .run(checkAuth);

    /** @ngInject */
    function checkAuth(AccountService, $log) {
        var status = AccountService.getAuthStatus();
        if (status === 401 || status === 403) {

            $log.debug("Unauthorized " + status);
        }
    }

})();
