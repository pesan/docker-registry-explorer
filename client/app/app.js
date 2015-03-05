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
.controller('RootCtrl', function($scope, $rootScope, $state, $timeout, errorModal) {
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
	$rootScope.$on('$stateChangeError', function(evt, toState, toArgs, fromState, fromArgs, cause) {
		endLoading();

		errorModal(cause.data.error.message, {
			onTryAgain: function() {
				$timeout(function () {
					$state.go(toState.name, toArgs);
				}, 600);
			},
			onHome: function () {
				$state.go('main');
			},
			onCancel: fromState.name ? _.identity : undefined
		});
	});
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
