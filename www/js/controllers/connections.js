function connectionsCtrl($scope, User, Group, $ionicModal, $filter, $location, $rootScope){
	$scope.friends_list = User.friends();
	$scope.groups = Group.query();
	$scope.group = {group_id: "", associated_user_id: ""};
	$scope.new_group = {member_reecher_ids: [], reecher_id: "", name: ""};
	$scope.refresh_page = false;
	$scope.openGroupModal = function(group_id) {
		$scope.current_group = $filter('columnWith')($scope.groups, 'id', group_id)[0];
		$ionicModal.fromTemplateUrl('/templates/group_members.html', {
			scope: $scope,
			animation: 'slide-in-up'
		}).then(function(modal) {
			$scope.modal = modal;
			$scope.modal.show();
		});
	};

	$scope.openMemberModal = function(member_id) {
		$scope.group = {group_id: [], associated_user_id: ""};
		$scope.current_member = $filter('columnWith')($scope.friends_list, 'id', member_id)[0];
		$scope.group.group_id = $filter('collect')($scope.current_member.groups, "id");
		$scope.group.associated_user_id = $scope.current_member.reecher_id;
		console.log($scope.group);
		$ionicModal.fromTemplateUrl('/templates/user_groups.html', {
			scope: $scope,
			animation: 'slide-in-up'
		}).then(function(modal) {
			$scope.modal = modal;
			$scope.modal.show();
		});
	};

	$scope.newGroup = function(member_id){
		$scope.modal.remove();
		$scope.new_group = {member_reecher_ids: [member_id], name: "", reecher_id: $rootScope.currentUser.reecher_id};
		$ionicModal.fromTemplateUrl('/templates/new_group.html', {
			scope: $scope,
			animation: 'slide-in-up'
		}).then(function(modal) {
			$scope.modal = modal;
			$scope.modal.show();
		});
	}

	$scope.closeModal = function() {
		$scope.modal.remove();
		if($scope.refresh_page){
			window.location.reload();
		}
	};
	
	// Execute action on hide modal
	$scope.$on('modal.hidden', function() {
		$scope.modal.remove();
		if($scope.refresh_page){
			window.location.reload();
		}
	});

	$scope.updateSelection = function(event, group_id){
		if(event.target.checked){
			$scope.group.group_id[$scope.group.group_id.length] = group_id;
		}else{
			$scope.group.group_id.splice($scope.group.group_id.indexOf(group_id), 1);
		}
	}

	$scope.associateUser = function(){
		Group.associate_user_to_group($scope.group, function(res){
			$scope.refresh_page = true;
			alert(res.message);
		}, function(error){
			alert("error");
		});
	}

	$scope.createGroup = function(){
		Group.save({group: $scope.new_group}, function(res){
			$scope.refresh_page = true;
			alert("Group created successfully");
		}, function(err){
			alert("error");
		});
	}

	
}