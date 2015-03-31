'use strict';

angular.module('registryExplorerApp')
.controller('MainCtrl', function ($scope, $state, RegistryUrl, officialRegistry, localRegistry, history) {
	$scope.history = history;
	$scope.officialRegistry = officialRegistry;
	$scope.localRegistry = localRegistry;

	$scope.browse = function(registryUrl) {
		if (!registryUrl) {
			return;
		}

		$state.go('browse.list', RegistryUrl.parse(registryUrl));
	};
});
