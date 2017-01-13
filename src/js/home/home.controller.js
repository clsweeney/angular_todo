class HomeCtrl {
	constructor(User, AppConstants, $scope) {
		'ngInject';

		this._User = User;
		this.appName = AppConstants.appName;
		this._$scope = $scope;
		this.newTodo = '';
	}

	addTodo() {
		this._$scope.$broadcast('addTodo', this.newTodo);
		this.newTodo = '';
	}

	logout() {
		this._User.logout();
	}
	
	username() {
		return this._User.current.username;
	}
}

export default HomeCtrl;
