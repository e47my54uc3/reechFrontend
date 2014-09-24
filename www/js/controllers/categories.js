function categoriesCtrl($scope, Category, $location){
	$scope.categories = Category.query();

	$scope.loadQuestions = function(categoryId) {
    $location.path("categories/" + categoryId + "/questions");
	}
}
