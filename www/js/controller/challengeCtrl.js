angular.module('app.controller')

.controller('ChallengeCtrl', function($scope, StatisticsService, localStorageService) {

  var name = localStorageService.get("username");

  $scope.listIssues = {
    1: {
      area: 'CHT',
      description: 'Resolver 100 questões de CHT',
      buttonType: 'button-assertive'
    },
    2: {
      area: 'CNT',
      description: 'Resolver 100 questões de CNT',
      buttonType: 'button-balanced'
    },
    3: {
      area: 'LCT',
      description: 'Resolver 100 questões de LCT',
      buttonType: 'button-royal'
    },
    4: {
      area: 'MTT',
      description: 'Resolver 100 questões de MTT',
      buttonType: 'button-positive'
    }
  }

  StatisticsService.getStatisticsByAreaName($scope.listIssues[1].area, name,function(response){
      if(response.success){
        $scope.listIssues[1].count = response.data.results;
      }
  });

  StatisticsService.getStatisticsByAreaName($scope.listIssues[2].area, name,function(response){
      if(response.success){
        $scope.listIssues[2].count = response.data.results;
      }
  });

  StatisticsService.getStatisticsByAreaName($scope.listIssues[3].area, name,function(response){
      if(response.success){
        $scope.listIssues[3].count = response.data.results;
      }
  });

  StatisticsService.getStatisticsByAreaName($scope.listIssues[4].area, name,function(response){
      if(response.success){
        $scope.listIssues[4].count = response.data.results;
      }
  });

});