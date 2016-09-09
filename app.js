(function () {
        'use strict';
        angular.module('LunchCheck', [])
        .controller('LunchCheckController', LunchCheckController);
        LunchCheckController.$inject = ["$scope"];
        function LunchCheckController($scope) {
            $scope.in = "";
            $scope.check = function () {
                if ($scope.in.trim().length == 0) {
                    $scope.msg = "Please enter data first";
                }
                else {
                    console.log($scope);
                    var cnt = $scope.in.split(",").length;
                    if ((cnt >= 1) && (cnt <= 3)) {
                        $scope.msg = "Enjoy!";
                    }
                    else if (cnt > 3) {
                        $scope.msg = "Too much!";
                    }
                }
            }
        }
    }
)();
