(function () {
    'use strict';

    angular
        .module('yoothub')
        .factory('SongService', SongService);

    SongService.$inject = ['$http', 'songsConstants', '$log'];
    function SongService($http, songsConstants, $log) {
        var service = {
            getPage: getPage
        };

        return service;

        ////////////////
        function getPage(page) {
            var url = '/api/Songs';

            $log.warn('Not implemented! SongService.getPage');
            var params = {
                // 'page': page,
                // 'pageSize': songsConstants.SONG_PAGE_SIZE,
            };

            return $http.get(url, { 'params': params }).then(parsePage);
        }

        function parsePage(response) {
            var page = response.config.params.page;
            var pageSize = response.config.params.pageSize;

            return {
                Page: page,
                PageSize: pageSize,
                Results: response.data.Results
            };
        }
    }
})();