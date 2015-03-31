'use strict';

angular.module('registryExplorerApp', [
	'ngCookies',
	'ngResource',
	'ngSanitize',
	'ui.router',
	'ui.bootstrap',
	'LocalStorageModule',
])
.constant('officialRegistry', {
	protocol: 'https',
	hostname: 'registry.hub.docker.com',
	port: 443
})
.factory('localRegistry', function($location) {
	return {
		protocol: 'http',
		hostname: $location.host(),
		port: 5000
	};
})
.controller('RootCtrl', function($scope, $rootScope, $state, $timeout, errorModal, Version) {
	$scope.timedLoading = false;
	$scope.loading = false;
	$scope.version = Version.query();

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

		errorModal((cause && cause.data && cause.data.error && cause.data.error.message) || JSON.stringify(cause), {
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
.config(function ($urlRouterProvider, $locationProvider) {
	$urlRouterProvider.otherwise('/');
	$locationProvider.html5Mode(true);
})
.config(function (localStorageServiceProvider) {
	localStorageServiceProvider.setPrefix('registry-explorer');
})
.config(function ($resourceProvider) {
	$resourceProvider.defaults.stripTrailingSlashes = false;
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
)
.service('History', function(RegistryUrl, localStorageService, $location) {
	var history = localStorageService.get('history') || [$location.host() + ':5000'];
	var model = {
		last: _.last(history),
		all: history,
		add: function(registry) {
			var registryText = RegistryUrl.stringify(registry);
			var index = history.indexOf(registryText);
			if (index >= 0) {
				history.splice(index, 1);
			}
			history.push(registryText);
			localStorageService.set('history', history);
			model.last = registryText;
		},
	};
	return model;
});
