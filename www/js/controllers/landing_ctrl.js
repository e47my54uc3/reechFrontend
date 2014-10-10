function landingCtrl($scope, $rootScope, $state, Auth, $http, $window, User, $cordovaSpinnerDialog){
  
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
            $state.go("categories");
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

}
