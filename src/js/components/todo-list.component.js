class TodoListCtrl {
  constructor($scope) {
  'ngInject';

  this.setListTo(this.listConfig);


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
	  this.list.push({ id:0, value: todoValue});
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
	 
	 this.list = [ 
	               {id:1, value:'do this'},
	               {id:2, value:'then this'} 
	             ];
 }

}

let TodoList = {
  controller: TodoListCtrl,
  templateUrl: 'components/todo-list.html'
};

export default TodoList;
