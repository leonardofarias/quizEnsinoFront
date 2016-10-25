angular.module('app.services', [])

.service('IssueService', function($http){

  var service = {};
  var address = 'appquizensinowildfly-leoprojects.rhcloud.com'; 
  var urlBase = 'http://' + address+  '/rest/issues';

  service.get = function(callback) {
            $http.get(urlBase + '/get')
                .success(function(response, status, headers, config) {
                    callback(response)
                })
                .error(function(response, status, headers, config) {
                    callback(response);
                });
        };


  service.getByArea = function(area, callback) {
            $http.get(urlBase + '/getByArea', {params: {area: area}})
                .success(function(response, status, headers, config) {
                    callback(response)
                })
                .error(function(response, status, headers, config) {
                    callback(response);
                });
        };

  return service;


})

.service('UserService', function($http, $ionicLoading){

  var service = {};
  var address = 'appquizensinowildfly-leoprojects.rhcloud.com';
  var urlBase = 'http://' + address+  '/rest/player';
  
  service.save = function(user, callback) {
    $http.put(urlBase + '/save', user)
    .success(function(response, status, headers, config) {
        callback(response)
    })
    .error(function(response, status, headers, config) {
        callback(response);
    });
  };

  service.getUser = function(user, callback) {
    var query = "?email=" + user.email + "&password=" + user.password;
    $http.get(urlBase + '/get/' + query)
    .success(function(response, status, headers, config) {
        callback(response)
    })
    .error(function(response, status, headers, config) {
        callback(response);
    });
  };

  service.getUserByIdFacebook = function(id, callback) {
    var query = "?id=" + id;
    $http.get(urlBase + '/getUserByIdFacebook/' + query)
    .success(function(response, status, headers, config) {
        callback(response)
    })
    .error(function(response, status, headers, config) {
        callback(response);
    });
  };

  return service;
        
})

.service('StatisticsService', function($http){

  var service = {};
  var address = 'appquizensinowildfly-leoprojects.rhcloud.com';
  var urlBase = 'http://' + address+  '/rest/statistics-one-player';

  service.save = function(issue,name,checkAnswer, callback) {
            
            var query = "?idIssue=" + issue.idIssue + "&name=" + name +
            "&checkAnswer=" + checkAnswer;
            $http.put(urlBase + '/save/' + query)
                .success(function(response, status, headers, config) {
                    callback(response)
                })
                .error(function(response, status, headers, config) {
                    callback(response);
                });
        };

  service.getStatistics = function(name, callback) {
      
            var query = "?name=" + name;
            $http.get(urlBase + '/get' + query)
                .success(function(response, status, headers, config) {
                    callback(response)
                })
                .error(function(response, status, headers, config) {
                    callback(response);
                });
        };

  service.getStatisticsByAreaName = function(area,name, callback) {
      
            $http.get(urlBase + '/getByAreaName',{params: {area: area, name: name}})
                .success(function(response, status, headers, config) {
                    callback(response)
                })
                .error(function(response, status, headers, config) {
                    callback(response);
                });
        };

  return service;

})

.service('StatisticsMultiService', function($http){

  var service = {};
  var address = 'appquizensinowildfly-leoprojects.rhcloud.com';
  var urlBase = 'http://' + address+  '/rest/statistics-multi-player';

  service.getStatistics = function(name, callback) {
      
            var query = "?name=" + name;
            $http.get(urlBase + '/get' + query)
                .success(function(response, status, headers, config) {
                    callback(response)
                })
                .error(function(response, status, headers, config) {
                    callback(response);
                });
        };

  return service;

})

.service('RankingService', function($http){

  var service = {};
  var address = 'appquizensinowildfly-leoprojects.rhcloud.com'; 
  var urlBase = 'http://' + address+  '/rest/ranking';

  service.getRanking = function(callback) {
            $http.get(urlBase + '/getRanking')
                .success(function(response, status, headers, config) {
                    callback(response)
                })
                .error(function(response, status, headers, config) {
                    callback(response);
                });
        };

  return service;


})

.service('ChallengeService', function($http){

  var service = {};
  var address = 'appquizensinowildfly-leoprojects.rhcloud.com';
  var urlBase = 'http://' + address+  '/rest/challenge';

  service.save = function(pontuacao,pontuacaoAdv,name,nameAdv, callback) {
            
            var query = "?pontuacao=" + pontuacao + "&pontuacaoAdv=" + pontuacaoAdv +
            "&name=" + name + "&nameAdv=" + nameAdv;
            $http.put(urlBase + '/save/' + query)
                .success(function(response, status, headers, config) {
                    callback(response)
                })
                .error(function(response, status, headers, config) {
                    callback(response);
                });
        };

  return service;

})

.factory('StorageService', function ($localStorage) {

var _getAll = function () {
  return $localStorage.things;
};
var _add = function (thing) {
  $localStorage.things.push(thing);
}
var _remove = function (thing) {
  $localStorage.things.splice($localStorage.things.indexOf(thing), 1);
}
return {
    getAll: _getAll,
    add: _add,
    remove: _remove
  };
})

.service('BlankService', [function(){

}]);
