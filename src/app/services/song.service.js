(function () {
    'use strict';

    angular
        .module('yoothub')
        .factory('SongService', SongService);

    SongService.$inject = ['$http', 'songsConstants', '$log'];
    function SongService($http, songsConstants, $log) {
        var service = {
            getPage: getPage,
            postNewSong: postNewSong,
            getCurrentSong: getCurrentSong,
            upvoteSong: upvoteSong,
            downvoteSong: downvoteSong
        };

        return service;

        ////////////////
        function getPage(pageParams) {
            var url = '/api/Songs';

            $log.debug('Getting page', pageParams);

            if (!('pageSize' in pageParams)) {
                pageParams['pageSize'] = songsConstants.SONG_PAGE_SIZE;
            }

            return $http.get(url, { 'params': pageParams }).then(parsePage);
        }

        function parsePage(response) {
            var page = response.config.params.page;
            var pageSize = response.config.params.pageSize;
            $log.debug('getPage response', response);
            return {
                Page: page,
                PageSize: pageSize,
                Count: response.data.Count,
                Results: response.data.Results
            };
        }

        function postNewSong(songData) {// TODO: name + tags instead of "data"
            var url = '/api/Songs';

            return $http.post(url, songData).then(parseNewSongRespone);
        }

        function parseNewSongRespone(response) {
            $log.debug('Song post reponse', response);
            if (response.status === 200) {
                return {
                    success: true,
                    errors: null
                }
            }

            if (response.status === 400) {
                return {
                    success: false,
                    errors: response.data
                }
            }

            if (response.status === 500) {
                $log.error('Song post reponse', response);
                return {
                    success: false,
                    errors: { form: "Wystąpił nieoczekiwany błąd! :(" },
                }

            }
        }


        function getCurrentSong() {
            var url = '/api/Play';
            $log.debug('Getting new song');
            return $http.get(url).then(parseCurrentSong);
        }

        function parseCurrentSong(response) {
            $log.debug('New song response', response);
            var song = response.data;
            var lastPlayed = Date.parse(song.Song.LastPlayed);
            var startFrom = (new Date() - lastPlayed) / 1000;

            song.startFrom = startFrom; //TODO: add abstraction
            return song;
        }

        function upvoteSong(song) {
            voteSong(song, songsConstants.UPVOTE);
        }

        function downvoteSong(song) {
            voteSong(song, songsConstants.DOWNVOTE);
        }

        function voteSong(song, direction) {
            if (song.CurrentVote == direction)
                return;

            var url = '/api/Songs/' + direction + '/' + song.Song.Id;
            $log.debug('Posting ' + direction, song.Song.Id, song.Song.Title);
            return $http.post(url).then(function (result) {
                parseVotingResult(result, song, direction);
            });
        }

        function parseVotingResult(response, song, direction) {
            $log.debug('Voting response', response);

            if (response.status === 200) {

                if (!song.CurrentVote) {
                    song.CurrentVote = '';
                }
                song.Song.Votes += songsConstants.VOTE_VALUES[song.CurrentVote + direction];
                song.CurrentVote = direction;
                return true;

            }


            $log.error('Voting response', response, song, direction);
            return false;
        }

    }
})();