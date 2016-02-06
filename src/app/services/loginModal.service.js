(function() {
'use strict';

    angular
        .module('yoothub')
        .factory('LoginModalService', LoginModalService);

    LoginModalService.$inject = ['$log','$window'];
    function LoginModalService($log,$window) {
        var service = {
            show:show
        };
        
        return service;

        ////////////////
        function show() {    
            var currentUrl=$window.location.hash;
            $log.debug("Show login modal", currentUrl)
            $('#loginModal').openModal();
        }
        
    }
})();