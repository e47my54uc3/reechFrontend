// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
reech = angular.module('reech', ['ionic', 'ngResource', 'ngCordova', 'arrayFilters', 'Devise', 'ngLodash'])

reech.run(function($ionicPlatform, $rootScope, $location, $state, $stateParams, $http, User, $cordovaContacts, $cordovaDevice, lodash, $window) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)

    ionic.Platform.fullScreen();
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.hide();
    }

    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    //Set the landing page on page load.
    if (window.cordova) {
      //setup device
      $rootScope.pushNotification = $window.plugins.pushNotification;
      $rootScope.device = {device_token: localStorage.deviceToken, platform: $cordovaDevice.getPlatform()}
      $cordovaContacts.find({filter: "", multiple: true, fields: ["emails", "displayName", "phoneNumbers", "id"]}).then(function(result) {

       if($rootScope.device.platform == "iOS"){
         for(var con in result){
           if(result[con].name && result[con].name.formatted)
             result[con].displayName = result[con].name.formatted;
         }
       }
       $rootScope.allContacts = lodash.remove(result, function(item) { return (item.displayName || item.formatted) });
       $rootScope.allContacts = lodash.sortBy($rootScope.allContacts, function(item) {return (item.displayName ? item.displayName.toLowerCase() : item.displayName); })
       //$rootScope.contacts = lodash.groupBy($rootScope.contacts, function(item) {return item.displayName[0].toUpperCase(); });
       $rootScope.contacts = [];
       }, function(err) {
        alert(err);
      });

      // Notification configuaration

      if($cordovaDevice.getPlatform() == "android" || $cordovaDevice.getPlatform() == "Android"){
        $rootScope.pushConfig = {
          //for server
          "senderID": "88244655731",
          //for testing
          //"senderID": "908230974104",
          "ecb":"onNotification"
        };
      }else{
        $rootScope.pushConfig = {
          "badge":"true",
          "sound":"true",
          "alert":"true",
          "ecb":"onNotificationAPN"
        };
      }


      $window.onNotificationAPN = function(event){
        if ( event.message )
        {
          $rootScope.currentUserProfile.notification_count += 1;
          if(!$rootScope.$$phase){
            $rootScope.$apply();
          }
          localStorage.currentUserProfile = JSON.stringify($rootScope.currentUserProfile);
        }

        if ( event.sound )
        {
            var snd = new Media(event.sound);
            snd.play();
        }

        if ( event.badge )
        {
            $rootScope.pushNotification.setApplicationIconBadgeNumber(function(){}, function(){}, event.badge);
        }
      }

      $window.onNotification = function(e){
        switch( e.event )
          {
          case 'registered':
              if ( e.regid.length > 0 )
              {
                  $rootScope.device.device_token = e.regid;
                  localStorage.deviceToken = e.regid;
                  User.setDevice($rootScope.device, function(res){
                    if(res.status == 200){
                      //alert("Device registration success");
                    }else{
                      //alert("Something went wrong while registering your device");
                    }
                  });
              }
          break;

          case 'message':
              if ( e.foreground )
              {
                  $rootScope.currentUserProfile.notification_count += 1;
                  if(!$rootScope.$$phase){
                    $rootScope.$apply();
                  }
                  localStorage.currentUserProfile = JSON.stringify($rootScope.currentUserProfile);
              }
              else
              {
                  if ( e.coldstart )
                  {
                    //$state.go('notifications');
                  }
                  else
                  {
                    $state.go('notifications');
                  }
              }
          break;

          case 'error':
              alert("ERR  :  " + e.msg);
          break;

          default:
              alert("unknown event");
          break;
        }
      }


      //---notifications config. end



    }else{
      // This is for browser testing only.
      $rootScope.device = {device_token: "forbrowseronly2", platform: "Android" }
      $rootScope.allContacts = [{id: "1", rawId: "1", displayName: "test1", phoneNumbers: [{value: "7832648723"}, {value: "7823687237"}], emails: [{value: "test@test.com"}]},
      {id: "2", rawId: "2", displayName: "Test1", phoneNumbers: [{value: "7832648723"}, {value: "7823687237"}], emails: [{value: "kurapatijayaram@gmail.com"}]},
      {id: "3", rawId: "3", displayName: '', phoneNumbers: [{value: "7832648723"}, {value: "7823687237"}], emails: [{value: "test@test.com"}]}];
      $rootScope.allContacts = lodash.remove($rootScope.allContacts, function(item) { return item.displayName });
      $rootScope.allContacts = lodash.sortBy($rootScope.allContacts, function(item) {return toString(item.displayName).toLowerCase(); })
      //$rootScope.contacts = lodash.groupBy($rootScope.contacts, function(item) {return item.displayName[0].toUpperCase(); });
      $rootScope.contacts = [];
    }
    // Infinite scroll of contacts in all places.
    $rootScope.loadMore = function() {
      var loadContacts = $rootScope.contacts.length;
      for(var i=1; i <= 20; i++){
        if($rootScope.allContacts.length > loadContacts + i - 1) {
          $rootScope.contacts.push($rootScope.allContacts[loadContacts + i - 1]);
        }
        else {
          $rootScope.noMoreItemsAvailable = true;
          break;
        }
      }

      $rootScope.$broadcast('scroll.infiniteScrollComplete');
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
  }

  $rootScope.signout = function() {
    $rootScope.currentUser = '';
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentUserProfile');
    localStorage.removeItem('deviceToken');
    localStorage.removeItem('selectedCategoriesIds');
    $http.defaults.headers.common["X-User-Email"]= '';
    $http.defaults.headers.common["X-User-Token"]= '';
    $rootScope.pushNotification.unregister(function(){
      alert("successfully unregistered.");
    }, function(){
      alert("Error while unregistering ur device from GCM.");
    })
    $state.go("landing");
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
    if(localStorage.currentUser != undefined)  {
      $rootScope.setCurrentUser();
      if(!toState.requireUser)
        $state.go('categories');
    }else{
      if(toState.requireNone && (localStorage.inviteCode != undefined)){
        $state.go('landing');
      }else if(toState.requireInviteCode && !localStorage.inviteCode){
        $state.go('reech');
      }else if(toState.requireUser){
        if((localStorage.inviteCode != undefined))
          $state.go('landing');
        else
          $state.go('reech');
      }
    }


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
      templateUrl: 'templates/reech.html',
      requireNone: true
    })
    .state('landing', {
      url: '/landing',
      templateUrl: 'templates/landing.html',
      controller: 'landingCtrl',
      requireInviteCode: true
    })
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'loginCtrl',
      requireInviteCode: true
    })
    .state('sign_up', {
      url: '/sign_up',
      templateUrl: 'templates/register.html',
      controller: 'registrationCtrl',
      requireInviteCode: true
    })
    .state('questions', {
      url: '/questions',
      templateUrl: 'templates/questions.html',
      requireUser: true
    })
    .state('category_questions', {
      url: '/categories/:categoryId/questions',
      templateUrl: 'templates/questions.html',
      requireUser: true
    })
    .state('friends', {
      url: '/friends',
      templateUrl: 'templates/friends.html',
      controller: 'friendsCtrl',
      requireUser: true
    })
    .state('categories', {
      url: '/categories',
      templateUrl: 'templates/categories.html',
      controller: 'categoriesCtrl',
      requireUser: true
    })
    .state('questions_by_categories', {
      url: '/categories/questions',
      templateUrl: 'templates/questions.html',
      requireUser: true
    })
    .state('ask_a_question', {
      url: '/ask_a_question',
      templateUrl: 'templates/ask_a_question.html',
      requireUser: true
    })
    .state('connections', {
      url: '/connections',
      templateUrl: 'templates/connections.html',
      controller: 'connectionsCtrl',
      requireUser: true
    })
    .state('notifications', {
      url: '/notifications',
      templateUrl: 'templates/notifications.html',
      controller: 'notificationsCtrl',
      requireUser: true
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
  var interceptor = function($q, $location, $injector) {
    return {
      'responseError': function(rejection) {
        if (rejection.status == 401) {
          delete localStorage.currentUser;
          if ($location.path().indexOf('landing') < 0) {
            window.location.reload();
            $state = $injector.get('$state');
            $state.go('landing');
          }
        }
        if (rejection.status == 403) {
          $state = $injector.get('$state');
          $state.go('categories');
        }
        return $q.reject(rejection);
      }
    };
  };
  $httpProvider.interceptors.push(interceptor);
});
