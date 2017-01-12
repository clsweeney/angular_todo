import angular from 'angular';

let componentsModule = angular.module('app.components', []);

import Todo from './todo.component';
componentsModule.component('todo', Todo);

import TodoCtrl from './todo.component';
componentsModule.controller('TodoCtrl', TodoCtrl);

import TodoList from './todo-list.component';
componentsModule.component('todoList', TodoList);


export default componentsModule;
