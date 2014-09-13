function friendsCtrl($scope, User, Group) {
  $scope.groups = Group.query();
  $scope.friends = User.friends();
}
