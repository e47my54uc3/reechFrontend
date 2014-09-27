function reechCtrl($scope, $rootScope, $location){
  if (localStorage.inviteCode){
    alert(localStorage.inviteCode);
    $location.path("/login");
  }

}
