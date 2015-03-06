'use strict';

describe('Controller: MainCtrl', function () {
	beforeEach(module('registryExplorerApp'));

	var MainCtrl;
	var scope;
	var state;
	var history;

	beforeEach(inject(function ($controller, $rootScope) {
		scope = $rootScope.$new();
		state = {
			go: sinon.spy(),
		};

		history = ['localhost:4000', 'external:5000'];
		history.add = sinon.spy();

		MainCtrl = $controller('MainCtrl', {
			$scope: scope,
			$state: state,
			officialHostname: 'official.registry.com',
			history: history,
			host: 'localhost',
		});
	}));

	it('should initialize', function () {
		expect(scope.history).to.equal(history);
		expect(scope.host).to.eql('localhost');
		expect(scope.official).to.eql('official.registry.com');
	});

	it('should add browsed host to history', function () {
		scope.browse('newhost:1000');
		expect(history.add).to.have.been.calledWith('newhost:1000');
	});

	it('should change state to browse', function () {
		scope.browse('https://registry.example.com:8443');
		expect(state.go).to.have.been.calledWith('browse.list', {
			protocol: 'https',
			hostname: 'registry.example.com',
			port: 8443
		});
	});
});
