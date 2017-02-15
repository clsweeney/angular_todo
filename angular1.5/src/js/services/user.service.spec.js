describe('User service', function() {
	var User;
	var credentials = { username: 'bob', password: 'varies'};
	var $rootScope;
	var $httpBackend;
	
	var mockAppConstants = {
			useSessionStorage: true
	};

	// Before each test load our api.users module
	beforeEach(angular.mock.module('app.services'));
	
	beforeEach(angular.mock.module('ui.router'));
	
	beforeEach(function () {
		  angular.mock.module(function ($provide) {
		    $provide.value('AppConstants', mockAppConstants);
		  });
	});

	// Before each test set our injected Users factory (_Users_) to our
	// local Users variable
	beforeEach(inject(function(_User_) {
		User = _User_;
	}));
	
	beforeEach(inject(function(_$rootScope_) {
		  $rootScope = _$rootScope_;
	}));
	
	 beforeEach(inject(function(_$state_) {
		 $state = _$state_;
	     spyOn($state, 'go');
	 }));
	 
	 beforeEach(inject(function(_$httpBackend_) {
		  $httpBackend = _$httpBackend_;
	}));
	
	// A simple test to verify the Users factory exists
	it('should exist', function() {
		expect(User).toBeDefined();
	});
	
	it('should have an attemptAuth method', function() {
		expect(User.attemptAuth).toBeDefined();
	});
	
	it('should fail if invalid password is passed', function() {
		credentials.password = 'invalid';
		User.attemptAuth('dontCare', credentials);
		expect(User.current).toBe(undefined);
	});
	
	it('should succeed if valid password is passed', function() {
		credentials.password = 'todos';
		User.attemptAuth('dontCare', credentials);
		expect(User.current).toBeDefined();
		expect(User.current.username).toBe('bob');
	});
	
	it('should allow logout', function() {
		//pending();
		$httpBackend
	    .when('POST', 'logout')
	    .respond(200, {
	        status: "success"
	    });
		
		credentials.password = 'todos';
		User.attemptAuth('dontCare', credentials);
		User.logout();
		$httpBackend.flush();
		expect(User.current).toBe(undefined);
		expect($state.go).toHaveBeenCalledWith('app.login', null, Object({ reload: true }));
	});
});
