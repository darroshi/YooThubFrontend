(function () {
    'use strict';

    angular
        .module('yoothub')
        .controller('MainPlayerController', MainPlayerController);

    MainPlayerController.$inject = ['SongService', '$rootScope', '$log', '$scope'];
    function MainPlayerController(SongService, $rootScope, $log, $scope) {
        var vm = this;
        vm.song = null;

        activate();

        ////////////////
        var destroyReady = null;
        var destroyEnded = null;
        var destroyError = null;
        var destroyReload = null;

        function activate() {
            //TODO: how to properly destroy events
            destroyReady = $rootScope.$on('player.mainPlayer.ready', onPlayerReady);
            destroyEnded = $rootScope.$on('player.mainPlayer.ended', onPlayEnded);
            destroyError = $rootScope.$on('player.mainPlayer.error', onPlayError);
            destroyReload = $rootScope.$on('player.mainPlayer.reload', loadSong);

            $scope.$on('$destroy', function () {
                destroyReady();
                destroyEnded();
                destroyError();
                destroyReload();
            });
        }

        function onPlayerReady() {
            loadSong();
        }

        function onPlayEnded() {
            loadSong();
        }

        function onPlayError() {
            if (angular.isDefined(vm.song.contentId)) {
                SongService.reportError(vm.song.contentId).finally(loadSong);
            }
        }

        function loadSong() {
            SongService.getCurrentSong().then(setSong);
        }

        function setSong(data) {
            $log.debug('Setting song data', data);
            vm.song = data;
            $rootScope.title = data.Song.Title;
        }
    }
})();
