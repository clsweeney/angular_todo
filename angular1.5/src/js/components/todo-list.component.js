class TodoListCtrl {
	constructor(User, Todos, $scope, $state) {
		'ngInject';

		this._Todos = Todos;
		this._$state = $state;


		this._User = User;
		if (!this.list) {
			this.updateTodoList();
		}

		$scope.$on('updateTodoView', (ev, notUsed) => {
			this.updateTodoList();
		});

		$scope.$on('addTodo', (ev, todoValue) => {
			this.addTodo(todoValue);
		});

		$scope.$on('todoDeleted', (ev, todoValue) => {
			this.updateTodoList(null);
		});

	}
	addTodo(todoValue) {
		this._Todos
		.save(todoValue)
		.then(
				(result) => {
					this.list = result.data ? result.data : result;
				});
	}

	updateTodoList() {
		this._Todos
		.query()
		.then(
				(result) => {
					this.list = result.data ? result.data : result;
				});
	}


}

let TodoList = {
		controller: TodoListCtrl,
		templateUrl: 'components/todo-list.html'
};

export default TodoList;
