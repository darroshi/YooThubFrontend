(function() {
    'use strict';

    angular
        .module('yoothub')
        .controller('BrowseSongsController', BrowseSongsController);

    BrowseSongsController.$inject = ['SongService', '$log', '$stateParams', 'songsConstants', '$state'];
    function BrowseSongsController(SongService, $log, $stateParams, songsConstants, $state) {
        var vm = this;
        vm.songs = [];
        vm.search = null;
        vm.paginationData = null;
        vm.upvote = upvote;
        vm.downvote = downvote;

        vm.onSearchChanged = onSearchChanged;

        activate();

        ////////////////

        function activate() {
            vm.search = $stateParams.search;
            loadPage(parseInt($stateParams.page) || 1);
        }

        function onSearchChanged() {
            $state.go('browse', {
                page: 1,
                search: vm.search
            });
        }

        function loadPage(page) {
            $log.debug('Load song page', page, vm.search);
            var params = {
                page: page - 1
            };

            if (vm.search) {
                params.query = vm.search;
            }
            SongService.getPage(params).then(setPage);
        }

        function setPage(page) {
            $log.debug('Setting song page:', page);
            vm.paginationData = {
                Page: page.Page + 1,
                Count: page.Count,
                PageSize: page.PageSize
            };
            vm.songs = page.Results;
        }

        function upvote(song) {
            SongService.upvoteSong(song);
        }

        function downvote(song) {
            SongService.downvoteSong(song);
        }
    }
})();
