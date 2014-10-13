function questionCtrl($scope, $ionicModal, Question, $rootScope, $filter) {
  var index;
  $scope.question = {};
  $scope.modalOpened = true;
  $scope.fetchQuestionDetailsWithSolutions = function(){
    Question.get({id: $scope.$parent.selectedQuestion}, function(response){
      $scope.selectedQuestion = response;
    });
  }
  if($scope.$parent.selectedQuestion) {
    $scope.fetchQuestionDetailsWithSolutions();
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
  angular.forEach(['answerModal-closed', 'solution-purchased'], function(event){
    $scope.$on(event, function(){
      $scope.fetchQuestionDetailsWithSolutions();
    });

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
    if($scope.solutionModal)
      $scope.solutionModal.remove();
  };
  $scope.$on('solutionModal.hidden', function() {
    $scope.solutionModal.remove();
  });
  
  $scope.starQuestion = function(){
    Question.starQuestion({'question_id': $scope.selectedQuestion.question.id}, function(response){
      $scope.selectedQuestion.current_user_starred_question = response.stared;
      $rootScope.setProfile();
      if(typeof $scope.$parent.setStar === 'function')
        $scope.$parent.setStar($scope.selectedQuestion.question.id, response.stared)      
    });
  }  
  $scope.isAudienDetailsEmpty = function(question){
    var isEmpty = true;
    angular.forEach(question.audien_details, function(value, key){
      if(value.length)
        isEmpty = false;
    });
    return isEmpty;
  }
  $scope.linkQuestionToExpert= function(question_id, question){
    Question.linkQuestionToExpert({question_id: question_id, audien_details: question.audien_details}, function(response){
      index = $filter('firstIndex')($scope.questions, {'id': question_id});
      if(index > -1)
        $scope.questions[index].is_linked = true;
    });
  }
  $scope.$on('audien-modalClosed', function(event, args){
    if($scope.modalOpened && !$scope.isAudienDetailsEmpty(args)){
      $scope.linkQuestionToExpert( $scope.selectedQuestion.question.id, args);
      $scope.init();
      $scope.modalOpened = false;
    }
  });
}
