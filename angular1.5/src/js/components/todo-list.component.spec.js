describe('component: TodoListCtrl', function() {
	var $controller;
	var $componentController;
	var User;
	var Todos;
	var $rootScope;

	var mockAppConstants = {
			useSessionStorage: true,
			appName: 'AppName'
	};
	
	var mockUser = {
			current: {username: 'chris'}
	}

	beforeEach(module('app.services'));
	beforeEach(module('ui.router'));
	beforeEach(module('app.components'));

	beforeEach(function () {
		angular.mock.module(function ($provide) {
			$provide.value('AppConstants', mockAppConstants);
			$provide.value('User', mockUser);
		});
	});

	beforeEach(inject(function(_Todos_) {
		Todos = _Todos_;
	}));

//	beforeEach(inject(function(_User_) {
//		User = _User_;
//	}));

	beforeEach(inject(function(_$rootScope_) {
		$rootScope = _$rootScope_;
	}));

	beforeEach(inject(function(_$componentController_) {
		$componentController = _$componentController_;
	}));


	it('should expose a list of todos', function() {
		var $scope = {
				$on: function(event, callback) {
					//do nothing
				}
		};
		var ctrl = $componentController('todoList', {$scope: $scope});
		ctrl.updateTodoList();
		$rootScope.$apply();

		expect(ctrl.list).toBeDefined();
		expect(ctrl.list.length).toBeGreaterThan(0);
	});
	
	it('should add a todo to list', function() {
		var $scope = {
				$on: function(event, callback) {
					//do nothing
				}
		};
		var ctrl = $componentController('todoList', {$scope: $scope});
		ctrl.updateTodoList();
		$rootScope.$apply();
		var currentLength = ctrl.list.length;
		ctrl.addTodo('test todo');
		$rootScope.$apply();
		
		expect(ctrl.list.length).toBe(currentLength + 1);
	});
});
