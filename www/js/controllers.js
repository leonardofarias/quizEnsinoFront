angular.module('app.controllers', [])

.controller('QuizEnsinoCtrl1', function($scope, $state,$ionicBackdrop,$timeout) {

  $scope.listIssues = {
    0: {
      area: 'all',
      description: 'Todas as questões',
      buttonType: 'button-energized'
    },
    1: {
      area: 'CHT',
      description: 'Ciências Humanas e suas Tecnologias (CHT)',
      buttonType: 'button-assertive'
    },
    2: {
      area: 'CNT',
      description: 'Ciências da Natureza e suas Tecnologias (CNT)',
      buttonType: 'button-balanced'
    },
    3: {
      area: 'LCT',
      description: 'Linguagens, Códigos e suas Tecnologias (LCT)',
      buttonType: 'button-royal'
    },
    4: {
      area: 'MTT',
      description: 'Matemática e suas linguagens (MTT)',
      buttonType: 'button-positive'
    }
  }

  $scope.getIssues = function(area){
    $state.go('app.single', {area : area});
    //$scope.action();
  }

  /*$scope.action = function() {
    $ionicBackdrop.retain();
    $timeout(function() {
      $ionicBackdrop.release();
    }, 1000);
  };

  // Execute action on backdrop disappearing
  $scope.$on('backdrop.hidden', function() {
    $state.go('app.ranking');
  });

  // Execute action on backdrop appearing
  $scope.$on('backdrop.shown', function() {
  });*/

})

