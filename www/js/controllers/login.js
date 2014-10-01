function loginCtrl($scope, $rootScope, $location, Auth, $http, $window, User){
  if ($rootScope.currentUser) {
    $location.path("/categories");
  }

  else {

  	$scope.facebookLogin = function () {

      
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
 			}, function(error) {
  			alert("Username and password do not match.")
    	});
  	}
  }

}
