angular.module('app.controller')

.controller('ConfigCtrl', function($ionicActionSheet,$scope, $rootScope,$location,$ionicBackdrop,$timeout,$ionicActionSheet,localStorageService,$ionicLoading) {
  
  $scope.showLogOutMenu = function() {
    var hideSheet = $ionicActionSheet.show({
      destructiveText: 'Logout',
      titleText: 'Tem certeza que deseja sair do QuizEnsino?',
      cancelText: 'Cancel',
      cancel: function() {},
      buttonClicked: function(index) {
        return true;
      },
      destructiveButtonClicked: function(){
        $ionicLoading.show({
          template: 'Até mais...'
        });

        localStorageService.remove("username");
        $ionicLoading.hide();
        //Facebook logout
        facebookConnectPlugin.logout(function(){
          $ionicLoading.hide();
          $state.go('login');
        },
        function(fail){
          $ionicLoading.hide();
        });
      }
    });
  };

});