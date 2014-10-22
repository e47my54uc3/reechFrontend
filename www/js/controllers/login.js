function loginCtrl($scope, $rootScope, $state, Auth, $http, $window, User, $cordovaSpinnerDialog){

	$scope.credentials = {device: $rootScope.device};
	$scope.login = function(){
		Auth.login($scope.credentials).then(function(user) {
		  	localStorage.currentUser = JSON.stringify(user.user);
			$rootScope.currentUser = JSON.parse(localStorage.currentUser);
			$http.defaults.headers.common["X-User-Email"]= $rootScope.currentUser.email;
			$http.defaults.headers.common["X-User-Token"]= $rootScope.currentUser.authentication_token;
      		$rootScope.setProfile();
      		$rootScope.pushNotification.register(function(result){
				alert("registered with GCM/APN successfully");
				if($rootScope.device.platform == "iOS"){
					$rootScope.device.device_token = result;
					localStorage.deviceToken = result;
					User.setDevice($rootScope.device, function(res){
					if(res.status == 200){
					  alert("iPhone Device registration success");
					}else{
					  alert("Something went wrong while registering your device");
					}
					});
				}
			}, function(){
				//alert("error");
			}, $rootScope.pushConfig);
 			$state.go("categories");
			}, function(error) {
				alert("Username and password do not match.")
  			});
	}


}
