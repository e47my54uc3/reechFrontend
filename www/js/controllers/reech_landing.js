function reechCtrl($scope, $rootScope, $state, User){

  $scope.inviteForm = {};
  $rootScope.currentState = 'reech';

  $scope.registerInvite = function(){
    User.validateCode({code: $scope.inviteForm.code}, function(response){
      if (response.is_valid) {
        localStorage.inviteCode = true;
        localStorage.inviteId = response.invite_id;
        $state.go("landing");
      }
      else {
        alert("Please enter a valid code.")
      }
    });
  }
}
