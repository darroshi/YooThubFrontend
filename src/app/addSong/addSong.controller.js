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
        
        vm.errors = null;


        ////////////////

        function postSong() {
            $log.debug('Sending song', vm.model);
            vm.errors = null;
            SongService.postNewSong(vm.model).then(handlePostSongResponse);
        }

        function handlePostSongResponse(result) {
            if (result.success) {
                vm.model = {
                    URL: '',
                    Tags: []
                };
                
                //toast success
                return;
            }
            
            vm.errors = result.errors;


        }

    }
})();