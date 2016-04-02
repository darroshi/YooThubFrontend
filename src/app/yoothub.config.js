(function() {
    'use strict';

    angular
        .module('yoothub')
        .config(config)
        .config(configInterceptors)
        .config(theme);

    /** @ngInject */
    function config($logProvider, toastrConfig) {
        // Enable log
        $logProvider.debugEnabled(true);

        // Set options third-party lib
        toastrConfig.allowHtml = true;
        toastrConfig.timeOut = 2000;
        toastrConfig.positionClass = 'toast-top-right';
        toastrConfig.preventDuplicates = false;
        toastrConfig.progressBar = false;
    }

    configInterceptors.$inject = ['$httpProvider'];

    /** @ngInject */
    function configInterceptors($httpProvider) {
        $httpProvider.interceptors.push('AuthenticationInterceptor');
    }

    theme.$inject = ['$mdThemingProvider'];

    /** @ngInject */
    function theme($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .dark()
            .primaryPalette('blue-grey', { default: '700' })
            .accentPalette('blue')
            .backgroundPalette('blue-grey', { default: '900' });
    }

})();
