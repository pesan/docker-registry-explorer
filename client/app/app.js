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
.run(function($rootScope, $timeout, $state, errorModal, Version) {
	$rootScope.timedLoading = false;
	$rootScope.loading = false;
	$rootScope.version = Version.query();

	var beginLoading = function() {
		$rootScope.timedLoading = true;
		$timeout(function() {
			$rootScope.loading = $rootScope.timedLoading;
		}, 250);
	};

	var endLoading = function() {
		$rootScope.loading = $rootScope.timedLoading = false;
	};

	$rootScope.$on('$stateChangeStart', beginLoading);
	$rootScope.$on('$stateChangeSuccess', endLoading);
	$rootScope.$on('$stateChangeError', function(evt, toState, toArgs, fromState, fromArgs, response) {
		endLoading();

		errorModal((response.data && response.data.error && response.data.error.message) || JSON.stringify(response.data), {
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
.directive('focus',
    function($timeout) {
        return {
            scope: {
                focus: '='
            },
            link: function(scope, element) {
                if (scope.focus) {
                    $timeout(function() {
                        element[0].focus();
                    });
                }
            }
        };
    }
)
.service('History', function(RegistryUrl, localStorageService, localRegistry) {
	var history = localStorageService.get('history') || [ RegistryUrl.stringify(localRegistry) ];
	var model = {
		last: _.last(history),
		all: history,
		add: function(registry) {
			var url = RegistryUrl.stringify(registry);
			var index = history.indexOf(url);
			if (index >= 0) {
				history.splice(index, 1);
			}
			history.push(url);
			localStorageService.set('history', history);
			model.last = url;
		},
	};
	return model;
});
