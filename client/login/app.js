/// <reference path="../typings/angular.d.ts" />
/// <reference path="../typings/angular-ui-router.d.ts" />

angular.element(document).ready(function () {
    angular.bootstrap(document.getElementById("app-login"), ["app.login"]);
});
angular.module("app.login", ["app", "ui.router"])
    .config(["$stateProvider", "$urlRouterProvider", "$httpProvider",
        function ($stateProvider, $urlRouterProvider, $httpProvider) {
            $httpProvider.interceptors.push("authInterceptor");
            //$httpProvider.defaults.withCredentials = true;

            //$locationProvider.html5Mode(true);
            $stateProvider
                .state("login", {
                    url: "/login",
                    templateUrl: "/login/login",
                    controller: "LoginController as vm",
                })
                .state("register", {
                    url: "/register",
                    templateUrl: "/login/register",
                    controller: "RegisterController as vm",
                })
                .state("find", {
                    url: "/find",
                    templateUrl: "/login/find",
                    controller: "FindController as vm",
                });
            //$urlRouterProvider.when("", "/login");
            //$urlRouterProvider.when("/", "/login");
            $urlRouterProvider.otherwise("/login");
        }]);