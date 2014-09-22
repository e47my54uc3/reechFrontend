reech.directive('audienDetails', function($ionicModal, User, Group, $cordovaContacts){
	return{
		restrict: 'A',
		scope: false,
		link: function($scope, element, attrs){
			$scope.new_invite = {email: "", phone_number: ""};
			$scope.friends_list = User.friends();
			$scope.groups = Group.query();
			$scope.question.audien_details = {emails: [], groups: [], reecher_ids: [], phone_numbers: []};
			$ionicModal.fromTemplateUrl('templates/audien_details.html', {
				scope: $scope,
				animation: 'slide-in-up'
			}).then(function(modal) {
				$scope.modal = modal;
			});

			$scope.openModal = function() {
				$scope.temp_audien = angular.copy($scope.question.audien_details);
				$scope.modal.show();
			};

			$scope.closeModal = function() {
				$scope.new_invite = {email: "", phone_number: ""};
				$scope.modal.hide();
			};

			//Cleanup the modal when we're done with it!
			$scope.$on('$destroy', function() {
				$scope.modal.remove();
			});

			// Execute action on hide modal
			$scope.$on('modal.hidden', function() {
			// Execute action
			});

			// Execute action on remove modal
			$scope.$on('modal.removed', function() {
			// Execute action
			});

			$scope.resetAudiens = function(){
				$scope.question.audien_details = $scope.temp_audien;
				$scope.closeModal();
			}

			$cordovaContacts.find({filter: "", multiple: true, fields: ["displayName", "phoneNumbers", "emails"]}).then(function(result) {
				$scope.contacts = result;
			}, function(err) {
    			alert(err);
      		});

			$scope.updateGroupSelection = function(event, group_id){
				if(event.target.checked){
					$scope.question.audien_details.groups[$scope.question.audien_details.groups.length] = group_id;
				}else{
					$scope.question.audien_details.groups.splice($scope.question.audien_details.groups.indexOf(group_id), 1)
				}
			}

			$scope.updateReecherSelection = function(event, reecher_id){
				if(event.target.checked){
					$scope.question.audien_details.reecher_ids[$scope.question.audien_details.reecher_ids.length] = reecher_id;
				}else{
					$scope.question.audien_details.reecher_ids.splice($scope.question.audien_details.reecher_ids.indexOf(reecher_id), 1)
				}
			}

			$scope.updateEmailSelection = function(event, email_id){
				if(event.target.checked){
					$scope.question.audien_details.emails[$scope.question.audien_details.emails.length] = email_id;
				}else{
					$scope.question.audien_details.emails.splice($scope.question.audien_details.emails.indexOf(email_id), 1)
				}
			}

			$scope.updatePhoneNumberSelection = function(event, number){
				if(event.target.checked){
					$scope.question.audien_details.phone_numbers[$scope.question.audien_details.phone_numbers.length] = number;
				}else{
					$scope.question.audien_details.phone_numbers.splice($scope.question.audien_details.phone_numbers.indexOf(number), 1)
				}
			}

			$scope.newInvite = function(){
				if($scope.new_invite.email == "" && $scope.new_invite.phone_number == ""){
					alert("Please enter email or mobile number.")
				}
				else if($scope.new_invite.email != ""){
					$scope.question.audien_details.emails[$scope.question.audien_details.emails.length] = $scope.new_invite.email;
					$scope.new_invite = {email: "", phone_number: ""};
					alert("success");
				}else if($scope.new_invite.phone_number != ""){
					$scope.question.audien_details.phone_numbers[$scope.question.audien_details.emails.length] = $scope.new_invite.phone_number;
					$scope.new_invite = {email: "", phone_number: ""};
					alert("success");
				}
				
			}
		}		
	}
});
