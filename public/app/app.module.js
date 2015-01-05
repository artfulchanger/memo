(function() {
    var app = angular.module('MemoApp', ['MemoApp.directives']);
    
    app.config(function($interpolateProvider) {
        $interpolateProvider.startSymbol('[[');
        $interpolateProvider.endSymbol(']]');
    });
    
    app.controller('AppController', function ($scope) {
    });
    
})();