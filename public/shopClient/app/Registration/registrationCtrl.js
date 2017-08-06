'use strict';

angular.module('registrationApp', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/registration', {
            templateUrl: 'Registration/registration.html'
        });
    }])

    .controller('registerController', ['userService', '$http','$location', '$window','DataSource','loginService', function(userService, $http,$location, $window, DataSource,loginService) {
        var registerUrl = "http://localhost:3100/users/registerUser";
        var c = this;
        c.logedIn = "";
        c.countries = [];
        var countries =[];
        c.countries = countries;
        c.mail = "";
        c.password = "";
        c.fName = "";
        c.lName = "";
        c.phone = "";
        c.cellular = "";
        c.addr = "";
        c.city = "";
        c.country = "";
        c.creditCardNum = "";
        c.isAdmin = 0;
        c.interest_types = "";
        c.school = "";
        c.firstPet = "";
        c.response = "";

        c.register = function () {
            var inData = {
                "mail": c.mail,
                "pass": c.password,
                "fName": c.fName,
                "lName": c.lName,
                "phone": c.phone,
                "cellular": c.cellular,
                "addr": c.addr,
                "city": c.city,
                "country": c.country.Name,
                "creditCardNum": c.creditCardNum,
                "isAdmin": c.isAdmin,
                "interest_types": c.interest_types.toString(),
                "school": c.school,
                "firstPet": c.firstPet
            };
            $http.post(registerUrl, inData)
                .then(function (response) {
                        var res = response.data;
                        c.response = res;
                        if(c.response.includes("already used!"))
                            alert(res);
                        loginService.loginModal();
                    }, function (reason) {
                        c.response = "error is " + reason.message;
                        alert(c.response);
                    }
                )

        };

        var SOURCE_FILE = "files/countries.xml";
        var xmlTransform = function (data) {
            console.log("transform data");
            var x2js = new X2JS();
            var json = x2js.xml_str2json(data);
            console.log(json);
            return json.Countries;

        };
        var setData = function (data) {
            console.log("setData", data);
            c.countries = data;
            c.dataSet = data;
        };
        DataSource.get(SOURCE_FILE, setData, xmlTransform);
    }]);