.controller('MultiPlayerCtrl1', function($ionicScrollDelegate,$scope,$rootScope,$timeout, $state,$ionicLoading, IssueService, StatisticsService,ChallengeService, localStorageService) {

  var player1 = $rootScope.player1;
  var player2 = $rootScope.player2;
  var myConnection = $rootScope.myConnection;
  $scope.name = localStorageService.get("username");
  $scope.nameAdv = {};
  $scope.pontuacao = 0;
  $scope.pontuacaoAdv = 0;

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
    var namePlayer = localStorageService.get("username");
    var checkAnswer = {};
    if(res.toUpperCase() === res.toUpperCase()){
      checkAnswer = true;
      $scope.pontuacao +=10;
    }else{
      checkAnswer = false;
    }
    StatisticsService.save($scope.issue,namePlayer,checkAnswer, function(response){
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
        }else{
          alert('Erro');
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

})

.controller('DesafioCtrl1', function($scope, StatisticsService, localStorageService) {

  var namePlayer = localStorageService.get("username");

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

  StatisticsService.getStatisticsByAreaNamePlayer($scope.listIssues[1].area, namePlayer,function(response){
      if(response.success){
        $scope.listIssues[1].count = response.data.results;
      }
  });

  StatisticsService.getStatisticsByAreaNamePlayer($scope.listIssues[2].area, namePlayer,function(response){
      if(response.success){
        $scope.listIssues[2].count = response.data.results;
      }
  });

  StatisticsService.getStatisticsByAreaNamePlayer($scope.listIssues[3].area, namePlayer,function(response){
      if(response.success){
        $scope.listIssues[3].count = response.data.results;
      }
  });

  StatisticsService.getStatisticsByAreaNamePlayer($scope.listIssues[4].area, namePlayer,function(response){
      if(response.success){
        $scope.listIssues[4].count = response.data.results;
      }
  });

})

.controller('LoginCtrl', function($scope, $ionicLoading,localStorageService, $state, UserService) {

  $scope.user = {};

  $scope.save = function(user){
    UserService.save(user,function(response){
      if(response.success){
        $ionicLoading.show({ template: 'Bem vindo: ' + response.data.results.namePlayer, noBackdrop: true, duration: 2000 });
        localStorageService.set("username", response.data.results.namePlayer);
        $state.go('app.quizEnsino');
      }else{
        $ionicLoading.show({ template: response.error.message , noBackdrop: true, duration: 3000 });
      }
    });
  }

  $scope.getUser = function(user){
    UserService.getUser(user,function(response){
      if(response.success){
        $ionicLoading.show({ template: 'Bem vindo: ' + response.data.results.namePlayer, noBackdrop: true, duration: 2000 });
        localStorageService.set("username", response.data.results.namePlayer);
        $state.go('app.quizEnsino');
      }else{
        $ionicLoading.show({ template: response.error.message, noBackdrop: true, duration: 3000 });
      }
    });
  }
})

.controller('StatsCtrl1', function($http, $scope, localStorageService, StatisticsService, StatisticsMultiService) {

    $scope.corrects = {};
    $scope.errors = {};
    $scope.wins = {};
    $scope.losses = {};
    var namePlayer = localStorageService.get("username");

    StatisticsService.getStatistics(namePlayer,function(response){
      if(response.success){
        $scope.corrects = response.data.results[0];
        $scope.errors = response.data.results[1];
      }
    })
    StatisticsMultiService.getStatistics(namePlayer,function(response){
      if(response.success){
        $scope.wins = response.data.results[0];
        $scope.losses = response.data.results[1];
      }
    })
    
})

.controller('RankingCtrl1', function($http, $scope, RankingService) {

  $scope.listRanking = [];  

  RankingService.getRanking(function(response){
    if(response.success){
      $scope.listRanking = response.data.results;
    }
  })
})

.controller('SingleCtrl1', function($ionicScrollDelegate,$scope,$anchorScroll, $stateParams, $timeout, $ionicLoading, IssueService, StatisticsService, localStorageService) {

  $scope.issue = {};

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

  function initiateCount(){
    window.scrollTo(0, 0);
    $scope.time = 0;
    $scope.timeInMs = 0;
  }

  $scope.checkAnswer = function(option){
    var res = option.description.charAt(0);
    var namePlayer = localStorageService.get("username");
    var checkAnswer = {};
    if(res.toUpperCase() === $scope.issue.answer){
      checkAnswer = true;
      $ionicLoading.show({ template: '<i class="icon ion-checkmark"></i>', noBackdrop: false, duration: 1500 });
    }else{
      checkAnswer = false;
      $ionicLoading.show({ template: '<i class="icon ion-close-round"></i>', noBackdrop: false, duration: 1500 });
    }
    StatisticsService.save($scope.issue,namePlayer,checkAnswer, function(response){
        if(response.success){
          console.log("ok");
        }
    })
    initiateCount();
    getIssue();
  }

})

.controller('ListaDeJogadoresCtrl1', function($scope, $rootScope, $state,$timeout, localStorageService) {

  $scope.playerList = [];
  var name = localStorageService.get("username");
  var connection = new WebSocket('ws://localhost:9090');

  var otherUsernameInput = document.querySelector('#otherUsernameInput');
  var connectToOtherUsernameBtn = document.querySelector('#connectToOtherUsernameBtn');
  var msgInput = document.querySelector('#msgInput');
  var sendMsgBtn = document.querySelector('#sendMsgBtn');
  var connectedUser, myConnection, dataChannel;
  var receiveDataChannel, nameAdv;

  //when a user connect
  $scope.conectar = function() {
    if(name.length > 0) {
        send({
           type: "login",
           name: name
        });
      }else{
        alert("Dados não encontrados");
      }
  };

  //handle messages from the server
  connection.onmessage = function (message) {
     console.log("Got message", message.data);
     console.log(message);
     var data = JSON.parse(message.data);

     switch(data.type) {
        case "list":
          onList(data);
          break;
        case "login":
           onLogin(data);
           break;
        case "offer":
           onOffer(data.offer, data.name);
           break;
        case "answer":
           onAnswer(data);
           break;
        case "candidate":
           onCandidate(data.candidate);
           break;  
        default:
           break;
     }
  };

  function onList(data) {
    $scope.playerList = data.list;
  }

  //when a user logs in
  function onLogin(data) {
     if (data.success === false) {
        $scope.playerList = data.list;
     } else {
        //creating our RTCPeerConnection object
        var configuration = {
           "iceServers": [{ "url": "stun:stun.1.google.com:19302" }]
        };
        
        $scope.playerList = data.list;
        myConnection = new webkitRTCPeerConnection(configuration);


        console.log("RTCPeerConnection object was created");
        console.log(myConnection);

        //setup ice handling
        //when the browser finds an ice candidate we send it to another peer
        myConnection.onicecandidate = function (event) {

           if (event.candidate) {
              send({
                 type: "candidate",
                 candidate: event.candidate
              });
           }
        };

        openDataChannel();

     }
  };

  connection.onopen = function () {
     console.log("Connected");
  };

  connection.onerror = function (err) {
     console.log("Got error", err);
  };

  // Alias for sending messages in JSON format
  function send(message) {
     if (connectedUser) {
        message.name = connectedUser;
     }
      connection.send(JSON.stringify(message));
  };

  //setup a peer connection with another user
  $scope.accept = function (name) {

     var otherUsername = name;
     connectedUser = otherUsername;

     if (otherUsername.length > 0) {
        //make an offer
        myConnection.createOffer(function (offer) {
           console.log();
           send({
              type: "offer",
              offer: offer
           });

           myConnection.setLocalDescription(offer);
        }, function (error) {
           alert("An error has occurred.");
        });
     }
  };

  //when somebody wants to call us
  function onOffer(offer, name) {
     connectedUser = name;
     myConnection.setRemoteDescription(new RTCSessionDescription(offer));
     myConnection.createAnswer(function (answer) {
        myConnection.setLocalDescription(answer);
        if(confirm(name + ' te desafiou. Aceita?')){
          send({
             type: "answer",
             answer: answer,
             accept: true,
             nameAdv: localStorageService.get("username") 
          });
          $rootScope.player1 = name;
          $rootScope.myConnection = myConnection;
          $state.go('app.multiPlayer');
        }else{
          send({
            type: "answer",
            answer: answer,
            accept: false
          });
        }

     }, function (error) {
        alert("oops...error");
     });
  }

  //when another user answers to our offer
  function onAnswer(data) {
      if(data.check){
        myConnection.setRemoteDescription(new RTCSessionDescription(data.answer));
        $rootScope.myConnection = myConnection;
        $rootScope.player2 = data.name;
        $state.go('app.multiPlayer');
      }else{
        alert('Não aceitou!');
     }
  }

  //when we got ice candidate from another user
  function onCandidate(candidate) {
     myConnection.addIceCandidate(new RTCIceCandidate(candidate));
  }

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
     };

     dataChannel.onmessage = function (event) {
        console.log("Got message:", event.data);
        alert(event.data);
     };

  }

  function dataChannelStateChanged() {
        if (dataChannel.readyState === 'open') {
                dataChannel.onmessage = receiveDataChannelMessage;
        }
  }

  function receiveDataChannel(event) {
          dataChannel = event.channel;
          dataChannel.onmessage = receiveDataChannelMessage;
  }

  $scope.closeConnection = function () {
    if(name.length > 0) { 
        send({
           type: "leave",
           name: name
        });
      }else{
        alert("Dados não encontrados");
      }
  };

});
