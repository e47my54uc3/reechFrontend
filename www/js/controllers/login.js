function loginCtrl($scope, $rootScope, $location, Auth, $http, $window){
    if ($rootScope.currentUser)
			$location.path("/categories");

		var url = BaseUrl + "users/auth/facebook";

	$scope.facebookLogin = function () {

		  var loginWindow;
			var queryString = '';
		  loginWindow = $window.open(url, '_blank', 'location=no,toolbar=no');
		  loginWindow.addEventListener('loadstart', function(evt) {
		    var url = decodeURIComponent(evt.url);
		    if (url.indexOf("auth_face_book") > 0 || url.indexOf("error=") > 0) {
		      if (url.indexOf("user=") > 0) {
						queryString = url.substr(url.indexOf('user=') + 5);
						queryString = queryString.substr(0, queryString.indexOf('#_=_'));

				  }
					loginWindow.close();
					$scope.facebookAfterLogin(queryString);
			}
		});
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
