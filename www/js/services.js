angular.module('app.services', [])

.service('IssueService', function($http){

  var service = {};
  var urlBase = 'http://localhost:8080/resteasy/rest/issues';

  service.get = function(callback) {
            $http.get(urlBase + '/get')
                .success(function(response, status, headers, config) {
                    callback(response)
                })
                .error(function(response, status, headers, config) {
                    callback(response);
                });
        };

  return service;


})

.service('UserService', function($http){

  var service = {};
  var urlBase = 'http://localhost:8080/resteasy/rest/player';

  service.save = function(user, callback) {
            $http.put(urlBase + '/save', user)
                .success(function(response, status, headers, config) {
                    callback(response)
                })
                .error(function(response, status, headers, config) {
                    callback(response);
                });
        };

  service.get = function(user, callback) {
            var query = "?email=" + user.email + "&password=" + user.password;
            $http.get(urlBase + '/get/' + query)
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
  var urlBase = 'http://localhost:8080/resteasy/rest/statistics-one-player';

  service.save = function(issue,namePlayer,checkAnswer, callback) {
            var query = "?idIssue=" + issue.idIssue + "&namePlayer=" + namePlayer +
            "&checkAnswer=" + checkAnswer;
            $http.put(urlBase + '/save/' + query)
                .success(function(response, status, headers, config) {
                    callback(response)
                })
                .error(function(response, status, headers, config) {
                    callback(response);
                });
        };

  service.get = function(user, callback) {
            $http.get(urlBase + '/get', user)
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
