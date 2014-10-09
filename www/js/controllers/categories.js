function categoriesCtrl($scope, $filter, Category, $rootScope){
	$scope.ceil = window.Math.ceil;
	$rootScope.headerTitle = "Areas of Interest";
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
