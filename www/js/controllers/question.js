function questionCtrl($scope, $ionicModal, Question, $rootScope) {
  $scope.question = {};
  if($scope.$parent.selectedQuestion) {
    Question.get({id: $scope.$parent.selectedQuestion}, function(response){
      $scope.selectedQuestion = response;
    });
  }
  $scope.openAnswerModal = function() {
    $ionicModal.fromTemplateUrl('templates/answer_question.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.answerModal = modal;
      $scope.answerModal.show();
    });
  };
  $scope.closeAnswerModal = function() {
    $scope.answerModal.remove();
  };
  $scope.$on('answerModal.hidden', function() {
    $scope.answerModal.remove();
  });

  $scope.openSolutionModal = function(solution) {
    $scope.selectedSolution = solution;
    $ionicModal.fromTemplateUrl('templates/solution.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.solutionModal = modal;
      $scope.solutionModal.show();
    });
  };
  $scope.closeSolutionModal = function() {
    $scope.solutionModal.remove();
  };
  $scope.$on('solutionModal.hidden', function() {
    $scope.solutionModal.remove();
  });
  $scope.starQuestion = function(){
    Question.starQuestion({'question_id': $scope.selectedQuestion.question.id}, function(response){
      $scope.selectedQuestion.current_user_starred_question = true;
      $rootScope.setProfile();
    });
  }
}
