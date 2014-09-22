function questionsCtrl($scope, $ionicModal, Question) {  
  $scope.selectedQuestion = '';
  $scope.pageOptions = {page: 1, per_page: 3};  
  $scope.questions = [];
  $scope.fetchQuestions = function(){
    Question.query($scope.pageOptions, function(data){
      $scope.count = data[1];
      angular.forEach(data[0], function(value){
        $scope.questions.push(value);
      });    
      
    });   
  }
  $scope.fetchQuestions();
  $scope.loadMore = function(){
    if(($scope.pageOptions.page * $scope.pageOptions.per_page) < $scope.count){      
      $scope.pageOptions.page += 1;
      $scope.fetchQuestions();
    }
  }
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
  $scope.$on('modal.hidden', function() {
    $scope.modal.remove();
  });

}
