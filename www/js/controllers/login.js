function loginCtrl($scope, $rootScope, $location, Auth, $http){
	if(localStorage.currentUser)
		$location.path("/categories");

	$scope.credentials = {};
	$scope.login = function(){
		Auth.login($scope.credentials).then(function(user) {
			localStorage.currentUser = JSON.stringify(user.user);
			$rootScope.currentUser = JSON.parse(localStorage.currentUser);
			$http.defaults.headers.common["X-User-Email"]= $rootScope.currentUser.email;
			$http.defaults.headers.common["X-User-Token"]= $rootScope.currentUser.authentication_token;
			$location.path("/categories");
			console.log(user.user);
  	}, function(error) {
			console.log("In errors.");
      // Authentication failed...
  	});
	}

}
