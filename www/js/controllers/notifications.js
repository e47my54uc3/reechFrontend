function notificationsCtrl($scope, Notification, $rootScope){
	$scope.notifications = Notification.query();
	$scope.$watch('notifications', function(newValue, oldValue){
		if(newValue != oldValue){
			$rootScope.currentUserProfile.notification_count = $scope.notifications.length;	
			localStorage.currentUserProfile = JSON.stringify($rootScope.currentUserProfile);
		}
	}, true);
	
	$rootScope.headerTitle = "Notifications";

	$scope.setQuestion = function(notification_id, question_id, read){
		$scope.$parent.selectedQuestion = question_id;
		if(!read){
			Notification.update({id: notification_id, notification: {read: true}}, function(res){
				console.log("updated");
			}, function(err){
				console.log("error");
			});
		}
	}

	$scope.refresh = function(){
		window.location.reload();
	}
}
