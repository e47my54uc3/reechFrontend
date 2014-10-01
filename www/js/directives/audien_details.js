reech.directive('audienDetails', function($ionicModal, $ionicPlatform, User, Group, $cordovaContacts, $rootScope){
	return{
		restrict: 'A',
		scope: false,
		link: function($scope, element, attrs){
			$scope.new_invites = [{email: "", phone_number: "", type: "email"}];			
			$scope.friends_list = User.friends();
			$scope.groups = Group.query();
			$scope.question.audien_details = {emails: [], groups: [], reecher_ids: [], phone_numbers: []};


			$scope.openAudienModal = function() {
				$scope.temp_audien = angular.copy($scope.question.audien_details);
				$ionicModal.fromTemplateUrl('templates/audien_details.html', {
					scope: $scope,
					animation: 'slide-in-up'
				}).then(function(modal) {
					$scope.audien_modal = modal;
					$scope.audien_modal.show();
				});

			};

			$scope.closeAudienModal = function() {
				$scope.new_invite = {email: "", phone_number: ""};

				if($scope.audien_modal){
					$scope.audien_modal.remove();
					$rootScope.$broadcast('audien-modalClosed');
				}
			};
			$ionicPlatform.onHardwareBackButton(function(){
				if($scope.audien_modal)
					$scope.audien_modal.remove();
			});
			$scope.resetAudiens = function(){
				$scope.question.audien_details = $scope.temp_audien;
				if($scope.audien_modal)
					$scope.audien_modal.remove();
			}

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
					console.log($scope.question.audien_details)
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
				angular.forEach($scope.new_invites, function(new_invite, index){
					if((new_invite.email == "" || !new_invite.email)&& new_invite.phone_number == ""){
						alert("Please enter email or mobile number.")
					}
					else if(new_invite.email != ""){
						if($scope.question.audien_details.emails.indexOf(new_invite.email) < 0)
							$scope.question.audien_details.emails[$scope.question.audien_details.emails.length] = new_invite.email;
							//alert("success");
					}
					else if(new_invite.phone_number != ""){
						if($scope.question.audien_details.phone_numbers.indexOf(new_invite.phone_number) < 0)
							$scope.question.audien_details.phone_numbers[$scope.question.audien_details.phone_numbers.length] = new_invite.phone_number;
						//alert("success");
					}
					$scope.resetNewInvite(index);
				});				
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
		}
	}
});

	
