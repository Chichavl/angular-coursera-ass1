(function () {
        'use strict';
        angular.module('ShoppingListCheckOff', [])
            .controller('ToBuyController', ToBuyController)
            .controller('AlreadyBoughtController', AlreadyBoughtController)
            .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

        ToBuyController.$inject = ["ShoppingListCheckOffService"];
        function ToBuyController(ShoppingListCheckOffService) {
            var list = this;

            list.items = ShoppingListCheckOffService.getToBuyItems();
            list.buy = function (itemIndex) {
                ShoppingListCheckOffService.buy(itemIndex);
            }

        }

        AlreadyBoughtController.$inject = ["ShoppingListCheckOffService"];
        function AlreadyBoughtController(ShoppingListCheckOffService) {
            var cart = this;

            cart.items = ShoppingListCheckOffService.getBoughtItems();
        }

        function ShoppingListCheckOffService() {
            var service = this;

            var boughtItems = [];
            var toBuyItems = [
                {
                    name: "Cookies",
                    quantity: "10"
                },
                {
                    name: "Coke",
                    quantity: "5"
                },
                {
                    name: "Dr Pepper",
                    quantity: "3"
                },
                {
                    name: "Cake",
                    quantity: "1"
                },
                {
                    name: "Pizza",
                    quantity: "4"
                },
                {
                    name: "Coffee",
                    quantity: "10"
                }
            ];

            service.getToBuyItems = function () {
                return toBuyItems;
            };

            service.buy = function (itemIndex) {
                boughtItems.push(toBuyItems[itemIndex]);
                toBuyItems.splice(itemIndex,1);
            };

            service.getBoughtItems = function () {
                return boughtItems;
            }
        }

    }
)();