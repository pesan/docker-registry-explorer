'use strict';

angular.module('registryExplorerApp')
.config(function ($stateProvider) {
	$stateProvider
		.state('main', {
			url: '/',
			templateUrl: 'app/main/main.html',
			controller: 'MainCtrl',
			resolve: {
				'host': function($location) {
					return $location.host();
				},
				'history': function(History) {
					return History.all;
				}
			},
		});
});
