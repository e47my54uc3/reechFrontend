function solutionCtrl($scope, $timeout, Solution){	
	var timer;
	$scope.previewTime = 8;
	if($scope.$parent.selectedSolution) {
  	$scope.currentSolution = $scope.$parent.selectedSolution;
  	$scope.showGrab = !$scope.currentSolution.purchased && !$scope.currentSolution.current_user_is_solver;
  	if($scope.showGrab)
  		startTimer();  
  }
  function startTimer(){
  	timer = $timeout(function() {
      $scope.previewTime -= 1;
      if($scope.previewTime > -1)
      	startTimer();
      else{
      	$scope.previewTime = 0;
      	$scope.setPreviewSolution();
      }      	
    }, 1000);
  }
  $scope.$on("$destroy", function( event ) {
 	   $scope.cancelTimer();
  });
  $scope.cancelTimer = function(){
  	$timeout.cancel( timer );
  }
  $scope.setPreviewSolution = function(){  	
  	Solution.previewSolution({solution_id: $scope.currentSolution.id}, function(){
  		$scope.currentSolution.previewed = true;
  		$scope.$parent.selectedSolution.previewed = true;  		
  	});
  	$scope.$parent.closeSolutionModal();
  }
	$scope.grabSolution = function(){		
		Solution.purchaseSolution({solution_id: $scope.currentSolution.id}, function(){
  		$scope.showGrab = false;
			$scope.cancelTimer();
  		$scope.currentSolution.purchased = true;
  		$scope.$parent.selectedSolution.purchased = true;  		
  		$scope.setOrginalOwnerDetails();
  	});  	
	}
	$scope.setOrginalOwnerDetails = function(){
		$scope.$parent.selectedSolution.solution_provider_name = $scope.currentSolution.solution_owner;
  	$scope.$parent.selectedSolution.solver_image = $scope.currentSolution.solution_owner_image; 		
	}
}