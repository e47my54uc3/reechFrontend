// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
reech = angular.module('reech', ['ionic', 'ngResource', 'ngCordova', 'arrayFilters', 'Devise'])

reech.run(function($ionicPlatform, $rootScope, $location, $state, $stateParams, $http, User, $cordovaContacts, $cordovaDevice) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    //Set the landing page on page load.
    if (window.cordova) {
      //setup device
      $rootScope.device = {device_token: $cordovaDevice.getUUID(), platform: $cordovaDevice.getPlatform()}
      $cordovaContacts.find({filter: "", multiple: true, fields: ["emails", "displayName", "phoneNumbers"]}).then(function(result) {
        var fetchedContacts = result;
          $rootScope.contacts = new Object();

          for(var i=0; i < fetchedContacts.length; i++){
            if(fetchedContacts[i].displayName != null && fetchedContacts[i].displayName != ""){
              var name = fetchedContacts[i].displayName;
              var index = name.substring(0, 1).toUpperCase();

              if(name.length > 20){
                name = name.substring(0, 20) + '...';
              }

              if(fetchedContacts[i].phoneNumbers != null){
                for(var j=0; j<fetchedContacts[i].phoneNumbers.length; j++){
                  var number = fetchedContacts[i].phoneNumbers[j].value;

                  if(!$rootScope.contacts[index]){
                    $rootScope.contacts[index] = new Array();
                  }

                  $rootScope.contacts[index].push({"name": name, "number": number, type: "phone_number"});
                }
              }

              if(fetchedContacts[i].emails != null){
                for(var j=0; j<fetchedContacts[i].emails.length; j++){
                  var email = fetchedContacts[i].emails[j].value;

                  if(!$rootScope.contacts[index]){
                    $rootScope.contacts[index] = new Array();
                  }

                  $rootScope.contacts[index].push({"name": name, "email": email, type: "email"});
                }
              }
            }
          }
      }, function(err) {
        alert(err);
      });

    }else{
      // This is for browser testing only.
      $rootScope.device = {device_token: "forbrowseronly", platform: "Android" }
      $rootScope.contacts = [{displayName: "test1", phoneNumbers: [{value: "7832648723"}, {value: "7823687237"}], emails: [{value: "test@test.com"}]},
      {displayName: "rest1", phoneNumbers: [{value: "7832648723"}, {value: "7823687237"}], emails: [{value: "test@test.com"}]},
      {displayName: "gest1", phoneNumbers: [{value: "7832648723"}, {value: "7823687237"}], emails: [{value: "test@test.com"}]}];
    }

    if (!localStorage.inviteCode){
      $location.path("/reech");
    }

    else if(localStorage.currentUser) {
      $rootScope.setCurrentUser();
    }
    else {
      $location.path("/login");
    }

  });

  $rootScope.setCurrentUser = function() {
    $rootScope.currentUser = JSON.parse(localStorage.currentUser);
    $http.defaults.headers.common["X-User-Email"]= $rootScope.currentUser.email;
    $http.defaults.headers.common["X-User-Token"]= $rootScope.currentUser.authentication_token;
    if(localStorage.currentUserProfile){
      $rootScope.currentUserProfile = JSON.parse(localStorage.currentUserProfile);
    }
    else {
      $rootScope.setProfile();
    }
    $location.path("/connections");
  }

  $rootScope.signout = function() {
    $rootScope.currentUser = '';
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentUserProfile');
    $http.defaults.headers.common["X-User-Email"]= '';
    $http.defaults.headers.common["X-User-Token"]= '';
    $location.path("/login");
  }

  $rootScope.setProfile = function() {
    User.currentUserProfile(function(response){
      localStorage.currentUserProfile = JSON.stringify(response);
      $rootScope.currentUserProfile = JSON.parse(localStorage.currentUserProfile);
    });
  }

  $rootScope.back = function() {
    if($rootScope.previousState)
      $state.go($rootScope.previousState,$rootScope.previousStateParams);
    else
      $state.go('questions');
  };
  $rootScope.$on("$stateChangeSuccess",  function(event, toState, toParams, fromState, fromParams) {
    $rootScope.previousState = fromState.name;
    $rootScope.previousStateParams = fromParams;
    $rootScope.currentState = toState.name;
    $rootScope.currentStateParams = toParams;
  });

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
      controller: 'reechCtrl',
      templateUrl: 'templates/reech.html'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'loginCtrl'
    })
    .state('sign_up', {
      url: '/sign_up',
      templateUrl: 'templates/register.html',
      controller: 'registrationCtrl'
    })
    .state('sign_out', {
      url: '/sign_out',
      controller: 'signOutCtrl'
    })
    .state('questions', {
      url: '/questions',
      templateUrl: 'templates/questions.html'
    })
    .state('category_questions', {
      url: '/categories/:categoryId/questions',
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
      url: '/user/:id/profile',
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
    .state('questions_by_categories', {
      url: '/categories/questions',
      templateUrl: 'templates/questions.html'
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
    })
    .state('notifications', {
      url: '/notifications',
      templateUrl: 'templates/notifications.html',
      controller: 'notificationsCtrl'
    });;
    // if none of the above states are matched, use this as the fallback


    $urlRouterProvider.otherwise('/reech');



  });
//Connect to devise
reech.config(function(AuthProvider) {
  AuthProvider.loginPath(BaseUrl + 'users/sign_in');
  AuthProvider.loginMethod('POST');
  AuthProvider.registerMethod('POST');
  AuthProvider.registerPath(BaseUrl + 'users');
  AuthProvider.logoutPath(BaseUrl + 'users/sign_out');
  AuthProvider.logoutMethod('POST');
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
