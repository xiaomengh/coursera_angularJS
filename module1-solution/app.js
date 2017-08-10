(function(){
  'use restrict';

  angular.module('LunchCheck',[])
  .controller('LunchCheckController',LunchCheckController);

  LunchCheckController.$inject=['$scope'];

  function LunchCheckController($scope){
    $scope.orders='';
    $scope.message='';
    $scope.checkIfTooMuch=function(){
      if($scope.orders==''){
        $scope.message="Please enter data first."
      }
      else{
        items=$scope.orders.split(',')
        count=items.length
        for(i=0;i<items.length;i++){
          if(items[i]==''){
            count=count-1
          }
        };
        if(count<=3){
          $scope.message="Enjoy!";
        }else{
          $scope.message="Too much!";
        }
      }
    }
  }
})();
