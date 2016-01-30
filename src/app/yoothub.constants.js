/* global malarkey:false, moment:false */
(function () {
    'use strict';

    angular
        .module('yoothub')
        .constant('malarkey', malarkey)
        .constant('moment', moment)
        .constant('ytVersion', '0.4.0')
        .constant('songsConstants', {
            SONG_PAGE_SIZE: 20
        });



})();
