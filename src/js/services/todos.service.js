export default class Todos {
	constructor(AppConstants, User, $http, $q, $window) {
		'ngInject';

		this._AppConstants = AppConstants;
		this._User = User;
		this._$http = $http;
		this._$q = $q;
		this._$window = $window;

		this._allTodos;

		if (typeof(Storage) !== "undefined" && !this._allTodos) {
			let storedTodos = this._$window.sessionStorage.getItem('todos');
			if (storedTodos) {
				this._allTodos = JSON.parse(storedTodos);
			}
			else {
				this._allTodos = [ 
				                  {id:1, value:'do this', createdBy: 'chris'},
				                  {id:2, value:'then this', createdBy: 'bob'} 
				                  ];
				this._$window.sessionStorage.setItem('todos', JSON.stringify(this._allTodos));
			}
		}
	}

	query(config) {
		// normally this is where a request would be created, etc.
		// However, for this exercise we will use browser sessionStorage.
		// Simulate $http get with a deferred...
		let deferred = this._$q.defer();
		deferred.resolve(this._allTodos.filter((elem) => { 
			return elem.createdBy == this._User.current.username; 
		}));

		return deferred.promise;
	}

	save(todoValue) {
		let maxId = -1;
		this._allTodos.forEach((elem) => {
			maxId = maxId < elem.id ? elem.id : maxId;
		});
		this._allTodos.push({ id:maxId + 1, value: todoValue, createdBy: this._User.current.username });
		this._$window.sessionStorage.setItem('todos', JSON.stringify(this._allTodos));
		return this.query();
	}

	deleteTodo(todo) {
		this._allTodos = this._allTodos.filter((elem) => { 
			return elem.id != todo.id; 
		});
		this._$window.sessionStorage.setItem('todos', JSON.stringify(this._allTodos));
		return this.query();
	}
}
