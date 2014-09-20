function signOutCtrl($scope, $state, $ionicPopup, Session){
	Session.logOut($scope.apiParams, function(response){
		var alertPopup = $ionicPopup.alert({
     	title: 'SignedOut!',
     	template: 'SignedOut successfully!'
   	});
   	alertPopup.then(function(res) {
   	 delete localStorage.apiKey;
   	 delete localStorage.apiId;
   	 delete localStorage.currentUser;
     $state.go('login');
   	});
  });	
}