angular.module('app.controller')

.controller('StatsCtrl', function($http, $scope, localStorageService, StatisticsService, StatisticsMultiService) {

    $scope.corrects = {};
    $scope.errors = {};
    $scope.wins = {};
    $scope.losses = {};
    var name = localStorageService.get("username");

    StatisticsService.getStatistics(name,function(response){
      if(response.success){
        $scope.corrects = response.data.results[0];
        $scope.errors = response.data.results[1];
      }
    })
    StatisticsMultiService.getStatistics(name,function(response){
      if(response.success){
        $scope.wins = response.data.results[0];
        $scope.losses = response.data.results[1];
      }
    })
    
});
