angular.module('app.controller')

.controller('MultiPlayerCtrl', function($ionicScrollDelegate,$scope,$rootScope,$timeout, $state,$ionicLoading, IssueService, StatisticsService,ChallengeService, localStorageService) {

  $scope.isIOS = ionic.Platform.isIOS();
  $scope.isAndroid = ionic.Platform.isAndroid();
  var player1 = $rootScope.player1;
  var player2 = $rootScope.player2;
  var myConnection = $rootScope.myConnection;
  $scope.name = localStorageService.get("username");
  $scope.nameAdv = {};
  $scope.pontuacao = 0;
  $scope.pontuacaoAdv = 0;
  var name = localStorageService.get("username");

  var otherUsernameInput = document.querySelector('#otherUsernameInput');
  var connectToOtherUsernameBtn = document.querySelector('#connectToOtherUsernameBtn');
  var msgInput = document.querySelector('#msgIn');
  var sendMsgBtn = document.querySelector('#sendMsg');
  var connectedUser;
  var receiveDataChannel, receiveDataChannelMessage;

  openDataChannel();

  if(player1){
    $scope.nameAdv = player1;
  }

   if(player2){
    $scope.nameAdv = player2;
  }
  
  //Questões 

  $scope.issue = {};

  var getIssue =function(){
    $ionicScrollDelegate.scrollTop();
    IssueService.get(function(response) {
      if(response.success){
          $scope.issue = response.data.results;
        }
    })
  };

  getIssue();

  $scope.timeInMs = 0;

  var countUp = function() {
       $scope.timeInMs+= 1000;
       $scope.time = $scope.timeInMs/1000;
       $timeout(countUp, 1000);
  }
  $timeout(countUp, 1000);

  $scope.$watch('time', function (newVal, oldVal) {
    if(newVal > 60){
      getIssue();
      initiateCount();
    }
  }, true);

  $scope.$watch('pontuacao', function (newVal, oldVal) {
    if(newVal >= 40){
      $state.go('app.quizEnsino');
    }
  }, true);

  $scope.$watch('pontuacaoAdv', function (newVal, oldVal) {
    if(newVal >= 40){
      $state.go('app.quizEnsino');
    }
  }, true);

  function initiateCount(){
    $scope.time = 0;
    $scope.timeInMs = 0;
  }

  $scope.checkAnswer = function(option){
    var res = option.description.charAt(0);
    var name = localStorageService.get("username");
    var checkAnswer = {};
    if(res.toUpperCase() === res.toUpperCase()){
      checkAnswer = true;
      $scope.pontuacao +=10;
    }else{
      checkAnswer = false;
    }
    StatisticsService.save($scope.issue,name,checkAnswer, function(response){
        if(response.success){
          console.log("ok");
        }
    });
    dataChannel.onmessage = function (event) {
        console.log("Got message:", event.data);
        alert(event.data);
    };
    dataChannel.send($scope.pontuacao);
    if($scope.pontuacao >= 40 || $scope.pontuacaoAdv >= 40){
      ChallengeService.save($scope.pontuacao,$scope.pontuacaoAdv, $scope.name, $scope.nameAdv, function(response){
        if(response.success){
          $ionicLoading.show({ template: 'Parabéns!!!!', noBackdrop: true, duration: 3000 });
          myConnection = null;
        }else{          
          alert('Erro');
          myConnection = null;
        }
      })
    }
    initiateCount();
    getIssue();
  }

  //fim questão

  //creating data channel
  function openDataChannel() {

     var dataChannelOptions = {
       ordered: false, //no guaranteed delivery, unreliable but faster
       maxRetransmitTime: 1000, //milliseconds
     };

     dataChannel = myConnection.createDataChannel("myDataChannel",dataChannelOptions);

     dataChannel.onopen = dataChannelStateChanged;
     myConnection.ondatachannel = receiveDataChannel;

     dataChannel.onerror = function (error) {
        console.log("Error:", error);
        alert(event.data);
     };

     dataChannel.onmessage = function (event) {
        console.log("Got message:", event.data);
        alert(event.data);
        $scope.pontuacaoAdv = event.data;
     };

  }

  function dataChannelStateChanged() {
        if (dataChannel.readyState === 'open') {
              //dataChannel.onmessage = receiveDataChannelMessage;
        }
  }

  function receiveDataChannel(event) {
          dataChannel = event.channel;
          //dataChannel.onmessage = receiveDataChannelMessage;
  }

});