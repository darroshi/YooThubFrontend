(function() {
    'use strict';

    angular
        .module('yoothub')
        .directive('ytPagination', ytPagination);

    ytPagination.$inject = [];
    function ytPagination() {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            templateUrl: 'app/components/pagination/pagination.html',
            bindToController: true,
            controller: ControllerController,
            controllerAs: 'vm',
            restrict: 'E',
            scope: {
                paginationData: '='
            }
        };
        return directive;
    }

    ControllerController.$inject = ['$scope'];

    /* @ngInject */
    function ControllerController($scope) {
        var vm = this;
        vm.refDataList = [];
        vm.hasPrevious = false;
        vm.hasNext = false;
        vm.page = null;
        vm.itemsCount = null;
        vm.itemsPerPage = null;

        activate();

        ////////////////
        // TODO: refactor or use ready lib, calculate once when more than one pagination directives are rendered
        function activate() {
            $scope.$watch('vm.paginationData', setPages);
        }

        function setPages(newValue) {

            if (angular.isUndefined(newValue) || newValue === null) {
                return;
            }

            vm.page = newValue.Page;
            vm.itemsCount = newValue.Count;
            vm.itemsPerPage = newValue.PageSize;

            var adjecantPages = 4;

            var pages = getPagesCount(vm.itemsCount, vm.itemsPerPage);
            var start = getStartPageNumber(vm.page, adjecantPages);
            var end = getEndPageNumber(vm.page, adjecantPages, pages);

            vm.refDataList = getRefDataList(start, end, pages);

            vm.hasPrevious = vm.page > 1;

            vm.hasNext = vm.page < pages && pages !== 0;
        }

        function getPagesCount(count, perPage) {
            return Math.ceil(parseInt(count) / parseInt(perPage));
        }

        function getStartPageNumber(page, adjecantPages) {

            var start = Math.max(parseInt(page) - adjecantPages, 1);

            if (start < adjecantPages) {
                start = 1;
            }

            return start;
        }

        function getEndPageNumber(page, adjecantPages, pages) {
            var end = page + adjecantPages + 1;

            if (end > pages) {
                end = pages;
            }

            return end;
        }

        function getRef(page) {
            return 'browse({ page: ' + page + '})';
        }

        function getRefData(page) {
            return {
                ref: getRef(page),
                page: page
            };
        }

        function getDotObject() {
            return {
                url: '#',
                page: '...'
            };
        }

        function getRefDataList(start, end, pages) {
            var urlList = [];
            if (pages < 2) {
                return urlList;
            }
            if (start !== 1) {
                urlList.push(getRefData(1));
                urlList.push(getDotObject());
            }

            for (var i = start; i <= end; i++) {
                urlList.push(getRefData(i));
            }

            if (end !== pages) {
                urlList.push(getDotObject());
                urlList.push(getRefData(pages));
            }

            return urlList;
        }
    }
})();
