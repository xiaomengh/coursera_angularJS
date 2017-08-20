(function(){
  'use restrict';

  angular.module('NarrowItDownApp',[])
  .controller('NarrowItDownController',NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .constant('ApiBasePath','https://davids-restaurant.herokuapp.com')
  .directive('foundItems',FoundItemsDirective);


  MenuSearchService.$inject=['$http','ApiBasePath'];
  function MenuSearchService ($http,ApiBasePath){
    var service =this;
    var foundItems=[]
    service.getMatchedMenuItems = function(searchTerm){
      var promise = $http({
        method:'GET',
        url:ApiBasePath+'/menu_items.json'
      }).then(function(response){
        var menu_items=response.data.menu_items;
        foundItems = menu_items.filter(function(item){return item.description.toLowerCase().indexOf(searchTerm.toLowerCase()) != -1; });

        console.log('foundItems',foundItems)
        return foundItems;
      });
      return promise;
    };
    service.removeItem=function(itemIndex){
      foundItems.splice(itemIndex,1);
    }
  };

  NarrowItDownController.$inject=['MenuSearchService'];
  function NarrowItDownController(MenuSearchService){
    var controller=this;
    controller.getItems=function(){
      promise=MenuSearchService.getMatchedMenuItems(controller.searchTerm);
      promise.then(function(response){
        controller.found=response
        if(controller.found.length===0){
          controller.message='Sorry, nothing found.';
        }else{
          controller.message='';
        }
      })
    };
    controller.removeItem=function(itemIndex){
      MenuSearchService.removeItem(itemIndex)
    }
  };

  function FoundItemsDirective(){
    var ddo={
      templateUrl: 'founditem.html',
      scope:{
        items:'<',
        message:'<',
        onRemove:'&'
      },
      controller:FoundItemsDirectiveController,
      controllerAs:'list',
      bindToController: true
    };
    return ddo;
  };
  function FoundItemsDirectiveController(){
    var list=this;
  };
})();
