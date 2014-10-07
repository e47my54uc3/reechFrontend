function reechCtrl($scope, $rootScope, $location, User){
  if(localStorage.inviteCode)
    $location.path("/landing");
  $scope.inviteForm = {};
  $rootScope.currentState = 'reech';

  $scope.registerInvite = function(){
    User.validateCode({code: $scope.inviteForm.code}, function(response){
      if (response.is_valid) {
        localStorage.inviteCode = true;
        localStorage.inviteId = response.invite_id;
        $location.path("/landing");
      }
      else {
        alert("Please enter a valid code.")
      }
    });
  }
}
