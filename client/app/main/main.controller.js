'use strict';

angular.module('registryExplorerApp')
.controller('MainCtrl', function (RegistryUrl, OfficialRepository, $scope, $state, host, history) {
	$scope.host = host;
	$scope.history = history;
	$scope.official = OfficialRepository;

	$scope.toRegistry = RegistryUrl.parse;

	$scope.browse = function(registryUrl) {
		if (!registryUrl) {
			return;
		}

		$scope.history.add(registryUrl);
		$state.go('browse', $scope.toRegistry(registryUrl));
	};
});
