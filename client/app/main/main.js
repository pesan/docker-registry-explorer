'use strict';

angular.module('registryExplorerApp')
.config(function ($stateProvider) {
	$stateProvider
		.state('main', {
			url: '/',
			templateUrl: 'app/main/main.html',
			controller: 'MainCtrl',
			resolve: {
				'history': function(History) {
					return History.all;
				}
			},
		});
});
