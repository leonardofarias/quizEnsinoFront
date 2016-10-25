angular.module('app.controller')

.controller('RankingCtrl', function($http, $scope, RankingService) {

  $scope.listRanking = [];  

  RankingService.getRanking(function(response){
    if(response.success){
      $scope.listRanking = response.data.results;
    }
  })
})