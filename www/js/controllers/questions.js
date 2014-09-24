function questionsCtrl($scope, $ionicModal, Question, $stateParams) {
  $scope.selectedQuestion = '';
  $scope.currentCategory = $stateParams.categoryId ? $stateParams.categoryId : '';
  $scope.currentScope = "all_feed";
  $scope.pageOptions = {page: 1, per_page: 3};

  $scope.fetchQuestions = function(){
    Question.query({scope: $scope.currentScope, category_id: $scope.currentCategory}, function(data){
      $scope.questions = data;
    });
  }

  $scope.$watch("currentScope", function(){
    $scope.questions = [];
    $scope.fetchQuestions();
  });

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
