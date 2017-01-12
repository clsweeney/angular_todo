class TodoCtrl {
  constructor($scope) {
	  'ngInject';
	  this._$scope = $scope;
  }
  
  deleteTodo() {
	  console.log('~~~~~~~ Here');
	  this._$scope.$broadcast('deleteTodo', this.todo);
  }
}

let Todo = {
  bindings: {
    todo: '='
  },
  controller: TodoCtrl,
  controllerAs: '$ctrl',
  templateUrl: 'components/todo.html'
};

export default Todo;
