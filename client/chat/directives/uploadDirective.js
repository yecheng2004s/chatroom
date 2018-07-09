angular.module("app.chat")
    .directive("upload", ["uiUploader", "$rootScope", "$loading",
        function (uiUploader, $rootScope, $loading) {
            return {
                restrict: "A",
                link: function (scope, element, attrs) {
                    var img = element.children("img");
                    var input = element.children("input");

                    img.on("click", function () {
                        input.click();
                    });
                    $loading.setDefaultOptions({ text: "" });
                    input.on("change", function (e) {
                        uiUploader.removeAll();
                        var files = e.target.files;
                        uiUploader.addFiles(files);

                        $loading.start("loading");
                        uiUploader.startUpload({
                            url: "/api/upload_face",
                            headers: { "x-requested-with": "XMLHttpRequest" },
                            concurrency: 2,
                            onProgress: function (file) {
                                console.log(file.name + "=" + file.humanSize);
                                scope.$apply();
                            },
                            onCompleted: function (file, response, status) {
                                if (status == 200) {
                                    $rootScope.$broadcast("uploadCompleted", new Date().getTime());
                                } else {
                                    $rootScope.$broadcast("uploadError", JSON.parse(response).message);
                                }
                                $loading.finish("loading");
                            },
                            onError: function (e) {
                                $rootScope.$broadcast("uploadError", e.message);
                                $loading.finish("loading");
                            }
                        });
                    });
                }
            };
        }]);