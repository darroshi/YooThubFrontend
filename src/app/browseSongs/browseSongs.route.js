(function() {
    'use strict';

    angular
        .module('yoothub')
        .config(routerConfig);

    var browse = {
        name: 'browse',
        url: '/browse?page&search',
        templateUrl: 'app/browseSongs/browseSongs.html',
        controller: 'BrowseSongsController',
        controllerAs: 'vm'
    };

    /** @ngInject */
    function routerConfig($stateProvider) {
        $stateProvider
            .state(browse);
    }
})();
