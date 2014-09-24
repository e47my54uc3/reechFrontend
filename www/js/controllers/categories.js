function categoriesCtrl($scope, Category, $location){
	$scope.ceil = window.Math.ceil;
	Category.query({}, function(response){
			$scope.categories = response;
			$scope.allCategories = response;		
			if(!localStorage.selectedCategoriesIds){
				$scope.selectAllCategories();						
			}else{
				$scope.filterCategories();
			}	
	});
	$scope.loadQuestions = function(categoryId) {
    $location.path("categories/" + categoryId + "/questions");
	}
}
