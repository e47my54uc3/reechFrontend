function userSettingsCtrl($scope, UserSetting, User){	
  
  $scope.settings = ["question_gets_answer", "linked_to_new", "solution_gets_hi5", "friend_asks_help", "stared_question_gets_answer", "some_one_grabs_my_solution"];
  $scope.user = {old_password: "", password: "", password_confirmation: ""};
  $scope.initializeForNewUser = function(type){    
    angular.forEach($scope.settings, function(key){
      $scope.model[type][key] = true;
    });
  }

  UserSetting.get({'id': 'new'}, function(data){
  	$scope.model = data;
    $scope.model.reecher_id = $scope.currentUser.reecher_id;  	
  	if(data.id == null){
      $scope.initializeForNewUser('email_settings');
      $scope.initializeForNewUser('message_settings');	  
  		$scope.changeSetting();
  	}
  });
  

	$scope.changeSetting = function(){
		if($scope.model.id == null){
  		UserSetting.save({'user_settings': $scope.model}, function(data){
  			$scope.model = data.user_settings;alert("here")
  		});
  	}else{
  		UserSetting.update({'id': $scope.model.id, 'user_settings': $scope.model}, function(data){

  		});
  	}
	}
  $scope.changePassword = function(){
    User.update({id: $scope.currentUser.id, 
        user: $scope.user
      }, function(data) {
        alert("passwordChanged!");
      }, function(data) {
      $scope.isError = true;
      $scope.user.current_password = "";
      $scope.user.password = "";
      $scope.user.password_confirmation = "";
    });
  }


}
