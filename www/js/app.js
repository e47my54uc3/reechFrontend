// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
reech = angular.module('reech', ['ionic', 'ngResource', 'ngCordova', 'arrayFilters', 'Devise'])

reech.run(function($ionicPlatform, $rootScope, $location, $state, $stateParams, $http) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    //Check if authenticated on page load.

    if(localStorage.currentUser) {
      $rootScope.currentUser = JSON.parse(localStorage.currentUser);
      $http.defaults.headers.common["X-User-Email"]= $rootScope.currentUser.email;
      $http.defaults.headers.common["X-User-Token"]= $rootScope.currentUser.authentication_token;
      $location.path("/categories");
    }
    else {
      $location.path("/login");
    }
  });

  $rootScope.back = function() {
    if($rootScope.previousState)
      $state.go($rootScope.previousState,$rootScope.previousStateParams);
    else
      $state.go('questions');
  };
})


reech.filter('range', function() {
  return function(input, total) {
    total = parseInt(total);
    for (var i=0; i<total; i++)
      input.push(i);
    return input;
  };
});

reech.config(function ($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider
    .state('reech', {
      url: '/reech',

      templateUrl: 'templates/reech.html'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'loginCtrl'
    })
    .state('sign_out', {
      url: '/sign_out',
      controller: 'signOutCtrl'
    })
    .state('questions', {
      url: '/questions',
      templateUrl: 'templates/questions.html'
    })
    .state('friends', {
      url: '/friends',
      templateUrl: 'templates/friends.html',
      controller: 'friendsCtrl'
    })
    .state('user_settings', {
      url: '/user_settings',
      templateUrl: 'templates/user_settings.html'
    })
    .state('profile', {
      url: '/profile',
      templateUrl: 'templates/profile.html',
      controller: 'profilesCtrl'
    })
    .state('leader_board', {
      url: '/leader_board',
      templateUrl: 'templates/leader_board.html',
      controller: 'leaderBoardCtrl'
    })
    .state('categories', {
      url: '/categories',
      templateUrl: 'templates/categories.html',
      controller: 'categoriesCtrl'
    })
    .state('ask_a_question', {
      url: '/ask_a_question',
      templateUrl: 'templates/ask_a_question.html',
      controller: 'askAQuestionCtrl'
    })
    .state('connections', {
      url: '/connections',
      templateUrl: 'templates/connections.html',
      controller: 'connectionsCtrl'
    });
    // if none of the above states are matched, use this as the fallback

    $urlRouterProvider.otherwise('/login');
  });
//Connect to devise
reech.config(function(AuthProvider) {
  AuthProvider.loginPath(BaseUrl + 'users/sign_in');
  AuthProvider.loginMethod('POST');
});

reech.config(function($httpProvider) {
  var interceptor = function($q, $location) {
    return {
      'responseError': function(rejection) {
        if (rejection.status == 401) {
          localStorage.currentUser = '';
          if ($location.path().indexOf('login') < 0) {
            $location.path('/login');
          }
        }
        if (rejection.status == 403) {
          $location.path('/categories');
        }
        return $q.reject(rejection);
      }
    };
  };
  $httpProvider.interceptors.push(interceptor);
});
