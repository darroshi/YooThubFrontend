(function() {
'use strict';

    angular
        .module('yoothub')
        .factory('LoginModalService', LoginModalService);

    LoginModalService.$inject = ['$log'];
    function LoginModalService($log,$window) {
        var service = {
            show:show
        };
        
        return service;

        ////////////////
        function show() {    
            $('#loginModal').openModal();
        }
        
    }
})();