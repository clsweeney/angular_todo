class TodoCtrl {
	constructor(Todos, $scope, $state) {
		'ngInject';
		this._Todos = Todos;
		this._$scope = $scope;
		this._$state = $state;

		this.editFlag = false;
		this.notUsed = false;
	}

	deleteTodo() {
		this._Todos.deleteTodo(this.todo)
		.then( (result) => {
			this._$scope.$emit('todDeleted');
		});
		this.notUsed = false;
	}

	editTodo() {
		this.editFlag = true;
	}

	updateTodo() {
		this._Todos.updateTodo(this.todo);
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
