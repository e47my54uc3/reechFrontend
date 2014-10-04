function connectionsCtrl($scope, User, Group, $ionicModal, $filter, $location, $rootScope){
	$scope.friends_list = User.friends();
	$scope.groups = Group.query();
	$scope.group = {group_id: "", associated_user_id: ""};
	$scope.new_group = {member_reecher_ids: [], reecher_id: "", name: ""};
	$scope.refresh_page = false;
	$scope.audien_details = {emails: [], phone_numbers: []};

	//Initialize this on route change
	$rootScope.contacts = [];
  $rootScope.noMoreItemsAvailable = false;

	$scope.sendRequest = function(){
		User.sendReechRequest({audien_details: $scope.audien_details}, function(res){
			if(res.status == 200){
				alert("Reech request was successfully sent.");
				$scope.audien_details = {emails: [], phone_numbers: []};
			}
		}, function(err){
			alert("Error");
		});
	}

	$scope.updateNumberAudienSelection = function(event, number){
		if(event.target.checked){
			$scope.audien_details.phone_numbers[$scope.audien_details.phone_numbers.length] = number;
		}else{
			$scope.audien_details.phone_numbers.splice($scope.audien_details.phone_numbers.indexOf(number), 1);
		}
	}

	$scope.updateEmailAudienSelection = function(event, email){
		if(event.target.checked){
			$scope.audien_details.emails[$scope.audien_details.emails.length] = email;
		}else{
			$scope.audien_details.emails.splice($scope.audien_details.emails.indexOf(email), 1);
		}
	}

	$scope.beforeGroupModal = function(group_id) {
		$scope.current_group = $filter('columnWith')($scope.groups, 'id', group_id)[0];
	};

	$scope.beforeMemberModal = function(member_id) {
		$scope.group = {group_id: [], associated_user_id: ""};
		$scope.current_member = $filter('columnWith')($scope.friends_list, 'id', member_id)[0];
		$scope.group.group_id = $filter('collect')($scope.current_member.groups, "id");
		$scope.group.associated_user_id = $scope.current_member.reecher_id;
	};

	$scope.beforeNewGroup = function(member_id){
		$scope.new_group = {member_reecher_ids: [member_id], name: "", reecher_id: $rootScope.currentUser.reecher_id};
	}

	$scope.executeOnClose = function(){
		if($scope.refresh_page){
			window.location.reload();
		}
	}

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
