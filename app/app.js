'use strict';

var app = angular.module('myApp', ['ngCkeditor']);


app.controller("MainCtrl", ["$scope", function($scope){
  $scope.content = "<p> this is internal text set programmatically </p>";
}]);
