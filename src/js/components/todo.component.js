class TodoCtrl {
	constructor(Todos, $scope, $state) {
		'ngInject';
		this._Todos = Todos;
		this._$scope = $scope;
		this._$state = $state;

		this.editFlag = false;
	}

	deleteTodo() {
		this._Todos.deleteTodo(this.todo)
		.then( (result) => {
			this._$scope.$emit('todDeleted');
		});
	}

	editTodo() {
		this.editFlag = true;
	}

	updateTodo() {
		this.editFlag = false;
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
