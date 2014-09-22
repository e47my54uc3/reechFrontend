function loginCtrl($scope, $rootScope, $location, Auth, $http){
	var credentials = {
      phone_number: '9999999999',
      password: 'test1234'
  };

  Auth.login(credentials).then(function(user) {
		localStorage.currentUser = JSON.stringify(user.user);
		$rootScope.currentUser = JSON.parse(localStorage.currentUser);
		$http.defaults.headers.common["X-User-Email"]= $rootScope.currentUser.email;
		$http.defaults.headers.common["X-User-Token"]= $rootScope.currentUser.authentication_token;
		$location.path("/questions");
		console.log(user.user);
  }, function(error) {
		console.log("In errors.");
      // Authentication failed...
  });

}
