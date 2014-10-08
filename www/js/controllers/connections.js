function connectionsCtrl($scope, User, Group, $ionicModal, $filter, $location, $rootScope, $ionicPopup){
	$scope.friends_list = User.friends();
	$scope.groups = Group.query();
	$scope.group = {group_id: "", associated_user_id: ""};
	$scope.new_group = {member_reecher_ids: [], reecher_id: "", name: ""};
	$scope.refresh_page = false;
	$scope.audien_details = {emails: [], phone_numbers: []};
	$scope.new_invite_details = {emails: [], phone_numbers: []};
	$scope.new_invites = [{email: "", phone_number: "", type: "email"}];
	
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
			if(res.status == 200){
				var user = $scope.friends_list[$filter('firstIndex')($scope.friends_list, {reecher_id: $scope.new_group.member_reecher_ids[0]})];
				$scope.groups.push({id: res.groups.id, name: res.groups.name, members: [{id: user.id, first_name: user.first_name, last_name: user.last_name, reecher_id: user.reecher_id}]});
				user.groups.push({id: res.groups.id, name: res.groups.name, reecher_id: res.groups.reecher_id});
				$scope.beforeMemberModal(user.id);
				$scope.new_group = {member_reecher_ids: [$scope.new_group.member_reecher_ids[0]], reecher_id: $rootScope.currentUser.reecher_id, name: ""};
				alert("Group created successfully");
			}else{
				alert("Please try again");
			}
		}, function(err){
			alert("error");
		});
	}

	$scope.newInvite = function(){
		var flag = 1;
		angular.forEach($scope.new_invites, function(new_invite, index){
			if((new_invite.email == "" || !new_invite.email)&& new_invite.phone_number == ""){
				alert("Please enter email or mobile number.");
				flag = 0;
			}
			else if(new_invite.email != ""){
				if($scope.new_invite_details.emails.indexOf(new_invite.email) < 0)
					$scope.new_invite_details.emails[$scope.new_invite_details.emails.length] = new_invite.email;
			}
			else if(new_invite.phone_number != ""){
				if($scope.new_invite_details.phone_numbers.indexOf(new_invite.phone_number) < 0)
					$scope.new_invite_details.phone_numbers[$scope.new_invite_details.phone_numbers.length] = new_invite.phone_number;
			}
			$scope.resetNewInvite(index);
		});
		if(flag){
			User.sendReechRequest({audien_details: $scope.new_invite_details}, function(res){
				if(res.status == 200){
					alert("Reech request was successfully sent.");
					$scope.new_invite_details = {emails: [], phone_numbers: []};
				}
			}, function(err){
				alert("Error");
			});
		}
	}

	$scope.addInvite = function(index){
		$scope.new_invites.splice(index+1, 0, {email: "", phone_number: "", type: "email"});
	}

	$scope.removeInvite = function(index){
		$scope.new_invites.splice(index, 1);
	}

	$scope.resetNewInvite = function(index){
		$scope.new_invites[index] = {email: "", phone_number: "", type: $scope.new_invites[index].type ? $scope.new_invites[index].type : "email"};
	}

	$scope.showConfirm = function(group_id, group_name) {
		var confirmPopup = $ionicPopup.confirm({
			title: 'Delete group : ' + group_name,
			template: 'Are you sure you want to delete this group?'
		});
		confirmPopup.then(function(res) {
			if(res) {
				Group.delete({id: group_id}, function(res){
					alert("Successfully deleted.");
					$scope.friends_list = User.friends();
					$scope.groups = Group.query();
				})
			}
		});
	};
}
