'use strict';

angular.module('registryExplorerApp')
.controller('MainCtrl', function ($scope, $state, host, history) {
	$scope.host = host;
	$scope.history = history;

	$scope.browse = function(registryUrl) {
		if (!registryUrl) {
			return;
		}

		$scope.history.add(registryUrl);
		$state.go('browse', { host: registryUrl });
	};
});
