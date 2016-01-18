(function () {
    'use strict';

    angular
        .module('yoothub')
        .config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider) {
        $stateProvider
            .state(browse);
    }

    var browse = {
        name: 'addSong',
        url: '/add',
        templateUrl: 'app/addSongs/addSongs.html',
        controller: 'BrowseSongsController',
        controllerAs: 'vm'
    }

})();
