function loginCtrl($scope, $location, Session){
	$scope.loginData = {'provider': 'standard', 'device_token': '', 'platform': ionic.Platform.platform()};
	$scope.login = function(){
		$scope.errors = "";
		Session.save($scope.loginData, function(data){
			if(data.status == 201){
				$scope.data = data;
				$scope.onLogin(data);
			}else{
				$scope.errors = data;
			}
			
		});		
 	}
 	 
}