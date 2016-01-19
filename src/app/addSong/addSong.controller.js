(function () {
    'use strict';

    angular
        .module('yoothub')
        .controller('AddSongController', AddSongController);

    AddSongController.$inject = ['SongService', '$log'];
    function AddSongController(SongService, $log) {
        var vm = this;
        vm.postSong = postSong;

        vm.model = {
            URL: '',
            Tags: []
        };


        ////////////////

        function postSong() {
            $log.debug('Sending song', vm.model);
            SongService.postNewSong(vm.model).then(handlePostSongResponse);
        }

        function handlePostSongResponse(response) {
            $log.debug('Song post reponse', response);

        }

    }
})();