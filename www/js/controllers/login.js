function loginCtrl($scope, $location, Auth){
	var credentials = {
      phone_number: '999999999',
      password: 'test1234'
  };

  Auth.login(credentials).then(function(user) {
		//$location.path("/questions");
		console.log("In success");
  }, function(error) {
		console.log("In errors.");
      // Authentication failed...
  });

}
