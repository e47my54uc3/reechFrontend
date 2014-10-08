function categoriesCtrl($scope, $filter, Category){
	$scope.ceil = window.Math.ceil;
	Category.query({}, function(response){
			$scope.categories = response;
			$scope.categories.push({id: '', title: 'All', question_count: $filter('sum')(response, 'question_count')});
			$scope.categories = $filter('orderBy')($scope.categories, 'title');
			localStorage.categories = JSON.stringify(response);	
			if(!localStorage.selectedCategoriesIds){
				$scope.selectAllCategories();						
			}else{
				$scope.filterCategories();
			}	
	});
	
}
