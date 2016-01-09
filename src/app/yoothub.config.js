(function () {
    'use strict';

    angular
        .module('yoothub')
        .config(config)
        .config(configInterceptors);

    /** @ngInject */
    function config($logProvider, toastrConfig) {
        // Enable log
        $logProvider.debugEnabled(true);

        // Set options third-party lib
        toastrConfig.allowHtml = true;
        toastrConfig.timeOut = 3000;
        toastrConfig.positionClass = 'toast-top-right';
        toastrConfig.preventDuplicates = true;
        toastrConfig.progressBar = true;
    }

    configInterceptors.$inject = ['$httpProvider']
  
    /** @ngInject */
    function configInterceptors($httpProvider) {
        $httpProvider.interceptors.push('AuthenticationInterceptor');
    }

})();
