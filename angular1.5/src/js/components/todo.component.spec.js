describe('component: TodoCtrl', function() {
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
		spyOn(Todos, 'deleteTodo').and.callThrough();
		spyOn(Todos, 'updateTodo');
	}));


	beforeEach(inject(function(_$rootScope_) {
		$rootScope = _$rootScope_;
	}));

	beforeEach(inject(function(_$componentController_) {
		$componentController = _$componentController_;
	}));


	it('should expose value', function() {
		var $scope = {};
		var bindings = {id:1, value:'do this', createdBy: 'chris'};
		var ctrl = $componentController('todo', {$scope: $scope}, bindings);

		expect(ctrl.value).toBeDefined();
		expect(ctrl.value).toBe('do this');
	});
	
	it('should perform update', function() {
		var $scope = {};
		var bindings = {id:1, value:'do this', createdBy: 'chris'};
		var ctrl = $componentController('todo', {$scope: $scope}, bindings);

		expect(ctrl.editFlag).toBe(false);
		ctrl.editTodo();
		expect(ctrl.editFlag).toBe(true);
		ctrl.todo = {id:1, value:'updated todo', createdBy: 'chris'};
		ctrl.updateTodo();
		
		expect(ctrl.value).toBe('do this');
		expect(ctrl.editFlag).toBe(false);
		expect(Todos.updateTodo).toHaveBeenCalledWith({id:1, value:'updated todo', createdBy: 'chris'});
		
	});
	
	it('should perform delete', function() {
		var $scope = {};
		var bindings = {id:1, value:'do this', createdBy: 'chris'};
		var ctrl = $componentController('todo', {$scope: $scope}, bindings);

		ctrl.todo = {id:1, value:'do this', createdBy: 'chris'};
		ctrl.deleteTodo();
		
		expect(Todos.deleteTodo).toHaveBeenCalledWith({id:1, value:'do this', createdBy: 'chris'});
		
	});
});
