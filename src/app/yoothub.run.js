(function () {
    'use strict';

    angular
        .module('yoothub')
        .run(checkAuth);

    /** @ngInject */
    function checkAuth(AccountService, $log, ytVersion) {
        $log.info('YooThub Frontend version', ytVersion);
    }

})();
