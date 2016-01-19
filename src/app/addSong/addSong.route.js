(function () {
    'use strict';

    angular
        .module('yoothub')
        .config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider) {
        $stateProvider
            .state(add);
    }

    var add = {
        name: 'addSong',
        url: '/add',
        templateUrl: 'app/addSong/addSong.html',
        controller: 'AddSongController',
        controllerAs: 'vm'
    }

})();
