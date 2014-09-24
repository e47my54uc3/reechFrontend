function questionsCtrl($scope, $ionicModal, Question, $stateParams, $rootScope) {
  $scope.selectedQuestion = '';
  $scope.currentCategory = $stateParams.categoryId ? $stateParams.categoryId : '';
  $rootScope.selectedCategoryId =  $scope.currentCategory;
  $scope.currentScope = "all_feed";
  $scope.pageOptions = {page: 1, per_page: 3};

  $scope.fetchQuestions = function(){
    $scope.questions = [];
    Question.query({scope: $scope.currentScope, category_id: $scope.currentCategory}, function(data){
      $scope.count = data[0].count;
      angular.forEach(data[0].questions, function(value){
        $scope.questions.push(value);
      });

    });
  }

  $scope.$watch("currentScope", function(){    
    $scope.fetchQuestions();
  });

  $scope.loadMore = function(){
    if(($scope.pageOptions.page * $scope.pageOptions.per_page) < $scope.count){
      $scope.pageOptions.page += 1;
      $scope.fetchQuestions();
    }
  }
  $scope.openQuestionDetailsModal = function(question) {
    $scope.selectedQuestion = question.id;
    $ionicModal.fromTemplateUrl('templates/question_detail.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.questionDetailModel = modal;
      $scope.questionDetailModel.show();
    });
  };
  $scope.closeQuestionDetailsModal = function() {
    $scope.questionDetailModel.remove();
  };
  $scope.$on('questionDetailModel.hidden', function() {
    $scope.questionDetailModel.remove();
  });

}

  