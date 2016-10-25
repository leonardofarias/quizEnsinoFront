angular.module('app.controller',[])

.controller('LoginCtrl', function($scope,$q, $ionicLoading,localStorageService, $state, UserService) {

  $scope.user = {};

  if(localStorageService.get("username") != null && localStorageService.get("username") != ""){
    $ionicLoading.show({ template: 'Olá ' + localStorageService.get("username") + "!", noBackdrop: true, duration: 2000 });
    $state.go('app.quizEnsino');
  }

  $scope.save = function(user){
    console.log("salvando jogador1");
    UserService.save(user,function(response){
      if(response.success){
        console.log("salvando jogador2");
        var user = response.data.results;
        localStorageService.set("username", user.name);
        $ionicLoading.show({ template: 'Bem vindo: ' + user.name, noBackdrop: false, duration: 3000 });
        $state.go('app.quizEnsino');
      }else{
        $ionicLoading.show({ template: response.error.message, noBackdrop: false, duration: 3000 });
      }
    });
  }

  $scope.getUser = function(user){

    UserService.getUser(user,function(response){
      if(response.success){
        var user = response.data.results;
        console.log(user);
        $ionicLoading.show({ template: 'Bem vindo: ' + response.data.results.name, noBackdrop: true, duration: 2000 });
        localStorageService.set("username", response.data.results.name);
        $state.go('app.quizEnsino');
      }else{
        $ionicLoading.show({ template: response.error.message, noBackdrop: false, duration: 3000 });
      }
    });
  }

  var fbLoginSuccess = function(response) {
    
    if (!response.authResponse){
      console.log("Cannot find the authResponse");
      fbLoginError("Cannot find the authResponse");
      return;
    }

    var authResponse = response.authResponse;

    getFacebookProfileInfo(authResponse)
    .then(function(profileInfo) {
      UserService.getUserByIdFacebook(profileInfo.id,function(response){
        if(response.success){
          console.log("achou fbLoginSuccess");
          var user = response.data.results;
          localStorageService.set("username", user.name);
          $ionicLoading.show({ template: 'Bem vindo: ' + user.name, noBackdrop: false, duration: 3000 });
          $state.go('app.quizEnsino');
        }else{
          console.log("não achou fbLoginSuccess");
          var user = {
            profileidfacebook: profileInfo.id,
            name: profileInfo.name,
            email: profileInfo.email,
            picture : "http://graph.facebook.com/" + profileInfo.id + "/picture?type=large"
          }
          console.log("salvando jogador");
          $scope.save(user);
        }
      });
    }, function(fail){
      // Fail get profile info
      console.log('profile info fail', fail);
    });
  };

  // This is the fail callback from the login method
  var fbLoginError = function(error){
    console.log('fbLoginError', error);
    $ionicLoading.hide();
  };

  // This method is to get the user profile info from the facebook api
  var getFacebookProfileInfo = function (authResponse) {
    var info = $q.defer();

    facebookConnectPlugin.api('/me?fields=email,name&access_token=' + authResponse.accessToken, null,
      function (response) {
        console.log(response);
        info.resolve(response);
      },
      function (response) {
        console.log(response);
        info.reject(response);
      }
    );
    return info.promise;
  };

  //This method is executed when the user press the "Login with facebook" button
  $scope.facebookSignIn = function() {
    facebookConnectPlugin.getLoginStatus(function(success){
      if(success.status === 'connected'){
        // The user is logged in and has authenticated your app, and response.authResponse supplies
        // the user's ID, a valid access token, a signed request, and the time the access token
        // and signed request each expire
        
        UserService.getUserByIdFacebook(success.authResponse.userID,function(response){
          if(response.success){
            console.log("achou facebookSignIn");
            var user = response.data.results;
            localStorageService.set("username", user.name);
            $ionicLoading.show({ template: 'Bem vindo: ' + user.name, noBackdrop: false, duration: 3000 });
            $state.go('app.quizEnsino');
          }else{ 
            console.log("não achou facebookSignIn");
            getFacebookProfileInfo(success.authResponse)
            .then(function(profileInfo) {

            $scope.user = {
              profileidfacebook: profileInfo.id,
              name: profileInfo.name,
              email: profileInfo.email,
              picture : "http://graph.facebook.com/" + profileInfo.id + "/picture?type=large"
            }

            $scope.save($scope.user);

            }, function(fail){
            // Fail get profile info
            console.log('profile info fail', fail);
            });
          }
        });
      } else {
        // If (success.status === 'not_authorized') the user is logged in to Facebook,
        // but has not authenticated your app
        // Else the person is not logged into Facebook,
        // so we're not sure if they are logged into this app or not.

        /*$ionicLoading.show({
          template: 'Aguarde teste...'
        });*/

        // Ask the permissions you need. You can learn more about
        // FB permissions here: https://developers.facebook.com/docs/facebook-login/permissions/v2.4
        facebookConnectPlugin.login(['email', 'public_profile'], fbLoginSuccess, fbLoginError);
      }
    });
  };

});