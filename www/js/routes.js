angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('app', {
    url: '/quizEnsino',
    templateUrl: 'templates/tabsController.html',
    abstract:false
  })

  .state('app.quizEnsino', {
   url: '/inicio',
   views: {
     'home': {
       templateUrl: 'templates/quizEnsino.html',
       controller: 'QuizEnsinoCtrl'
     }
   }
  })

  .state('app.single', {
    url: '/quizEnsino/single/{area}',
    views:{
      'home':{
        templateUrl: 'templates/single.html',
        controller: 'SingleCtrl'
      }
    }
  })

  .state('app.multiPlayer', {
    url: '/multi',
    views: {
      'home': {
        templateUrl: 'templates/multiPlayer.html',
        controller: 'MultiPlayerCtrl'
      }
    }
  })

  .state('app.listaDeJogadores', {
    url: '/lista-multi',
    views:{
      'home':{
        templateUrl: 'templates/listaDeJogadores.html',
        controller: 'ListaDeJogadoresCtrl'
      }
    }
  })

  .state('app.ranking', {
    cache: false,
    url: '/ranking',
    views: {
      'ranking':{
        templateUrl:'templates/ranking.html',
        controller: 'RankingCtrl'
      }
    }
  })

  .state('app.config', {
    cache: false,
    url: '/config',
    views: {
      'config':{
        templateUrl:'templates/config.html',
        controller: 'ConfigCtrl'
      }
    }
  })

  .state('app.challenge', {
    cache: false,
    url: '/desafio',
    views: {
      'challenge': {
        templateUrl: 'templates/desafio.html',
        controller: 'ChallengeCtrl'
      }
    }
  })

  .state('app.stats', {
    cache: false,
    url: '/stats',
    views: {
      'stats': {
        templateUrl: 'templates/stats.html',
        controller: 'StatsCtrl'
      }
    }
  })

  .state('login', {
    cache: false,
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })

  .state('signin', {
    cache: false,
    url: '/signin',
    templateUrl: 'templates/signin.html',
    controller: 'LoginCtrl'
  })

$urlRouterProvider.otherwise('/login')



});


/*
angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('app', {
    url: '/quizEnsino',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('app.quizEnsino', {
   url: '/inicio',
   views: {
     'tab5@app': {
       templateUrl: 'templates/quizEnsino.html',
       controller: 'QuizEnsinoCtrl'
     }
   }
  })

  .state('app.ranking', {
    cache: false,
    url: '/ranking',
    views: {
      'tab11':{
        templateUrl:'templates/ranking.html',
        controller: 'RankingCtrl'
      }
    }
  })

  .state('app.config', {
    cache: false,
    url: '/config',
    views: {
      'tab5@app':{
        templateUrl:'templates/config.html',
        controller: 'ConfigCtrl'
      }
    }
  })

  .state('app.single', {
    cache: false,
    url: '/single/{area}',
    views: {
      'tab5@app': {
        templateUrl: 'templates/single.html',
        controller: 'SingleCtrl'
      }
    }
  })

  .state('app.multiPlayer', {
    cache: false,
    url: '/multi',
    views: {
      'tab12': {
        templateUrl: 'templates/multiPlayer.html',
        controller: 'MultiPlayerCtrl'
      }
    }
  })

  .state('app.listaDeJogadores', {
    cache: false,
    url: '/lista-multi',
    views:{
      'tab5@app':{
        templateUrl: 'templates/listaDeJogadores.html',
        controller: 'ListaDeJogadoresCtrl'
      }
    }
  })

  .state('app.desafio', {
    cache: false,
    url: '/desafio',
    views: {
      'tab9': {
        templateUrl: 'templates/desafio.html',
        controller: 'ChallengeCtrl'
      }
    }
  })

  .state('app.stats', {
    cache: false,
    url: '/stats',
    views: {
      'tab10': {
        templateUrl: 'templates/stats.html',
        controller: 'StatsCtrl'
      }
    }
  })

  .state('login', {
    cache: false,
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })

  .state('signin', {
    cache: false,
    url: '/signin',
    templateUrl: 'templates/signin.html',
    controller: 'LoginCtrl'
  })

$urlRouterProvider.otherwise('/login')



});
*/
