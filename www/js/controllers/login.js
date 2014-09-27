function loginCtrl($scope, $rootScope, $location, Auth, $http, $window, User){
  if ($rootScope.currentUser) {
    $location.path("/categories");
  }

  else {

  	$scope.facebookLogin = function () {
      if(!window.cordova) {
        facebookConnectPlugin.browserInit('1493228840925351');
      }
      facebookConnectPlugin.login(["public_info", "email"], function(response){
        User.authorizeFacebook({email: response.email, uid: response.id, first_name: response.first_name, last_name: response.last_name}, function(user){
          $rootScope.setCurrentUser();
        });
      }, function(){
        alert("Error logging in.");
      })
  	}
  	$scope.credentials = {};
  	$scope.login = function(){
  		Auth.login($scope.credentials).then(function(user) {
  		  $rootScope.setCurrentUser();
    	}, function(error) {
  			console.log("In errors.");
        alert("Username and password do not match.")
    	});
  	}
  }

}
