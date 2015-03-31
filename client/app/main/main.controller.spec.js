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
			officialRegistry: { protocol: 'https', hostname: 'official.registry.com', port: 443 },
			history: history,
			localRegistry: { protocol: 'http', hostname: 'localhost', port: 80 },
		});
	}));

	it('should initialize', function () {
		expect(scope.history).to.equal(history);
		expect(scope.localRegistry).to.eql({ protocol: 'http', hostname: 'localhost', port: 80 });
		expect(scope.officialRegistry).to.eql({ protocol: 'https', hostname: 'official.registry.com', port: 443 });
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
