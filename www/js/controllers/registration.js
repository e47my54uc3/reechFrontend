function registrationCtrl($scope, $rootScope, $location, Auth, $http){

  $scope.user = {
    email: '',
    password: '',
    password_confirmation: '',
    phone_number: '',
    invite_id: localStorage.inviteId,
    invite_code: localStorage.inviteCode
  }

  $scope.register = function() {
    Auth.register($scope.user).then(function(user) {
      localStorage.currentUser = JSON.stringify(user);
      $rootScope.currentUser = JSON.parse(localStorage.currentUser);
      $http.defaults.headers.common["X-User-Email"]= $rootScope.currentUser.email;
      $http.defaults.headers.common["X-User-Token"]= $rootScope.currentUser.authentication_token;
      $location.path("/categories");
    }, function(error) {
      console.log(error.data);
    });
  }

}
