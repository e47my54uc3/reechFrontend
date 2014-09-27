function loginCtrl($scope, $rootScope, $location, Auth, $http, $window, User){
  if ($rootScope.currentUser) {
    $location.path("/categories");
  }

  else {

  	$scope.facebookLogin = function () {

      facebookConnectPlugin.login(["public_info", "me"], function(response){
        response = response.authResponse;
        alert(JSON.stringify(response));
        alert(response.email);
        if (response.email){
          User.authorizeFacebook({email: response.email, uid: response.id, first_name: response.first_name, last_name: response.last_name}, function(user){
            localStorage.currentUser = JSON.stringify(user);
            $rootScope.currentUser = JSON.parse(localStorage.currentUser);
            $http.defaults.headers.common["X-User-Email"]= $rootScope.currentUser.email;
            $http.defaults.headers.common["X-User-Token"]= $rootScope.currentUser.authentication_token;
            $rootScope.setProfile();
            $location.path("/categories");
          });
        }
      }, function(error){
        alert("Error logging in.");
      })
  	}
  	$scope.credentials = {};
  	$scope.login = function(){
  		Auth.login($scope.credentials).then(function(user) {
  		  localStorage.currentUser = JSON.stringify(user.user);
  			$rootScope.currentUser = JSON.parse(localStorage.currentUser);
  			$http.defaults.headers.common["X-User-Email"]= $rootScope.currentUser.email;
  			$http.defaults.headers.common["X-User-Token"]= $rootScope.currentUser.authentication_token;
        $rootScope.setProfile();
   			$location.path("/categories");
 			console.log(user.user);
    	}, function(error) {
  			console.log("In errors.");
        alert("Username and password do not match.")
    	});
  	}
  }

}
