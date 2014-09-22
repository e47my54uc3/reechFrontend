function connectionsCtrl($scope, User, Group){
	$scope.friends_list = User.friends();
	$scope.groups = Group.query();
}