angular.module('app.controllers', [])

.controller('quizEnsinoCtrl', function($scope, $state) {

  $scope.onePlayer = function(){
    $state.go('tabsController.single');
  }

})

.controller('multiPlayerCtrl', function($scope) {

})

.controller('singleCtrl', function($scope,$timeout, IssueService, StatisticsService, StorageService) {

  $scope.issue = {};

  var getIssue =function(){
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

  function initiateCount(){
    $scope.time = 0;
    $scope.timeInMs = 0;
  }

  $scope.checkAnswer = function(option){
    var res = option.description.charAt(0);
    var namePlayer = StorageService.getAll();
    var checkAnswer = {};
    if(res.toUpperCase() === $scope.issue.answer){
      checkAnswer = true;
    }else{
      checkAnswer = false;
    }
    StatisticsService.save($scope.issue,namePlayer[0],checkAnswer, function(response){
        if(response.success){
          console.log("ok");
        }
    })
    initiateCount();
    getIssue();
  }

})

.controller('listaDeJogadoresCtrl', function($scope) {

  $scope.playerList = [];

  var _name = '';
  $scope.user = {
    name: function(newName) {
     // Note that newName can be undefined for two reasons:
     // 1. Because it is called as a getter and thus called with no arguments
     // 2. Because the property should actually be set to undefined. This happens e.g. if the
     //    input is invalid
     return arguments.length ? (_name = newName) : _name;
    }
  };

  var connection = new WebSocket('ws://localhost:9090');

  var otherUsernameInput = document.querySelector('#otherUsernameInput');
  var connectToOtherUsernameBtn = document.querySelector('#connectToOtherUsernameBtn');
  var msgInput = document.querySelector('#msgInput');
  var sendMsgBtn = document.querySelector('#sendMsgBtn');
  var connectedUser, myConnection, dataChannel;
  var receiveDataChannel;

  $scope.dataChannel = {};

  //when a user clicks the login button
  $scope.conectar = function() {
  var name = $scope.user.name();
    if(name.length > 0) {
        send({
           type: "login",
           name: name
        });
      }else{
        alert("Informe um nome");
      }
  };

  //handle messages from the server
  connection.onmessage = function (message) {
     console.log("Got message", message.data);
     var data = JSON.parse(message.data);

     switch(data.type) {
        case "login":
           onLogin(data.success, data.list);
           break;
        case "offer":
           onOffer(data.offer, data.name);
           break;
        case "answer":
           onAnswer(data.answer, data.check);
           break;
        case "candidate":
           onCandidate(data.candidate);
           break;
        default:
           break;
     }
  };

  //when a user logs in
  function onLogin(success,list) {

     if (success === false) {
        alert("oops...try a different username");
     } else {
        //creating our RTCPeerConnection object
        var configuration = {
           "iceServers": [{ "url": "stun:stun.1.google.com:19302" }]
        };
        $scope.playerList = list;
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
        if(confirm("O jogador: " + name + ' te desafiou. Aceita?')){
          send({
             type: "answer",
             answer: answer,
             accept: true
          });
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
  function onAnswer(answer) {
      if(answer.check){
       myConnection.setRemoteDescription(new RTCSessionDescription(answer));
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

  //when a user clicks the send message button
  sendMsgBtn.addEventListener("click", function (event) {
    console.log("send message");
    var val = msgInput.value;
    dataChannel.send(val);
  });

})

.controller('desafioCtrl', function($scope) {

})

.controller('pontuaOCtrl', function($scope) {

})

.controller('loginCtrl', function($scope, $ionicLoading, StorageService, $state, UserService) {

  $scope.user = {};

  $scope.save = function(){
    UserService.save($scope.user,function(response){
      if(response.success){
        $ionicLoading.show({ template: 'Bem vindo: ' + response.data.results.namePlayer, noBackdrop: true, duration: 2000 });
        //$sessionStorage.user.namePlayer = response.data.namePlayer;
        $state.go('tabsController.quizEnsino');
      }else{
        $ionicLoading.show({ template: response.error.message , noBackdrop: true, duration: 2000 });
      }
    });
  }

  $scope.getUser = function(){
    UserService.get($scope.user,function(response){
      if(response.success){
        $ionicLoading.show({ template: 'Bem vindo: ' + response.data.results.namePlayer, noBackdrop: true, duration: 2000 });
        StorageService.add(response.data.results.namePlayer);
        $state.go('tabsController.quizEnsino');
      }else{
        $ionicLoading.show({ template: response.error.message, noBackdrop: true, duration: 2000 });
      }
    });
  }




})
