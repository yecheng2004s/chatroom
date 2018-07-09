/// <reference path="../../typings/angular.d.ts" />

angular.module("app")
    .factory("authInterceptor", ["$q", "$injector", "$localStorage", "$rootScope", "$state",
        function ($q, $injector, $localStorage, $rootScope, $state) {
            var isRouteUrl = function (url) {
                var states = $state.router.stateRegistry.states;
                for (var x in states) {
                    var routeToUrl = states[x].self.templateUrl;
                    if (routeToUrl == url) {
                        return true;
                    }
                }
                return false;
            };
            return {
                request: function (config) {
                    console.log("=========request========:" + config.url);
                    if (isRouteUrl(config.url)) {
                        $rootScope.$emit("beginRoute");
                    }

                    config.headers["X-Requested-With"] = "XMLHttpRequest";
                    if ($localStorage.token) {
                        config.headers.Authorization = "Bearer " + $localStorage.token;
                    }
                    return config;
                },
                requestError: function (rejection) {
                    return $q.reject(rejection);
                },
                response: function (res) {
                    console.log("=========response========");
                    if (isRouteUrl(res.config.url)) {
                        $rootScope.$emit("endRoute");
                    }
                    return res;
                },
                responseError: function (rejection) {
                    console.log("=========responseError========");
                    if (isRouteUrl(rejection.config.url)) {
                        $rootScope.$emit("endRoute");
                    }
                    if (rejection.status === -1) {
                        rejection.data = rejection.data || { message: "server is busy.Please try later." };
                    } else if (rejection.status === 401) {
                        var popup = $injector.get("popup");
                        if (!popup.isPopup()) {
                            var msg = angular.isString(rejection.data) ? JSON.parse(rejection.data).message : rejection.data.message;
                            popup.window({
                                body: msg,
                                fnSuccess: function () {
                                    var $window = $injector.get("$window");
                                    $window.location.href = "/";
                                }
                            });
                        }
                    } else {
                        rejection.data = { message: rejection.statusText };
                    }
                    return $q.reject(rejection);
                }
            };
        }]);