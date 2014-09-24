function categoriesCtrl($scope, Category){
	$scope.ceil = window.Math.ceil;
	Category.query({}, function(response){
			$scope.categories = response;
			$scope.allCategories = response;	
			localStorage.categories = JSON.stringify(response);	
			if(!localStorage.selectedCategoriesIds){
				$scope.selectAllCategories();						
			}else{
				$scope.filterCategories();
			}	
	});
	
}
