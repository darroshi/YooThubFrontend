(function () {
    'use strict';

    angular
        .module('yoothub')
        .directive('ytPlayer', ytPlayer);

    ytPlayer.$inject = [];
    function ytPlayer() {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            bindToController: true,
            controller: YtPlayerController,
            controllerAs: 'vm',
            link: link,
            restrict: 'E',
            scope: {
                song: '=',
            }
        };
        return directive;

        function link(scope, element, attrs) {
        }
    }

    YtPlayerController.$inject = ['$scope', '$rootScope', '$element', '$attrs', '$interval', '$window', '$log'];
    
    /* @ngInject */
    function YtPlayerController($scope, $rootScope, $element, $attrs, $interval, $window, $log) {
        var vm = this;
        vm.id = null;
        vm.player = null;
        vm.ready = false;
        vm.progress = 0;

        activate();
        
        ////////////////
        var stateNames = {
            '-1': 'unstarted',
            0: 'ended',
            1: 'playing',
            2: 'paused',
            3: 'buffering',
            5: 'queued'
        };
        
        function activate() {

            if (YT === undefined || YT.Player === undefined) { // TODO: load youtube  script from code?
                $window.onYouTubeIframeAPIReady = activate;
                return;
            }

            $scope.$watch('vm.song', loadSong);
            vm.id = $attrs.playerId || $element[0].id;
            $element[0].id = vm.id;

            initPlayer();
            startListening();
        }

        function startListening() {
            // TODO: Extract constants
            $rootScope.$on('player.' + vm.id + '.pause', pause);
            $rootScope.$on('player.' + vm.id + '.play', play);
            $rootScope.$on('player.' + vm.id + '.mute', mute);
            $rootScope.$on('player.' + vm.id + '.unMute', unMute);
        }

        function initPlayer() {

            if (vm.player && vm.player.destroy === 'function') {
                vm.ready = false;
                vm.player.destroy();
            }

            vm.player = createPlayer();

            $interval(updateProgress, 200);
        }

        function updateProgress() {
            if (vm.ready && vm.player.getDuration) {
                vm.progress = (vm.player.getCurrentTime() / vm.player.getDuration()) * 100;
                $rootScope.$emit('player.' + vm.id + '.progress', vm.progress); // TODO: extract
            }
        }

        function createPlayer() {
            var ytPlayer = new YT.Player(vm.id, {
                width: 927,
                height: 480,
                playerVars: {
                    controls: 0,
                },
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange,
                    'onError': onPlayerError
                }
            });

            return ytPlayer;
        }

        function pause() {
            $log.debug("Player pause requested");
            
            if (vm.ready) {
                vm.player.pauseVideo();
            }
        }

        function play() {
            $log.debug("Player play requested");
            
            if (vm.ready) {
                vm.player.playVideo();
            }
        }

        function mute() {
            $log.debug("Player mute requested");
            
            if (vm.ready) {
                vm.player.mute();
            }
        }

        function unMute() {
            $log.debug("Player unmute requested");
            
            if (vm.ready) {
                vm.player.unMute();
            }
        }

        function onPlayerReady() {
            vm.ready = true;
            $log.debug("Player ready");
            $rootScope.$emit('player.' + vm.id + '.ready');
        }

        function onPlayerStateChange(event) {
            $log.debug("Player "+stateNames[event.data]);
            $rootScope.$emit('player.' + vm.id + '.' + stateNames[event.data]);
        }

        function onPlayerError(event) {
            $log.debug("Player error", event);
            $rootScope.$emit('player.' + vm.id + '.error');
        }

        function loadSong(newValue, oldValue) {
            if (newValue !== oldValue) {
                loadVideo(newValue.contentId, newValue.startFrom);
            }
        }

        function loadVideo(contentId, startFrom) {
            vm.player.loadVideoById(contentId, startFrom, "default");
        }
    }
})();