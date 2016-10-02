(function () {
        'use strict';
        angular.module('NarrowItDownApp', [])
            .controller('NarrowItDownController', NarrowItDownController)
            .service('MenuSearchService', MenuSearchService)
            .directive('foundItems', foundItemsDirective)
            .constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");

        function foundItemsDirective() {
            var ddo = {
                templateUrl: 'foundItems.html',
                restrict: 'E',
                scope: {
                    list: '<foundItems',
                    onRemove: '&'
                }
            };

            return ddo;
        }

        NarrowItDownController.$inject = ["MenuSearchService", "$scope"];
        function NarrowItDownController(MenuSearchService) {
            var ctrl = this;
            ctrl.searchTerm = "";

            ctrl.narrowMenu = function () {
                if (ctrl.searchTerm == "") {
                    ctrl.found = [];
                } else {
                    MenuSearchService.getMatchedMenuItems(ctrl.searchTerm).then(function (array) {
                        ctrl.found = array;
                });
                }
            };
            ctrl.removeItem = function (itemIndex) {
                ctrl.found.splice(itemIndex, 1);
            };

        }
        MenuSearchService.$inject = ["$http", "ApiBasePath"];
        function MenuSearchService($http, ApiBasePath) {
            var service = this;

            service.getMatchedMenuItems = function (searchTerm) {
                return $http({
                        method: "GET",
                        url: (ApiBasePath + "/menu_items.json")
                    }).then(
                        function (result) {
                        // process result and only keep items that match
                            var foundItems = result.data.menu_items.filter(function (element) {
                                return element.description.indexOf(searchTerm) != -1
                            });
                        // return processed items
                            return foundItems;
                    });
            };
        }

    }
)();