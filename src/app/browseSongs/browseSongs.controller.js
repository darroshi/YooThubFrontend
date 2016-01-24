(function () {
    'use strict';

    angular
        .module('yoothub')
        .controller('BrowseSongsController', BrowseSongsController);

    BrowseSongsController.$inject = ['SongService', '$log', '$stateParams', 'songsConstants'];
    function BrowseSongsController(SongService, $log, $stateParams, songsConstants) {
        var vm = this;
        vm.songs = [];
        vm.search = null;
        vm.paginationData = null;

        activate();

        ////////////////
       
        function activate() {
            vm.search = $stateParams.search;
            loadPage(parseInt($stateParams.page) || 1);
        }

        function loadPage(page) {
            $log.debug('Load song page', page, vm.search);
            SongService.getPage(page - 1).then(setPage);
        }

        function setPage(page) {
            $log.debug('Setting song page:', page);
            vm.paginationData = {
                Page: page.Page + 1,
                Count: page.Count,
                PageSize: page.PageSize
            }
            vm.songs = page.Results;
        }
    }
})();