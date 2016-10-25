angular.module('app.controller')

.controller('ListaDeJogadoresCtrl', function($ionicActionSheet,$scope, $rootScope,$location, $state,$timeout, localStorageService,$ionicLoading) {

  $scope.playerList = [];
  var name = localStorageService.get("username");
  var connection = new WebSocket('ws://192.168.1.7:55000');

  var otherUsernameInput = document.querySelector('#otherUsernameInput');
  var connectToOtherUsernameBtn = document.querySelector('#connectToOtherUsernameBtn');
  var msgInput = document.querySelector('#msgInput');
  var sendMsgBtn = document.querySelector('#sendMsgBtn');
  var connectedUser, myConnection, dataChannel;
  var receiveDataChannel, nameAdv;

  $scope.$watchCollection('playerList', function(newList) {
    setTimeout(function() {
        $scope.playerList = newList;
    },0);
  });

  //when a user connect
  $scope.conectar = function() {
    setTimeout(function() {
      if(name.length > 0) {
        send({
           type: "login",
           name: name
        });
      }else{
        alert("Dados não encontrados");
      }
    },2000);
  };

  $scope.conectar();

  //handle messages from the server
  connection.onmessage = function (message) {
     console.log("Got message", message.data);
     console.log(message);
     var data = JSON.parse(message.data);

     switch(data.type) {
        /*case "list":
          onList(data);
          break;*/
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

  /*function onList(data) {
    $scope.playerList = data.list;
  }*/

  //when a user logs in
  function onLogin(data) {
     /*if (data.success === false) {
        $timeout(function() {
          $scope.playerList = data.list;
          myConnection = $rootScope.myConnection;
          name = localStorageService.get("username");
        },500);
     } else {*/
        
        
        $timeout(function() {
          $scope.playerList = data.list;
        },500);

        //creating our RTCPeerConnection object
        var configuration = {
           "iceServers": [{ "url": "stun:stun.1.google.com:19302" }]
        };

        myConnection = new webkitRTCPeerConnection(configuration);
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
     //}
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
              offer: offer,
              name: connectedUser
           });

           myConnection.setLocalDescription(offer);
        }, function (error) {
           alert("An error has occurred.");
        });
     }
  };

  //when somebody wants to call us
  function onOffer(offer, name) {
    /*connectedUser = name;
    var hideSheet = $ionicActionSheet.show({
      destructiveText: 'Aceita',
      titleText: name + ' te desafiou. Aceita?',
      cancelText: 'Não, obrigado!',
      cancel: function() {
        console.log("cancel");
      },
      buttonClicked: function(index) {
        console.log("buttonClicked");
        return true;
      },
      destructiveButtonClicked: function(){
        myConnection.setRemoteDescription(new RTCSessionDescription(offer));
        myConnection.createAnswer(function (answer) {   
          myConnection.setLocalDescription(answer);
          send({
             type: "answer",
             answer: answer,
             accept: true,
             nameAdv: localStorageService.get("username") 
          });
          $rootScope.player1 = name;
          $rootScope.myConnection = myConnection;
          $state.go('app.multiPlayer');
        });
        
      }  
    });*/
    
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
        console.log(data.check);
        myConnection.setRemoteDescription(new RTCSessionDescription(data.answer));
        $rootScope.myConnection = myConnection;
        $rootScope.player2 = data.name;
        $state.go('app.multiPlayer');
      }else{
        alert('Não aceitou!');
        myConnection.setRemoteDescription(new RTCSessionDescription(data.answer));
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
