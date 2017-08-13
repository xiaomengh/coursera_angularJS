(function(){
  'use restrict';

  angular.module('ShoppingListCheckOff',[])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject=['$scope', 'ShoppingListCheckOffService'];
  function ToBuyController($scope, ShoppingListCheckOffService){
    var tobuy = this;
    tobuy.list=ShoppingListCheckOffService.getToBuyList();
    tobuy.bought=function(itemIndex){
      ShoppingListCheckOffService.boughtItem(itemIndex);
    };
  }

  AlreadyBoughtController.$inject=['$scope', 'ShoppingListCheckOffService'];
  function AlreadyBoughtController($scope, ShoppingListCheckOffService){
    var bought = this;
    bought.list=ShoppingListCheckOffService.getBoughtList();
  }

  function ShoppingListCheckOffService(){
    var service = this;
    var tobuylist=[
      {name:"cookies", quantity:10},
      {name:"apples", quantity:10},
      {name:'milk',quantity:2},
      {name:'eggs',quantity:30},
      {name:'pinapples', quantity:2}
    ];
    var boughtlist=[];

    service.getToBuyList=function(){
      return tobuylist
    };

    service.boughtItem=function(itemIndex){
      boughtlist.push(tobuylist[itemIndex])
      tobuylist.splice(itemIndex, 1);
    };

    service.getBoughtList=function(){
      return boughtlist
    }
  }
})();
