function userSettingsCtrl($scope, UserSetting){
  UserSetting.get(angular.extend({'id': 'new'}, $scope.apiParams), function(data){
  	$scope.model = data;
  	if(data.id == null){
  		angular.forEach($scope.model, function(value, key){
  			if(key != "id")
  				$scope.model[key] = true;
  		});
  		$scope.model['reecher_id'] = localStorage.apiId;
  		$scope.changeSetting();
  	}
  });
	$scope.changeSetting = function(){
		if($scope.model.id == null){
  		UserSetting.save(angular.extend({'user_settings': $scope.model}, $scope.apiParams), function(data){
  			$scope.model = data.user_settings;
  		});
  	}else{
  		UserSetting.update(angular.extend({'id': $scope.model.id, 'user_settings': $scope.model}, $scope.apiParams), function(data){

  		});
  	}
	}


}
