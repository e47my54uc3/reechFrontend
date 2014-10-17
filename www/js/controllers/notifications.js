function notificationsCtrl($scope, Notification, $rootScope, $filter){
	$rootScope.headerTitle = "Notifications";
	$scope.notifications = [];
	$scope.pageOptions = {page: 1, per_page: 10};
	$scope.noMoreNotificationsAvailable = false;

	$scope.setQuestion = function(notification_id, question_id, read){
		$scope.selectedQuestion = question_id;
		if(!read){
			Notification.update({id: notification_id, notification: {read: true}}, function(res){
				$filter('columnWith')($scope.notifications, 'id', notification_id)[0].read = true;
				$rootScope.currentUserProfile.notification_count -= 1;
				localStorage.currentUserProfile = JSON.stringify($rootScope.currentUserProfile);
			}, function(err){
				
			});
		}
	}

	$scope.fetchNotifications = function(){
		Notification.query($scope.pageOptions, function(data){
			$scope.notifications = $scope.notifications.concat(data);
			$rootScope.currentUserProfile.notification_count = $filter('columnWith')($scope.notifications, 'read', false).length
			localStorage.currentUserProfile = JSON.stringify($rootScope.currentUserProfile);
			$scope.count = $scope.notifications.length;
			$scope.noMoreNotificationsAvailable = false;
		});
		
	}

	$scope.loadMoreNotifications = function(){
	    if($scope.count == 10){
	      $scope.pageOptions.page+= 1;
	      $scope.noMoreNotificationsAvailable = false;
	      $scope.fetchNotifications();
	    }else{
	      $scope.noMoreNotificationsAvailable = true;
	    }
	    $rootScope.$broadcast('scroll.infiniteScrollComplete');
	}

	$scope.fetchNotifications();
}
