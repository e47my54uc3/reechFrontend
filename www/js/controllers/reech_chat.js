function reechChatCtrl($scope, $rootScope, ReechChat, $ionicScrollDelegate){
	$scope.fetchChats = function(){
		$scope.current_message = {from_user_id: $rootScope.currentUser.id, to_user_id: $scope.$parent.currentChatMemberId, message: '', solution_id: $scope.$parent.currentSolution.id, status: 0};
		ReechChat.query({solution_id: $scope.$parent.currentSolution.id, 'member_ids[]': [$rootScope.currentUser.id, $scope.$parent.currentChatMemberId]}, function(response){
			$scope.chats = response;
			$scope.scrollToChatBottom();
		});		
		
	}
  $scope.$watch('$parent.currentChatMemberId', function(){
  	$scope.fetchChats();
  });
  
  $scope.scrollToChatBottom = function() {
    $ionicScrollDelegate.$getByHandle('chat').scrollBottom();
  };
	$scope.postMessage = function(){
		if($scope.current_message.message && $scope.$parent.currentChatMemberId)
		{				
			var index = $scope.chats.length;
			$scope.chats[index] = angular.copy($scope.current_message);
			ReechChat.save({reech_chat: $scope.current_message}, function(res){
				if(res.status == 200){
					$scope.chats[index] = res.reech_chats;
					$scope.scrollToChatBottom();
					$scope.current_message = {from_user_id: $rootScope.currentUser.id, to_user_id: $scope.$parent.currentChatMemberId, message: '', solution_id: $scope.$parent.currentSolution.id, status: 0};
				}

			}, function(err){
				alert("error");
				$scope.chats[index].status = 2;
				$scope.current_message = {from_user_id: $rootScope.currentUser.id, to_user_id: $scope.$parent.currentChatMemberId, message: '', solution_id: $scope.$parent.currentSolution.id, status: 0};
			});
		}
	}
}