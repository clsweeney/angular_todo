class TodoListCtrl {
  constructor(User, $scope, $state, $window) {
  'ngInject';
  
  this._$state = $state;
  this._$window = $window;
  this._allTodos = [];
  
  if (!User.current) {
	  this._$state.go('app.login');
  }
  else {
	  this._User = User;
	  if (!this.list) {
		  this.setListTo(this.listConfig);
	  }



	  $scope.$on('setListTo', (ev, newList) => {
		  this.setListTo(newList);
	  });

	  $scope.$on('addTodo', (ev, todoValue) => {
		  this.addTodo(todoValue);
	  });

	  $scope.$on('deleteTodo', (ev, todo) => {
		  this.deleteTodo(todo);
	  });

	  $scope.$on('setPageTo', (ev, pageNumber) => {
		  this.setPageTo(pageNumber);
	  });
  }

}
	
//  constructor(Todos, $scope) {
//    'ngInject';
//
//    this._Todos = Todos;
//
//    this.setListTo(this.listConfig);
//
//
//    $scope.$on('setListTo', (ev, newList) => {
//      this.setListTo(newList);
//    });
//
//    $scope.$on('setPageTo', (ev, pageNumber) => {
//      this.setPageTo(pageNumber);
//    });
//
//  }

  setListTo(newList) {
    // Set the current list to an empty array
    this.list = [];

    // Set listConfig to the new list's config
    this.listConfig = newList;

    this.runQuery();
  }

  setPageTo(pageNumber) {
    this.listConfig.currentPage = pageNumber;

    this.runQuery();
  }
  
  addTodo(todoValue) {
	  this._allTodos.push({ id:0, value: todoValue, createdBy: this._User.current.username });
	  this._$window.sessionStorage.setItem('todos', JSON.stringify(this._allTodos));
	  this.list = this._allTodos.filter((elem) => { 
  	 	return elem.createdBy == this._User.current.username; 
  	 });
  }
  
  deleteTodo(todo) {
	  console.log("here again...");
  }



 runQuery() {
//    // Show the loading indicator
//    this.loading = true;
//
//    // Create an object for this query
//    let queryConfig = {
//      type: this.listConfig.type,
//      filters: this.listConfig.filters || {}
//    };
//
//    // Set the limit filter from the component's attribute
//    queryConfig.filters.limit = this.limit;
//
//    // If there is no page set, set page as 1
//    if (!this.listConfig.currentPage) {
//      this.listConfig.currentPage = 1;
//    }
//
//    // Add the offset filter
//    queryConfig.filters.offset = (this.limit * (this.listConfig.currentPage - 1));
//
//    // Run the query
//    this._Articles
//      .query(queryConfig)
//      .then(
//        (res) => {
//          this.loading = false;
//
//          // Update list and total pages
//          this.list = res.articles;
//
//          this.listConfig.totalPages = Math.ceil(res.articlesCount / this.limit);
//        }
//      );
//  }
	 
	 if (typeof(Storage) !== "undefined") {
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
	 
	 this.list = this._allTodos.filter((elem) => { 
	            	 	return elem.createdBy == this._User.current.username; 
	            	 });
	 
 }
 	

}

let TodoList = {
  controller: TodoListCtrl,
  templateUrl: 'components/todo-list.html'
};

export default TodoList;
