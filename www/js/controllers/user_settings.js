function userSettingsCtrl($scope, UserSetting){	
  UserSetting.get({'id': 'new', 'api_key': localStorage.apiKey, 'user_id': localStorage.apiId}, function(data){
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
  		UserSetting.save(angular.extend({'user_settings': $scope.model}, {'api_key': localStorage.apiKey, 'user_id': localStorage.apiId}), function(data){
  			$scope.model = data.user_settings; 
  		});
  	}else{  			
  		UserSetting.update(angular.extend({'user_settings': $scope.model}, {'id': $scope.model.id,'api_key': localStorage.apiKey, 'user_id': localStorage.apiId}), function(data){
  			
  		});
  	}  		
	}	    		
  

}