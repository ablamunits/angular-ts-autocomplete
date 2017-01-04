///<reference path="../typings/index.d.ts" />

require('angular');
require('angular-ui-router');

import {GithubServiceProvider} from './github-rep.srv';
import {autocompleteInputDirectiveFactory} from './components/autocomplete-input/autocomplete-input.drv';
import {MainPageController} from './pages/main.ctrl';

const MainApp: ng.IModule = angular.module('MainApp', ['ui.router']);

MainApp.service('GithubRepositoryService', GithubServiceProvider);
MainApp.controller('mainPageController', MainPageController);
MainApp.directive('autocompleteInput', autocompleteInputDirectiveFactory);

MainApp.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
	$urlRouterProvider.otherwise('/');
	$stateProvider
	.state('app', {
		url: '/',
		templateUrl: 'pages/main.tpl.html',
		controller: 'mainPageController as ctrl',
	});
});
