'use strict';

angular.module('registryExplorerApp')
.controller('ErrorCtrl', function ($scope, $modalInstance, text, showCancel) {
	$scope.text = text;
	$scope.showCancel = showCancel;

	$scope.tryAgain = function() {
		$modalInstance.close('tryAgain');
	};

	$scope.home = function() {
		$modalInstance.close('home');
	};

	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};
})
.service('errorModal', function($modal) {
	return function(text, config) {
		var hasCancel = !!config.onCancel;

		var modalInstance = $modal.open({
			templateUrl: 'components/error-modal/error.html',
			controller: 'ErrorCtrl',
			size: 'lg',
			resolve: {
				text: _.constant(text),
				showCancel: _.constant(hasCancel),
			}
		});

		modalInstance.result.then(
			function (stat) {
				if (stat === 'tryAgain') {
					config.onTryAgain();
				} else {
					config.onHome();
				}
			},
			hasCancel ? config.onCancel : config.onHome
		);
	};
});
