function loginCtrl($scope, $location, Session){
	if(localStorage.apiKey && localStorage.apiId){
		$location.path("/questions");
	}
	$scope.loginData = {'provider': 'standard', 'device_token': '', 'platform': ionic.Platform.platform()};
	$scope.login = function(){
		$scope.errors = "";
		Session.save({session: $scope.loginData}, function(response){
			localStorage.currentUser = response.current_user;
      $location.path("/questions");
		});
 	}

}
