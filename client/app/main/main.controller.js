'use strict';

angular.module('registryExplorerApp')
.controller('MainCtrl', function (RegistryUrl, officialHostname, $scope, $state, host, history) {
	$scope.host = host;
	$scope.history = history;
	$scope.official = officialHostname;

	$scope.toRegistry = RegistryUrl.parse;

	$scope.browse = function(registryUrl) {
		if (!registryUrl) {
			return;
		}

		$state.go('browse.list', $scope.toRegistry(registryUrl));
	};
});
