(function () {
    'use strict';

    angular
        .module('yoothub')
        .controller('PlayController', PlayController);

    PlayController.$inject = ['SongService'];
    function PlayController(SongService) {
        var vm = this;
        vm.upvote = upvote;
        vm.downvote = downvote;

        ////////////////

        function upvote(song) {
            SongService.upvoteSong(song);
        }

        function downvote(song) {
            SongService.downvoteSong(song);
        }
    }
})();
