'use strict';

angular.module('productsApp', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/products', {
            templateUrl: 'Products/products.html'

        });
    }])


    .controller('productsController', ['userService', 'productService', '$http','loginService', function (userService, productService, $http,loginService) {
        var reqUrl = "http://localhost:3100/musicalsInstruments/getAllProducts";
        var self = this;
        self.allCatrgories = productService.allCategory();
        self.isCategoryChoose = false;
        self.sortChoose = false;

        self.AllProduct = [];

        self.recomededProduct = [];   //only if logedIn
        self.products = [];


        self.loginService =loginService;
        self.userService = userService;
        self.searchProduct = "";
        self.showSerchProduct = false;

        self.searchInputIsDirty = function () {
            return self.searchProduct === "";
        };

        //buttun sort clicked
        self.sortChooseen = function () {
            self.sortChoose = true;

        };
        //get all products and push into products arr.
        self.getAllProduct = function () {
            //synchonize problem - need to return promise from server
            return new Promise(function (resolve, reject) {
                $http.get(reqUrl)
                    .then(function (response) {
                            console.log("**http Get!");
                            var productArr = response.data;
                            self.products = productArr;
                            self.productsByCategory = productArr;
                            console.log(productArr);
                            resolve();

                        }, function (reason) {
                            console.log(reason.message)
                            reject();
                        }
                    );
            });
        };

        //get all the recomended product
        self.getRecomendedProduct = function () {
            $http.post("http://localhost:3100/users/getMatchProduct",{mail: userService.userEmail})
                .then(function (response) {
                        console.log("**http Get!");
                        var productArr = response.data;
                        if (productArr.includes("There is no such a user or No match product for you !"))
                            self.recomededProduct=[];
                       else
                           self.recomededProduct = productArr;
                        console.log(productArr);

                    }, function (reason) {
                        console.log(reason.message)

                    }
                );
        };

        self.getAllProduct()
            .then(self.getRecomendedProduct);
        self.productCat = [];

        self.selctedCategory = function (category) {
            self.isCategoryChoose = true;
            self.selectedCat = {Category: category};
            $http.post("http://localhost:3100/musicalsInstruments/getProductByCategory", self.selectedCat)
                .then(function (response) {
                        console.log("**http Get!");
                        var productArr = response.data;
                        self.productsByCategory = productArr;
                        console.log(productArr);
                    }, function (reason) {
                        console.log(reason.message)
                    }
                )
        }
        //categories sorter:
    }]);