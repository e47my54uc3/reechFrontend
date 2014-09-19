function questionsCtrl($scope, $ionicModal, Question) {
  $scope.fetchAllQuestions = function(){
    Question.query($scope.apiParams, function(data){
      $scope.questions = data;
    });
  }  
  $scope.fetchAllQuestions();
  $ionicModal.fromTemplateUrl('templates/question_detail.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function(question) {
  	$scope.selectedQuestion = question; 
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
    $scope.answerModal.remove();
  });
  $ionicModal.fromTemplateUrl('templates/answer_question.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.answerModal = modal;
  });
  $scope.openAnswerModal = function(question) {
    $scope.answerModal.show();
    var image = document.getElementById('solutionImage');
    image.src = "img/default-image.png";
  };
  $scope.closeAnswerModal = function() {
    $scope.answerModal.hide();
  };
  
  
}
