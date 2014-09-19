function questionsCtrl($scope, $ionicModal, Question) {
  $scope.selectedQuestion = '';
  Question.query({}, function(data){
    $scope.questions = data;
    //Cleanup the modal when we're done with it!

  });

  $scope.openModal = function(question) {
    $scope.selectedQuestion = question.id;
    $ionicModal.fromTemplateUrl('templates/question_detail.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
      $scope.modal.show();
    });
  };
  $scope.closeModal = function() {
    $scope.modal.remove();
  };

}
