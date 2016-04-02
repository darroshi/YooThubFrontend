/* global malarkey:false, moment:false */
(function() {
    'use strict';

    angular
        .module('yoothub')
        .constant('malarkey', malarkey)
        .constant('moment', moment)
        .constant('ytVersion', '0.8.0')
        .constant('songsConstants', {
            SONG_PAGE_SIZE: 21,
            UPVOTE: 'Upvote',
            DOWNVOTE: 'Downvote',
            VOTE_VALUES: {
                Upvote: 1,
                Downvote: -1,
                UpvoteDownvote: -2,
                DownvoteUpvote: 2
            }
        });
})();
