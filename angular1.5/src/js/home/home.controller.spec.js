describe('HomeCtrl', function() {
	var User;
	var HomeCtrl;
	var $controller;

	var mockAppConstants = {
			useSessionStorage: true,
			appName: 'AppName'
	};

	beforeEach(module('app.services'));
	beforeEach(module('ui.router'));
	beforeEach(module('app.home'));

	beforeEach(function () {
		angular.mock.module(function ($provide) {
			$provide.value('AppConstants', mockAppConstants);
		});
	});

	beforeEach(inject(function(_User_) {
		User = _User_;
	}));

	beforeEach(inject(function(_$controller_) {
		$controller = _$controller_;
	}));

	it('should exist', function() {
		var $scope = {};
		var controller = $controller('HomeCtrl', { $scope: $scope });
		expect(controller).toBeDefined();
	});

	it('application name should be set', function() {
		var $scope = {};
		var controller = $controller('HomeCtrl', { $scope: $scope });
		expect(controller.appName).toBe('AppName');
	});

	it('initial todo should exist and is empty', function() {
		var $scope = {};
		var controller = $controller('HomeCtrl', { $scope: $scope });
		expect(controller.newTodo).toBeDefined();
		expect(controller.newTodo).toBe('');
	});

	it('username should not throw an error', function() {
		var $scope = {};
		var controller = $controller('HomeCtrl', { $scope: $scope });
		expect(controller.username()).toBeDefined();
		expect(controller.username()).toBe('');
	});

	it('adding a todo should broadcast correctly', function() {

		var $scope = {
				$broadcast: function(event, value){
					//do nothing...
				}
		};
		spyOn($scope, '$broadcast');

		var controller = $controller('HomeCtrl', { $scope: $scope });
		controller.newTodo = 'test todo';
		controller.addTodo();

		expect($scope.$broadcast).toHaveBeenCalledWith('addTodo', 'test todo');
		expect(controller.newTodo).toBe('');
	});

	it('logout should not throw an error', function() {
		var $scope = {};
		var controller = $controller('HomeCtrl', { $scope: $scope });
		controller.logout();
	});

});
