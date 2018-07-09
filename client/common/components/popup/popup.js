angular.module("common.popup", [])
    .component("window", {
        templateUrl: "common/components/popup/windowTemplate.html",
        bindings: {
            resolve: "<",
            close: "&",
            dismiss: "&"
        },
        controllerAs: "vm",
        controller: ["$scope", function ($scope) {
            var vm = this;

            $scope.$on("$includeContentError", function (event, src) {
                vm.contentError = "content load error";
            });
            vm.$onInit = function () {
                vm.title = vm.resolve.title;
                vm.body = vm.resolve.body;
                vm.bodyTemplateUrl = vm.resolve.bodyTemplateUrl;
                vm.successText = vm.resolve.successText;
                vm.cancelText = vm.resolve.cancelText;
                vm.fnSuccess = vm.resolve.fnSuccess;
                vm.fnCancel = vm.resolve.fnCancel;
                $scope.data = vm.resolve.data;
                $scope.callback = [];
            };

            // vm.dismiss = function () {
            //     vm.dismiss();
            // };

            vm.success = function (event) {
                //vm.close({ $value: "aa" });
                var rt = true;
                if ($scope.callback.success) {
                    rt = $scope.callback.success();
                }
                if (rt.finally) {//is promise
                    vm.successPromise = rt;
                    vm.successPromise.finally(function () {
                        if (void 0 === rt.$$state.value) {
                            rt.$$state.value = true;
                        }
                        if (vm.fnSuccess(rt.$$state.value)) {
                            vm.close();
                        }
                    });
                } else if (vm.fnSuccess(rt)) {
                    vm.close();
                }
            };

            vm.cancel = function () {
                var rt = true;
                if ($scope.callback.cancel) {
                    rt = $scope.callback.cancel();
                }
                vm.fnCancel(rt);
                vm.dismiss();
            };
        }]
    })
    .constant("title", "ChatRoom System")
    .factory("popup", ["$uibModal", "$timeout", "title",
        function ($uibModal, $timeout, title) {
            var _isPopup = false;
            return {
                isPopup: function () {
                    return _isPopup;
                },
                alert: function (data) {
                    var modalInstance = $uibModal.open({
                        animation: true, //动画效果
                        templateUrl: "common/components/popup/alertTemplate.html",
                        backdrop: false,
                        keyboard: false, //esc键盘不关闭
                        windowTemplateUrl: "common/components/popup/window.html",
                        windowTopClass: "alert-window-top",
                        windowClass: "alert-window",
                        controller: "ModalInstanceController",
                        controllerAs: "vm",
                        resolve: {
                            data: function () {
                                return data;
                            }
                        }
                    });
                    $timeout(function () {
                        modalInstance.close();
                        _isPopup = false;
                    }, 2000);
                    _isPopup = true;
                },
                window: function (data) {
                    data = data || {};
                    if (data.body && data.bodyTemplateUrl) {
                        throw new Error("at most one of body and bodyTemplateUrl can be defined");
                    }
                    var modalInstance = $uibModal.open({
                        animation: true, //动画效果
                        ariaLabelledBy: "modal-title", //title id
                        ariaDescribedBy: "modal-body", //body id
                        component: "window",
                        backdrop: "static", //鼠标点空白处不关闭
                        keyboard: false, //esc键盘不关闭
                        //windowTemplateUrl: 'common/components/popup/window.html',
                        size: data.body ? "sm" : "", //窗体尺寸
                        //windowClass: "xxxx",
                        resolve: {
                            title: function () {
                                return data.title || title;
                            },
                            body: function () {
                                return data.body;
                            },
                            bodyTemplateUrl: function () {
                                return data.bodyTemplateUrl;
                            },
                            successText: function () {
                                return data.successText || "OK";
                            },
                            cancelText: function () {
                                return data.cancelText || "Cancel";
                            },
                            fnSuccess: function () {
                                return function (r) {
                                    return data.fnSuccess ? data.fnSuccess(r) : r;
                                };
                            },
                            fnCancel: function () {
                                return function (r) {
                                    return data.fnCancel ? data.fnCancel(r) : r;
                                };
                            },
                            data: function () {
                                return data.scope;
                            }
                        }
                    });

                    modalInstance.result.then(function (value) {
                        //close
                        _isPopup = false;
                        // if (fnSuccess)
                        //     fnSuccess(value);
                    }, function (value) {
                        //dismiss
                        _isPopup = false;
                        // if (fnCancel)
                        //     fnCancel(value);
                    });

                    _isPopup = true;
                },
                // loading: function (appendTo) {
                //     var modalInstance = $uibModal.open({
                //         animation: true, //动画效果
                //         templateUrl: "common/components/popup/loadingTemplate.html",
                //         backdrop: "static",
                //         backdropClass: "loading-backdrop",
                //         keyboard: false, //esc键盘不关闭
                //         windowTemplateUrl: "common/components/popup/window.html",
                //         windowClass: "loading-modal",
                //         appendTo: appendTo,
                //     });
                //     _isPopup = true;
                //     return {
                //         close: function () {
                //             modalInstance.close();
                //             _isPopup = false;
                //         }
                //     };
                // }
            };
        }])
    .controller("ModalInstanceController", ["$uibModalInstance", "data",
        function ($uibModalInstance, data) {
            var vm = this;
            vm.message = data;
        }]);