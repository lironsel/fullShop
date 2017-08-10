'use strict';

angular.module('myLoginApp', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/loginModal', {
            controller: 'loginController'
        });
    }])


    .controller('loginController', ['$http', 'loginService', 'userService', '$scope', '$uibModalInstance', function ($http, loginService, userService, $scope, $uibModalInstance) {
        var self = this;
        self.loginService = loginService;
        self.loginService = userService;
        //self.logIn = userService.logIn();
        $scope.hasPasswordRestore = false;
        $scope.user = {
            mail: '',
            pass: ''
        };
        $scope.logIn = function (valid) {
            if (valid) {
                userService.login($scope.user)
                    .then(function (succes) {

                            $scope.close();
                            $scope.response = succes.data;
                        }, function (error) {
                            self.response = error.message;
                            alert('Login failed!');
                        }
                    )
            }
        }

        $scope.forgetUser = {
            mail: '',
            school: '',
            firstPet: ''
        };

        $scope.restorePassword = function (valid) {
            if (valid) {
                $http.post('http://localhost:3100/users/verifyUserAndRestorePass', $scope.forgetUser)
                    .then(function (response) {
                            var res = response.data;
                            $scope.restoredPass = res[0].Password;
                            console.log(res[0].Password);
                            console.log($scope.restoredPass);
                            $scope.hasPasswordRestore = true;

                        }, function (reason) {
                            $scope.restoredPass = "error is " + reason.message;
                            console.log(reason);
                        }
                    )
            }
        }

        $scope.close = function () {
            $uibModalInstance.close();

        }

        $scope.getRestoredPassword = function () {
            if ($scope.restoredPass)
                return "Your password is: "+$scope.restoredPass;
            else {
                return "Wrong answers or email, please try again";
            }
        }
    }])