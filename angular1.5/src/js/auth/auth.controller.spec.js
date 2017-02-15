describe('AuthCtrl', function() {
	var User;
	var AuthCtrl;
	var $controller;
	var goodCredentials = { username: 'bob', password: 'todos'};
	var badCredentials = { username: 'bob', password: 'something'};
	var $rootScope;
	var $state;

	var mockAppConstants = {
			useSessionStorage: true,
			appName: 'AppName'
	};

	beforeEach(module('app.services'));
	beforeEach(module('ui.router'));
	beforeEach(module('app.auth'));

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
	
	beforeEach(inject(function(_$rootScope_) {
	  $rootScope = _$rootScope_;
	}));
	
	 beforeEach(inject(function(_$state_) {
		 $state = _$state_;
	     spyOn($state, 'go');
	 }));


	it('should exist', function() {
		var $scope = {};
		var controller = $controller('AuthCtrl', { $scope: $scope });
		expect(controller).toBeDefined();
	});

	it('submit form should succeed', function() {
		var $scope = {};
		var controller = $controller('AuthCtrl', { $scope: $scope });
		controller.formData = goodCredentials;
		controller.submitForm();
		$rootScope.$apply();
		expect($state.go).toHaveBeenCalledWith('app.home');
	});
	
	it('submit form should fail', function() {
		var $scope = {};
		var controller = $controller('AuthCtrl', { $scope: $scope });
		controller.formData = badCredentials;
		controller.submitForm();
		$rootScope.$apply();
		expect($state.go.calls.any()).toEqual(false);
		expect(controller.errors).toEqual('Username or password invalid');
	});
});
