reech.directive('selectCategories', function($rootScope, $ionicModal, $cordovaContacts, $state, $filter, $location){
	return{
		restrict: 'A',
		scope: false,
		link: function($scope, element, attrs){			
			$scope.openCategoriesModel = function() {
				$ionicModal.fromTemplateUrl('templates/select_categories.html', {
					scope: $scope,
					animation: 'slide-in-left'
				}).then(function(modal) {
					$scope.categoriesModal = modal;
					$scope.categoriesModal.show();
				});
			};
			$scope.closeCategoriesModel = function() {
				if($scope.categoriesModal != undefined)
					$scope.categoriesModal.remove();
			};
			$scope.$on('categoriesModal.hidden', function() {
				$scope.categoriesModal.remove();
			});			

		  var index;
			$scope.addCategory = function(category_id){
				$scope.selectedCategories = localStorage.selectedCategoriesIds != undefined ? JSON.parse(localStorage.selectedCategoriesIds) : [];
				index = $scope.selectedCategories.indexOf(category_id);
				if(index < 0)
					$scope.selectedCategories.push(category_id);
				else
					$scope.selectedCategories.splice(index, 1);
				localStorage.selectedCategoriesIds = JSON.stringify($scope.selectedCategories);				
			}
			
			$scope.isCategorySelected = function(category_id){
				return (localStorage.selectedCategoriesIds.indexOf(category_id+"") > -1);
			}
			
			$scope.selectAllCategories = function(){
				var selectedCategories = [];
				angular.forEach($scope.allCategories, function(data){
					selectedCategories.push(data.id);
				});
				localStorage.selectedCategoriesIds = JSON.stringify(selectedCategories);
				$scope.categories = $scope.allCategories;				
				$scope.closeCategoriesModel();	
			}

			$scope.filterCategories = function(){
				$scope.selectedCategories = localStorage.selectedCategoriesIds != undefined ? JSON.parse(localStorage.selectedCategoriesIds) : [];
				$scope.categories = $filter('columnIn')($scope.allCategories, 'id', $scope.selectedCategories);
				$scope.closeCategoriesModel();
			}
			$scope.loadQuestions = function(categoryId) {
    		$location.path("categories/" + categoryId + "/questions");
			}
		}
	};
});