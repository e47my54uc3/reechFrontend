reech.directive('audienDetails', function($ionicModal, User, Group, $cordovaContacts, $rootScope){
	return{
		restrict: 'A',
		scope: false,
		link: function($scope, element, attrs){
			$scope.new_invite = {email: "", phone_number: ""};
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
				if($scope.audien_modal != undefined){
					$scope.audien_modal.remove();					
					$rootScope.$broadcast('audien-modalClosed');
				}					
			};

			//Cleanup the modal when we're done with it!
			$scope.$on('$destroy', function() {
				if($scope.audien_modal != undefined)
				  $scope.audien_modal.remove();				
			});

			// Execute action on hide modal
			$scope.$on('modal.hidden', function() {
				if($scope.audien_modal != undefined)
				  $scope.audien_modal.remove();				
			});

			$scope.resetAudiens = function(){
				$scope.question.audien_details = $scope.temp_audien;
				$scope.closeAudienModal();
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

			$scope.setContacts = function(fetchedContacts){
				$scope.contacts = new Object();
				for(var i=0; i < fetchedContacts.length; i++){
					var name = fetchedContacts[i].displayName != null ? fetchedContacts[i].displayName : 'No name';
					var index = name.substring(0, 1).toUpperCase();

					if(name.length > 20){
						name = name.substring(0, 20) + '...';
					}

					if(fetchedContacts[i].phoneNumbers != null){
						for(var j=0; j<fetchedContacts[i].phoneNumbers.length; j++){
							var number = fetchedContacts[i].phoneNumbers[j].value;

							if($scope.contacts[index] == 'undefined'){
								$scope.contacts[index] = new Array();
							}

							$scope.contacts[index][$scope.contacts[index].length] = {"name": name, "number": number, type: "phone_number"};
						}
					}

					if(fetchedContacts[i].emails != null){
						for(var j=0; j<fetchedContacts[i].emails.length; j++){
							var email = fetchedContacts[i].emails[j].value;

							if($scope.contacts[index] == 'undefined'){
								$scope.contacts[index] = new Array();
							}

							$scope.contacts[index][$scope.contacts[index].length] = {"name": name, "email": email, type: "email"};
						}
					}
				}

				$scope.arrayKeys = new Array();
				for (var key in $scope.contacts )
							{
									$scope.arrayKeys[$scope.arrayKeys.length] = key;
							}
							$scope.arrayKeys = $scope.arrayKeys.sort();
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
