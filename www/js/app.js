// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
reech = angular.module('reech', ['ionic', 'ngResource', 'ngCordova', 'arrayFilters'])

reech.run(function($ionicPlatform, $rootScope, $location, $state, $stateParams) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

  $rootScope.$on("$stateChangeSuccess",  function(event, toState, toParams, fromState, fromParams) {
    $rootScope.previousState = fromState.name;
    $rootScope.previousStateParams = fromParams;
    $rootScope.apiParams = {'api_key': localStorage.apiKey, 'user_id': localStorage.apiId};
  });
  
  $rootScope.back = function() {
    if($rootScope.previousState)
      $state.go($rootScope.previousState,$rootScope.previousStateParams);
    else
      $state.go('questions');
  };
  
  $rootScope.onLogin = function(data){
    localStorage.apiKey = data.api_key;
    localStorage.apiId = data.user_id; 
    $location.path("/questions");    
  }
})

reech.config(function($httpProvider) {
  var interceptor = function($q, $location) {
    return {
      'responseError': function(rejection) {
        if (rejection.status == 401) {
          if ($location.path().indexOf('login') < 0) {
            $location.path('/sign_out');
          }
        }
        if (rejection.status == 403) {
          $location.path('/');
        }
        return $q.reject(rejection);
      }
    };
  };
  $httpProvider.interceptors.push(interceptor);
});

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
    .state('questions', {
      url: '/questions',        
      templateUrl: 'templates/questions.html',
      controller: 'questionsCtrl'       
    })
    .state('friends', {
      url: '/friends',
      templateUrl: 'templates/friends.html',
      controller: 'friendsCtrl'
    })
    .state('user_settings', {
      url: '/user_settings',
      templateUrl: 'templates/user_settings.html',
      controller: 'userSettingsCtrl'
    })
    .state('leader_board', {
      url: '/leader_board/:boardType',
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
    });
    // if none of the above states are matched, use this as the fallback

    $urlRouterProvider.otherwise('/login');



  });
