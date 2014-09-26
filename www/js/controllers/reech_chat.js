function reechChatCtrl($scope, $rootScope, ReechChat){
	$scope.current_message = {from_user_id: $rootScope.currentUser.id, to_user_id: $scope.$parent.currentSolution.solution_owner_id, message: '', solution_id: $scope.$parent.currentSolution.id, status: 0};
	$scope.chats = ReechChat.query({solution_id: $scope.$parent.currentSolution.id});

	$scope.postMessage = function(){alert();
		var index = $scope.chats.length;
		$scope.chats[index] = $scope.current_message;
		ReechChat.save({reech_chat: $scope.current_message}, function(res){

		}, function(err){
			alert("error");
			$scope.chats[index].status = 2;
		})
	}
}