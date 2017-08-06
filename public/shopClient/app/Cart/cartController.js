/**
 * Created by windows on 25/06/2017.
 */
'use strict';

angular.module('cartApp', ['ngRoute','ui.bootstrap'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/cart', {
            templateUrl: 'Cart/cart.html'
        });
    }])

    .controller('cartController', ['productService','cartService','productDetailsService','$http','$location','$uibModal', function(productService,cartService,productDetailsService,$http,$location,$uibModal) {

        var self = this;
        self.cartService = cartService;
        self.totalPrice = cartService.getTotalPrice();
        self.productDetailsService = productDetailsService;
        self.goToProductPage= function()
        {
            $location.path('products');
        }

    }]);

