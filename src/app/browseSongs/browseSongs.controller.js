(function () {
    'use strict';

    angular
        .module('yoothub')
        .controller('BrowseSongsController', BrowseSongsController);

    BrowseSongsController.$inject = ['SongService', '$log', '$stateParams'];
    function BrowseSongsController(SongService, $log, $stateParams) {
        var vm = this;
        vm.songs = [];
        vm.search = null;

        activate();

        ////////////////

        function activate() {
            vm.search = $stateParams.search;
            loadPage(parseInt($stateParams.page) || 0);
        }
        
        function loadPage(page){
            $log.debug('Load song page', page, vm.search);
            SongService.getPage(page).then(setPage);
        }

        function setPage(page) {
            $log.debug('Setting song page:', page);
            vm.songs = page.Results;
        }
    }
})();