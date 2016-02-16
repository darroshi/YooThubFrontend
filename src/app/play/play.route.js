(function () {
    'use strict';

    angular
        .module('yoothub')
        .config(routerConfig);

    var play = {
        name: 'play',
        url: '/play',
        templateUrl: 'app/play/play.html',
        controller: 'PlayController',
        controllerAs: 'vm'
    };

    /** @ngInject */
    function routerConfig($stateProvider) {
        $stateProvider
            .state(play);
    }
})();
