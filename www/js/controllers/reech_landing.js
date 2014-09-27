function reechCtrl($scope, $rootScope, $location, User){
  $scope.inviteForm = {};

  $scope.registerInvite = function(){
    User.validateCode({code: $scope.inviteForm.code}, function(response){
      if (response.is_valid) {
        localStorage.inviteCode = true;
        localStorage.inviteId = response.invite_id;
        $location.path("/login");
      }
      else {
        alert("Please enter a valid code.")
      }
    });
  }
}
