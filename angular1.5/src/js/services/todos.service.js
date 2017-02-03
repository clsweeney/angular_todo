export default class Todos {
	constructor(AppConstants, User, $http, $q, $window) {
		'ngInject';

		this._AppConstants = AppConstants;
		this._User = User;
		this._$http = $http;
		this._$q = $q;
		this._$window = $window;

		this._allTodos;

		if (this._AppConstants.useSessionStorage) {
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
	}

	query(config) {
		if (this._AppConstants.useSessionStorage) {
			// normally this is where a request would be created, etc.
			// However, for this exercise we will use browser sessionStorage.
			// Simulate $http get with a deferred...
			let deferred = this._$q.defer();
			deferred.resolve(this._allTodos.filter((elem) => { 
				if (this._User && this._User.current)
					return elem.createdBy == this._User.current.username;
				else {
					return true;
				}
			}));

			return deferred.promise;
		}
		else {
			return this._$http.get('/todos');
		}
	}

	save(todoValue) {
		if (this._AppConstants.useSessionStorage) {
			let maxId = -1;
			this._allTodos.forEach((elem) => {
				maxId = maxId < elem.id ? elem.id : maxId;
			});
			this._allTodos.unshift({ id:maxId + 1, value: todoValue, createdBy: this._User.current.username });
			this._$window.sessionStorage.setItem('todos', JSON.stringify(this._allTodos));
			return this.query();
		} else {
			return this._$http.post("/todo/", todoValue);
		}
	}

	deleteTodo(todo) {
		if (this._AppConstants.useSessionStorage) {
			this._allTodos = this._allTodos.filter((elem) => { 
				return elem.id != todo.id; 
			});
			this._$window.sessionStorage.setItem('todos', JSON.stringify(this._allTodos));
			return this.query();
		} else {
			return this._$http.delete("/todo/" + todo.id, todo);
		}
	}
	
	updateTodo(todo) {
		if (this._AppConstants.useSessionStorage) {
			this._allTodos.some((elem) => { 
				if (elem.id === todo.id) {
					elem.value = todo.value;
					return true;
				} 
			});
		this._$window.sessionStorage.setItem('todos', JSON.stringify(this._allTodos));
		} else {
			this._$http.put("/todo/" + todo.id);
		}
	}
}
