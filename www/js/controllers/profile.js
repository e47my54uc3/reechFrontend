function profilesCtrl($scope, Profile, $ionicPopup){


  $scope.showConfirm = function() {
  	var confirmPopup = $ionicPopup.confirm({
  		
  		templateUrl: 'templates/help.html'
  	});
  	confirmPopup.then(function(res) {
  		if(res) {
  			console.log('You are sure');
  		} else {
  			console.log('You are not sure');
  		}
  	});
  };
   $scope.brands = [
     {title: "Like Reech? Tell your friends", apps: [
        {icon: 'ion-social-facebook'}
      , {icon: 'ion-android-share'}
      , {icon: 'ion-android-forums'}
      , {icon: 'ion-android-mail'}
    ]}
  ];
}