function questionsCtrl($scope, Question) {
  $scope.questions = Question.query();
}
