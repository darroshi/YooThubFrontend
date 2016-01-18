(function() {
'use strict';

    angular
        .module('yoothub')
        .controller('AddSongController', AddSongController);

    AddSongController.$inject = ['SongService', '$log'];
    function AddSongController(SongService, $log) {
        var vm = this;
        

        activate();

        ////////////////

        function activate() { }
    }
})();