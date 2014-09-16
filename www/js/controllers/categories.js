function categoriesCtrl($scope, Category){
	$scope.categories = Category.query();
}