(function () {
    'use strict';

    angular
        .module('yoothub')
        .config(routerConfig);

    /** @ngInject */
    function routerConfig($urlRouterProvider) {
        $urlRouterProvider.otherwise('/play');
    }

})();
