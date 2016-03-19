(function() {
    'use strict';

    angular
        .module('yoothub')
        .config(routerConfig);


    var add = {
        name: 'addSong',
        url: '/add',
        templateUrl: 'app/addSong/addSong.html',
        controller: 'AddSongController',
        controllerAs: 'vm'
    };

    /** @ngInject */
    function routerConfig($stateProvider) {
        $stateProvider
            .state(add);
    }
})();
