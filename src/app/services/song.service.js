(function () {
    'use strict';

    angular
        .module('yoothub')
        .factory('SongService', SongService);

    SongService.$inject = ['$http', 'songsConstants', '$log'];
    function SongService($http, songsConstants, $log) {
        var service = {
            getPage: getPage,
            postNewSong:postNewSong,
            getCurrentSong:getCurrentSong
        };

        return service;

        ////////////////
        function getPage(page) {
            var url = '/api/Songs';

            $log.debug('Getting page', page);
            var params = {
                'page': page,
                'pageSize': songsConstants.SONG_PAGE_SIZE,
            };

            return $http.get(url, { 'params': params }).then(parsePage);
        }

        function parsePage(response) {
            var page = response.config.params.page;
            var pageSize = response.config.params.pageSize;
            $log.debug('getPage response', response);
            return {
                Page: page,
                PageSize: pageSize,
                Results: response.data.Results
            };
        }
        
        function postNewSong(songData){// TODO: name + tags instead of "data"
            var url = '/api/Songs';
            
            return $http.post(url, songData);
        }
        
        function getCurrentSong(){
            var url = '/api/Play';
            $log.debug('Getting new song');
            return $http.get(url).then(parseCurrentSong);
        }
        
        function parseCurrentSong(response){
            $log.debug('New song response', response);
            var lastPlayed = Date.parse(response.data.LastPlayed);
            var startFrom = (new Date() - lastPlayed)/1000;
            
            return { 
                contentId: response.data.SongId,
                startFrom: startFrom,
                title: response.data.Title
            }
        }
    }
})();