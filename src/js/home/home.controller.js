class HomeCtrl {
  constructor(User, AppConstants, $scope) {
    'ngInject';
    
    this._User = User;
    this.appName = AppConstants.appName;
    this._$scope = $scope;
    this.newTodo = '';
  }
  
  addTodo() {
	  this.changeList(this.newTodo);
  }
  
  logout() {
	  console.log("Would logout");
	  this._User.logout();
  }

  changeList(newList) {
    this._$scope.$broadcast('addTodo', newList);
    this.newTodo = '';
  }
}

export default HomeCtrl;
