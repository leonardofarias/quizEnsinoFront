angular.module('app.controller')

.controller('QuizEnsinoCtrl', function($ionicActionSheet,$scope, $state,$ionicBackdrop,$timeout,$ionicActionSheet,localStorageService,$ionicLoading) {

  $scope.listIssues = {
    0: {
      area: 'all',
      description: 'Todas as questões',
    },
    1: {
      area: 'CHT',
      description: 'Ciências Humanas e suas Tecnologias (CHT)',
    },
    2: {
      area: 'CNT',
      description: 'Ciências da Natureza e suas Tecnologias (CNT)',
    },
    3: {
      area: 'LCT',
      description: 'Linguagens, Códigos e suas Tecnologias (LCT)',
    },
    4: {
      area: 'MTT',
      description: 'Matemática e suas linguagens (MTT)',
    }
  }

  $scope.getIssues = function(area){
    $ionicLoading.show({
      templateUrl: 'templates/config.html',
      noBackdrop: false, duration: 2500
    })
    $timeout(function(){
      $state.go('app.single', {area : area});    
    }, 1500);
  }

});
