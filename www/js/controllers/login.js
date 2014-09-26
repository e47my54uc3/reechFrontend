function loginCtrl($scope, $rootScope, $location, Auth, $http, $window){


		var url = BaseUrl + "users/auth/facebook";

	$scope.facebookLogin = function () {
    if(!window.cordova) {
      facebookConnectPlugin.browserInit('1493228840925351');
    }
    facebookConnectPlugin.login(["public_info", "email"], function(response){
      alert("In success.");
      alert("UserInfo: " + JSON.stringify(response));
    })
	}

	$scope.facebookAfterLogin = function (user) {
    localStorage.currentUser = user;
		$rootScope.currentUser = JSON.parse(localStorage.currentUser);
		$http.defaults.headers.common["X-User-Email"]= $rootScope.currentUser.email;
		$http.defaults.headers.common["X-User-Token"]= $rootScope.currentUser.authentication_token;
		$window.location.reload();
		console.log($rootScope.currentUser);
	}


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
