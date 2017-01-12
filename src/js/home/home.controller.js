class HomeCtrl {
  constructor(User, AppConstants, $scope) {
    'ngInject';

    this.appName = AppConstants.appName;
    this._$scope = $scope;
    this.newTodo = '';
  }
  
  addTodo() {
	  this.changeList(this.newTodo);
  }

  changeList(newList) {
    this._$scope.$broadcast('addTodo', newList);
    this.newTodo = '';
  }
}

export default HomeCtrl;
