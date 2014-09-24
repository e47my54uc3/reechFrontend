function profilesCtrl($scope, $ionicPopup, $stateParams, User){
    User.Profile({}, function(data){
      $scope.profile = data;
      $scope.attributes = { user: { phone_number: data.phone_number, user_profile_attributes: {location: data.location, blurb: data.blurb}}};
    });
    
    $scope.updateDetails = function(){      
      User.update($scope.attributes, function(data){
        alert("saved!");
      });
    }
   $scope.brands = [
     {title: "Like Reech? Tell your friends", apps: [
        {icon: 'ion-social-facebook'}
      , {icon: 'ion-android-share'}
      , {icon: 'ion-android-forums'}
      , {icon: 'ion-android-mail'}
    ]}
  ];
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
}