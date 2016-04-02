(function() {
    'use strict';

    angular
        .module('yoothub')
        .controller('AddSongController', AddSongController);

    AddSongController.$inject = ['SongService', '$log', '$scope', 'ToastService', 'AccountService', '$mdConstant'];
    function AddSongController(SongService, $log, $scope, ToastService, AccountService, $mdConstant) {
        var vm = this;
        vm.postSong = postSong;

        vm.model = {
            URL: '',
            Tags: []
        };

        vm.errors = null;
        vm.processing = false;

        vm.tagsSeparatorKeys = [$mdConstant.KEY_CODE.ENTER, $mdConstant.KEY_CODE.COMMA, $mdConstant.KEY_CODE.SPACE];

        activate();

        ////////////////

        function activate() {
            AccountService.getAuthStatus();
        }

        function postSong() {
            if (vm.processing) {
                return;
            }

            vm.processing = true;
            $log.debug('Sending song', vm.model);
            setErrors(null);
            SongService.postNewSong(vm.model).then(handlePostSongResponse);
        }

        function handlePostSongResponse(result) {
            $log.debug('New song result', result);
            vm.processing = false;

            if (!result) {
                return;
            }


            setErrors(result.errors);
            if (result.success) {
                vm.model = {
                    URL: '',
                    Tags: []
                };
                ToastService.success('Dodano!');
            }
        }

        function setErrors(errors) {
            vm.errors = errors;
            $scope.form.URL.$setValidity('server', !!vm.errors && !vm.errors.URL);
            $scope.form.Tags.$setValidity('server', !!vm.errors && !vm.errors.Tags);
        }
    }
})();
