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
			history: history,
			host: 'localhost',
		});
	}));

	it('should initialize history and host', function () {
		expect(scope.history).to.equal(history);
		expect(scope.host).to.eql('localhost');
	});

	it('should add browsed host to history', function () {
		scope.browse('newhost:1000');
		expect(history.add).to.have.been.calledWith('newhost:1000');
	});

	it('should change state to browse', function () {
		scope.browse('newhost:1000');
		expect(state.go).to.have.been.calledWith('browse', { host: 'newhost:1000'});
	});
});
