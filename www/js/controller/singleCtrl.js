angular.module('app.controller')

.controller('SingleCtrl', function($ionicScrollDelegate,$scope,$anchorScroll, $stateParams, $timeout, $ionicLoading, IssueService, StatisticsService, localStorageService) {


  $scope.isIOS = ionic.Platform.isIOS();
  $scope.isAndroid = ionic.Platform.isAndroid();

  var getIssue =function(){
    $ionicScrollDelegate.scrollTop();
    var area = $stateParams.area;
    if(area == 'all'){
      IssueService.get(function(response) {
        if(response.success){
          $scope.issue = response.data.results;
          }
      })
    }else{
      IssueService.getByArea(area,function(response){
        if(response.success){
          $scope.issue = response.data.results;
        }
      })
    }
  };

  getIssue();

  $scope.timeInMs = 60000;

  var countDown = function() {
       $scope.timeInMs-= 1000;
       $scope.time = $scope.timeInMs/1000;
       $timeout(countDown, 1000);
  }
  $timeout(countDown, 1000);

  $scope.$watch('time', function (newVal, oldVal) {
    if(newVal < 0){
      getIssue();
      initiateCount();
    }
  }, true);

  function initiateCount(){
    window.scrollTo(0, 0);
    $scope.time = 60;
    $scope.timeInMs = 60000;
  }

  $scope.checkAnswer = function(option){
    var res = option.description.charAt(0);
    var name = localStorageService.get("username");
    var checkAnswer = {};
    if(res.toUpperCase() === $scope.issue.answer){
      checkAnswer = true;
      $ionicLoading.show({ template: '<i class="icon-green ion-checkmark"></i><br>Continue Assim!', noBackdrop: false, duration: 1500 });
    }else{
      checkAnswer = false;
      $ionicLoading.show({ template: '<i class="icon-red ion-close-round"></i><br>Não desista!', noBackdrop: false, duration: 1500 });
    }
    StatisticsService.save($scope.issue,name,checkAnswer, function(response){
        if(response.success){
          console.log("ok");
        }
    })
    initiateCount();
    getIssue();
  }

});