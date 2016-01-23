(function () {
    'use strict';

    angular
        .module('yoothub')
        .config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider) {
        $stateProvider
            .state(play);
    }

    var play= {
        name: 'play',
        url: '/play',
        templateUrl: 'app/play/play.html',
        controller: 'PlayController',
        controllerAs: 'vm'
    }

})();
