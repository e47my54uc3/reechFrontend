reech.directive('audienDetails', function($ionicModal, User, Group){
	return{
		restrict: 'A',
		scope: false,
		//templateUrl: "<script id='my-popover.html' type='text/ng-template'><ion-popover-view><ion-header-bar><h1 class='title'>My Popover Title</h1></ion-header-bar><ion-content>Hello!</ion-content></ion-popover-view></script>",
		link: function($scope, element, attrs){
			$scope.friends_list = User.friends();
			$scope.groups = Group.query();

			$ionicModal.fromTemplateUrl('templates/audien_details.html', {
				scope: $scope,
				animation: 'slide-in-up'
			}).then(function(modal) {
				$scope.modal = modal;
			});

			$scope.openModal = function() {
				$scope.modal.show();
			};

			$scope.closeModal = function() {
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
		}		
	}
});
