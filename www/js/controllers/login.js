function loginCtrl($scope, $rootScope, $location, Auth, $http, $window, User, $cordovaSpinnerDialog){
  if ($rootScope.currentUser) {
    $location.path("/categories");
  }

  else {

  	$scope.facebookLogin = function () {
      if(window.cordova) {
        facebookConnectPlugin.login(["email"], function(response){
          if(response.authResponse && response.authResponse.accessToken){
            $cordovaSpinnerDialog.show();
            User.authorizeFacebook({access_token: response.authResponse.accessToken, device: $rootScope.device, invite_id: localStorage.inviteId,
            invite_code: localStorage.inviteCode,}, function(response){
              localStorage.currentUser = JSON.stringify(response);
              $rootScope.currentUser = JSON.parse(localStorage.currentUser);
              $http.defaults.headers.common["X-User-Email"]= $rootScope.currentUser.email;
              $http.defaults.headers.common["X-User-Token"]= $rootScope.currentUser.authentication_token;
              $rootScope.setProfile();
              $cordovaSpinnerDialog.hide();
              $location.path("/categories");
            });
          }
          else {
            alert("Not authenticated. Try again later");
            $rootScope.spinner.hide();
          }
        }, function(error){
          alert("Something went wrong. Try again later.");
          $rootScope.spinner.hide();
        });
      }
  	}
  	$scope.credentials = {device: $rootScope.device};
  	$scope.login = function(){
  		Auth.login($scope.credentials).then(function(user) {
  		  localStorage.currentUser = JSON.stringify(user.user);
  			$rootScope.currentUser = JSON.parse(localStorage.currentUser);
  			$http.defaults.headers.common["X-User-Email"]= $rootScope.currentUser.email;
  			$http.defaults.headers.common["X-User-Token"]= $rootScope.currentUser.authentication_token;
        $rootScope.setProfile();
   			$location.path("/categories");
 			}, function(error) {
  			alert("Username and password do not match.")
    	});
  	}
  }

}
