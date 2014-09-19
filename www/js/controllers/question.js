function questionCtrl($scope, $ionicModal, Question) {
  
  if($scope.$parent.selectedQuestion) {
    Question.get({id: $scope.$parent.selectedQuestion}, function(response){
      $scope.selectedQuestion = response;
    });
  }
}
