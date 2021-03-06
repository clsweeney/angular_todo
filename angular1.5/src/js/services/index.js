import angular from 'angular';

//Create the module where our functionality can attach to
let servicesModule = angular.module('app.services', []);

import UserService from './user.service';
servicesModule.service('User', UserService);

import TodoService from './todos.service';
servicesModule.service('Todos', TodoService);

import VersionInfoService from './version.info.service';
servicesModule.service('VersionInfo', VersionInfoService);

export default servicesModule;