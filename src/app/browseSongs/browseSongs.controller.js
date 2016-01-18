(function () {
    'use strict';

    angular
        .module('yoothub')
        .controller('BrowseSongsController', BrowseSongsController);

    BrowseSongsController.$inject = ['SongService', '$log'];
    function BrowseSongsController(SongService, $log) {
        var vm = this;
        vm.songs = [];

        activate();

        ////////////////

        function activate() {
            SongService.getPage(1).then(setPage);
        }

        function setPage(page) {
            $log.debug('Setting song page:', page);
            vm.songs = page.Results;
        }
    }
})();