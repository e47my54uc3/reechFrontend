function notificationsCtrl($scope, Notification){
	$scope.notifications = Notification.query();

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