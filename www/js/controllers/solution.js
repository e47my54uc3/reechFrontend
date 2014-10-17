function solutionCtrl($scope, $ionicPlatform, $timeout, $filter, Solution, $rootScope){
  var timer;
  $scope.previewTime = 8;
  $scope.setPreviewSolution = function(){
    Solution.previewSolution({solution_id: $scope.currentSolution.id}, function(){
      $scope.preview_set = true;
    });
  }
  $scope.$on('question-fetched', function(){
    if($scope.solutionGrabed){
      $scope.currentSolution = $filter('columnWith')($scope.$parent.selectedQuestion.solutions , 'id', $scope.$parent.selectedSolution.id+'')[0];           
      $scope.setCurrentChatMember($scope.currentSolution.solver_id, $scope.currentSolution.solver, $scope.currentSolution.solver_image);
    }

  });
  $scope.grabSolution = function(){
    Solution.purchaseSolution({solution_id: $scope.currentSolution.id}, function(){
      $scope.showSolution = true;
      $scope.cancelTimer();
      $scope.solutionGrabed = true;
      $scope.currentSolution.purchased = true;
      $scope.$parent.fetchQuestionDetailsWithSolutions();
      $rootScope.setProfile();
    });
  }
  $scope.solutionHi5 = function(){
    if($rootScope.currentUser.id != $scope.currentSolution.solver_id)
      Solution.solutionHi5({solution_id: $scope.currentSolution.id}, function(response){
        $scope.showSolution.hi5_count =  response.hi5_count;
        $scope.$parent.selectedSolution.hi5_count = response.hi5_count;
        $rootScope.setProfile();
      });
  }
  if($scope.$parent.selectedSolution) {
    $scope.currentSolution = $scope.$parent.selectedSolution;
    $scope.showSolution =  !$scope.currentSolution.previewed ||  $scope.currentSolution.current_user_is_solver || $scope.currentSolution.purchased;
    if(!$scope.currentSolution.previewed && !$scope.currentSolution.current_user_is_solver && !$scope.currentSolution.purchased)
    {
      $scope.setPreviewSolution();
      startTimer();
    }

  }
  function startTimer(){
    timer = $timeout(function() {
      $scope.previewTime -= 1;
      if($scope.previewTime > -1)
        startTimer();
      else{
        $scope.previewTime = 0;
        $scope.$parent.closeSolutionModal();
      }
    }, 1000);
  }
  $scope.$on("$destroy", function( event ) {
     $scope.cancelTimer();
  });
  $scope.cancelTimer = function(){
    $timeout.cancel( timer );
    if($scope.preview_set){
      $scope.currentSolution.previewed = true;
      $scope.$parent.selectedSolution.previewed = true;
    }
  }

  $scope.setCurrentChatMember = function(user_id, name, imageUrl){
    $scope.currentChatMemberId = user_id;
    $scope.currentChatMemberName = name;
    $scope.currentChatMemberImageUrl = imageUrl ? imageUrl : 'img/User-icon1.png';
  }
  if($scope.currentSolution.solver_id != $rootScope.currentUser.id)
    $scope.setCurrentChatMember($scope.currentSolution.solver_id, $scope.currentSolution.solver, $scope.currentSolution.solver_image);
  else
    if($scope.currentSolution.chat_members && $scope.currentSolution.chat_members.length)
      $scope.setCurrentChatMember($scope.currentSolution.chat_members[0].id, $scope.currentSolution.chat_members[0].full_name, $scope.currentSolution.chat_members[0].image_url);
  
  $ionicPlatform.onHardwareBackButton(function(){
    if($scope.$parent.solutionModal)
      $scope.$parent.closeSolutionModal();
  });
  
}
  