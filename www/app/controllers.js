'use strict';

angular.module('myApp.controllers', ['fhcloud'])

.controller('MainCtrl', function($log, $q, fhcloud) {
this.todos=[];
this.getTodos = function() {
	var self = this;
	var d = $q.defer();
	var promise = d.promise;
	promise.then(function(response) {
		if (response!== null) {
			self.todos = response;
			$log.debug("getTodos response",self.todos);
		} else {
			alert("Error 1");
			$log.debug("Error 1");
		}
		
	}, function(err) {
		alert("Error 2 :"+JSON.stringify(err));
	});
	
	fhcloud.cloud({
		"path": "/todo",
		"method": "GET",
		"data": {}
	}, d.resolve, d.reject);
}

this.saveTodoItem = function(todoItem) {
	var self = this;
	var d = $q.defer();
	var promise = d.promise;
	
	promise.then(function(response) {
		if (response!== null) {
			self.todos = response;
			$log.debug("saveTodoItem response",self.todos);
		} else {
			alert("Error 4");
			$log.debug("Error 4");
		}
		
	}, function(err) {
		alert("Error 5 :"+JSON.stringify(err));
	});
	
	fhcloud.cloud({
		"path": "/todo",
		"method": "POST",
		"data": {
			"taskToSave": todoItem.data
		}
	}, d.resolve, d.reject);
}

this.completeTodoItem = function(index) {
	var self = this;
	var taskToComplete = this.todos[index];
	var d = $q.defer();
	var promise = d.promise;
	
	promise.then(function(response) {
		if (response!== null) {
			self.todos = response;
			$log.debug("completeTodoItem response",self.todos);
		} else {
			alert("Error 8");
			$log.debug("Error 8");
		}
		
	}, function(err) {
		alert("Error 9 :"+JSON.stringify(err));
	});
	
	fhcloud.cloud({
		"path": "/todo",
		"method": "PUT",
		"data": {
			"taskToComplete": taskToComplete
		}
	}, d.resolve, d.reject);
}

this.deleteTodoItem = function(index) {
	var self = this;
	var taskId = this.todos[index].uid;
	var d = $q.defer();
	var promise = d.promise;
	
	promise.then(function(response) {
		if (response!== null) {
			self.todos = response;
			$log.debug("deleteTodoItem response",self.todos);
		} else {
			alert("Error 8");
			$log.debug("Error 8");
		}
		
	}, function(err) {
		alert("Error 9 :"+JSON.stringify(err));
	});
	
	fhcloud.cloud({
		"path": "/todo",
		"method": "DELETE",
		"data": {
			"taskId": taskId
		}
	}, d.resolve, d.reject);
}

this.updateIncomplete = function() {
	return this.todos.filter(function(item) {
		return !item.data.complete;
	}).length;
};

this.onSubmit = function(event) {
	if (this.label.length) {
		var newTask = {
			data: {
				label: this.label,
				complete: false,
				date: new Date()
			}
		};
		this.saveTodoItem(newTask);
		this.label = '';
	}
	event.preventDefault();
}

  $log.debug('MainCtrl', this);
});

