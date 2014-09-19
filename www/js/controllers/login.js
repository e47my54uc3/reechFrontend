function loginCtrl($scope, $location, Session){
	if(localStorage.apiKey && localStorage.apiId){
		$location.path("/questions");
	}
	$scope.loginData = {'provider': 'standard', 'device_token': '', 'platform': ionic.Platform.platform()};
	$scope.login = function(){
		$scope.errors = "";
		Session.save({session: $scope.loginData}, function(data){
			if(data.status == 201){
				$scope.data = data;
				$scope.onLogin(data);
			}else{
				$scope.errors = data;
			}
		});
 	}

}
