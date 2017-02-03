describe('User service', function() {
	var User;
	var credentials = { username: 'bob', password: 'varies'};

	// Before each test load our api.users module
	beforeEach(angular.mock.module('app.services'));
	
	beforeEach(angular.mock.module('ui.router'));

	// Before each test set our injected Users factory (_Users_) to our
	// local Users variable
	beforeEach(inject(function(_User_) {
		User = _User_;
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
		expect(User.current).toBe(null);
	});
	
	it('should succeed if valid password is passed', function() {
		credentials.password = 'todos';
		User.attemptAuth('dontCare', credentials);
		expect(User.current).toBeDefined();
		expect(User.current.username).toBe('bob');
	});
	
	it('should allow logout', function() {
		pending();
		credentials.password = 'todos';
		User.attemptAuth('dontCare', credentials);
		User.logout();
		expect(User.current).toBeDefined();
		expect(User.current.username).toBe('bob');
	});
});
