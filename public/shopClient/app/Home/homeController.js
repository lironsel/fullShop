'use strict';

angular.module('homeApp', ['ngRoute','ui.bootstrap'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'Home/home.html'
  });
}])

.controller('homeCtrl', ['userService','productService','productDetailsService','$http','$location','$uibModal', 'loginService', function(userService,productService,productDetailsService,$http,$location,$uibModa,loginService) {

    var reqUrl = "http://localhost:3100/musicalsInstruments/getTop5Products";

    var self = this;
    self.top5Products = [];
    self.lastestProduct = [];
    self.userService = userService;
    self.loginService= loginService;


    self.getTop5Product =function() {
        //synchonize problem - need to return promise from server
        return new Promise(function (resolve, reject) {
        $http.get(reqUrl)
            .then(function (response) {
                    var productArr = response.data;
                    self.top5Products = productArr;
                    console.log(productArr);
                    resolve();

                }, function (reason) {
                    console.log(reason.message)
                reject();
                }
            )
        });
    };

    self.getLatestProduct =function() {
        $http.get("http://localhost:3100/musicalsInstruments/latestProducts")
            .then(function (response) {
                    var productArr = response.data;
                    self.lastestProduct = productArr;
                    console.log(productArr);

                }, function (reason) {
                    console.log(reason.message)
                }
            )
    };

    self.getTop5Product()
        .then(self.getLatestProduct);


    self.showDetails = function (product) {
        productDetailsService.productDetails(product);

    }



}]);