function userSettingsCtrl($scope, $ionicViewService){
	$scope.goBack = function() {
    return $ionicViewService.getBackView;
  };

}