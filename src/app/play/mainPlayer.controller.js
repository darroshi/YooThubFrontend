(function () {
    'use strict';

    angular
        .module('yoothub')
        .controller('MainPlayerController', MainPlayerController);

    MainPlayerController.$inject = ['SongService', '$rootScope', "$log"];
    function MainPlayerController(SongService, $rootScope, $log) {
        var playerController = this;
        playerController.song = null;

        activate();

        ////////////////

        function activate() {
            $rootScope.$on('player.mainPlayer.ready', onPlayerReady);
            $rootScope.$on('player.mainPlayer.ended', onPlayEnded);
            $rootScope.$on('player.mainPlayer.error', onPlayError);
            $rootScope.$on('player.mainPlayer.reload', loadSong);

        }

        function onPlayerReady(event) {
            loadSong();
        }

        function onPlayEnded(event) {
            loadSong();
        }

        function onPlayError(event) {
            if (playerController.song.contentId !== undefined) {
                SongService.reportError(playerController.song.contentId).finally(loadSong);
            }
        }

        function loadSong() {
            
            SongService.getCurrentSong().then(setSong);
        }

        function setSong(data) {
            $log.debug("Setting song data", data);
            playerController.song = data;
            $rootScope.title = data.Song.Title;
        }
    }
})();