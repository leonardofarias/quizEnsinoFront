angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('tabsController', {
    url: '/inicio',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('tabsController.quizEnsino', {
   url: '/inicio',
   views: {
     'tab5': {
       templateUrl: 'templates/quizEnsino.html',
       controller: 'quizEnsinoCtrl'
     }
   }
 })

  .state('tabsController.multiPlayer', {
    url: '/multi',
    views: {
      'tab5': {
        templateUrl: 'templates/multiPlayer.html',
        controller: 'multiPlayerCtrl'
      }
    }
  })

  .state('tabsController.single', {
    url: '/single',
    views: {
      'tab5': {
        templateUrl: 'templates/single.html',
        controller: 'singleCtrl'
      }
    }
  })

  .state('tabsController.listaDeJogadores', {
    url: '/lista-multi',
    views: {
      'tab5': {
        templateUrl: 'templates/listaDeJogadores.html',
        controller: 'listaDeJogadoresCtrl'
      }
    }
  })

  .state('tabsController.desafio', {
    url: '/desafio',
    views: {
      'tab6': {
        templateUrl: 'templates/desafio.html',
        controller: 'desafioCtrl'
      }
    }
  })

  .state('tabsController.pontuaO', {
    url: '/pontuacao',
    views: {
      'tab7': {
        templateUrl: 'templates/pontuaO.html',
        controller: 'pontuaOCtrl'
      }
    }
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

$urlRouterProvider.otherwise('/login')



});
