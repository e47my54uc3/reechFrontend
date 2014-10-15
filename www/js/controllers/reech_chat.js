function reechChatCtrl($scope, $rootScope, ReechChat, $interval){
	$scope.current_message = {from_user_id: $rootScope.currentUser.id, to_user_id: $scope.$parent.currentChatMemberId, message: '', solution_id: $scope.$parent.currentSolution.id, status: 0};
	$scope.chats = ReechChat.query({solution_id: $scope.$parent.currentSolution.id});

	$scope.postMessage = function(){
		var index = $scope.chats.length;
		$scope.chats[index] = angular.copy($scope.current_message);
		if($scope.current_message.from_user_id != $scope.current_message.to_user_id)
			ReechChat.save({reech_chat: $scope.current_message}, function(res){
				if(res.status == 200){
					$scope.chats[index].status = 1;
					$scope.current_message = {from_user_id: $rootScope.currentUser.id, to_user_id: $scope.$parent.currentChatMemberId, message: '', solution_id: $scope.$parent.currentSolution.id, status: 0};
				}

			}, function(err){
				alert("error");
				$scope.chats[index].status = 2;
				$scope.current_message = {from_user_id: $rootScope.currentUser.id, to_user_id: $scope.$parent.currentChatMemberId, message: '', solution_id: $scope.$parent.currentSolution.id, status: 0};
			});
	}
}