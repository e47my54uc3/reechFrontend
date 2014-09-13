function leaderBoardCtrl($scope, User, $stateParams) {
  $scope.leaderBoard = User.leaderBoard({board_type: $stateParams.boardType});

}
