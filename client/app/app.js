'use strict';

angular.module('registryExplorerApp', [
	'ngCookies',
	'ngResource',
	'ngSanitize',
	'ui.router',
	'ui.bootstrap',
	'LocalStorageModule',
])
.constant('OfficialRepository', 'registry.hub.docker.com')
.controller('RootCtrl', function($scope, $rootScope, $timeout) {
	$scope.timedLoading = false;
	$scope.loading = false;

	var beginLoading = function() {
		$scope.timedLoading = true;
		$timeout(function() {
			$scope.loading = $scope.timedLoading;
		}, 250);
	};

	var endLoading = function() {
		$scope.loading = $scope.timedLoading = false;
	};

	$rootScope.$on('$stateChangeStart', beginLoading);
	$rootScope.$on('$stateChangeSuccess', endLoading);
	$rootScope.$on('$stateChangeError', endLoading);
})
.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
	$urlRouterProvider.otherwise('/');
	$locationProvider.html5Mode(true);
})
.config(function (localStorageServiceProvider) {
	localStorageServiceProvider.setPrefix('registry-explorer');
})
.directive('focus',
    function($timeout) {
        return {
            scope : {
                focus: '='
            },
            link : function(scope, element) {
                if (scope.focus) {
                    $timeout(function() {
                        element[0].focus();
                    });
                }
            }
        };
    }
);
