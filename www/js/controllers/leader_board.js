function leaderBoardCtrl($scope, User, $stateParams) {
	$scope.boardType = "today";
	$scope.$watch("boardType", function(){
		$scope.leaderBoard = User.leaderBoard({board_type: $scope.boardType});
	});
}
