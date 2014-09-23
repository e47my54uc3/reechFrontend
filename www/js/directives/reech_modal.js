//<button reech-modal modal-template-url="" modal-before-open="" modal-on-close=""></button>
reech.directive('reechModal', function($ionicModal, $compile, $parse){
	return{
		restrict: 'AE',
		scope: false,
		link: function($scope, element, attrs){
			if($scope.modal){
				$scope.modal.remove();
			}

			$scope.openModal = function() {
				if(attrs.modalBeforeOpen != ""){
					$parse(attrs.modalBeforeOpen)($scope);
				}
				$ionicModal.fromTemplateUrl(attrs.modalTemplate, {
					scope: $scope,
					animation: 'slide-in-up'
				}).then(function(modal) {
					$scope.modal = modal;
					$scope.modal.show();
				});
				
			};

			$scope.closeModal = function() {
				if(attrs.modalOnClose != ""){
					$parse(attrs.modalOnClose)($scope);
				}
				$scope.modal.remove();
			};

		}
	}
});