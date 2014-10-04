function questionsCtrl($scope, $ionicModal, Question, $stateParams, $rootScope, $filter) {
  $scope.selectedQuestion = '';
  $scope.currentCategory = $stateParams.categoryId ? $stateParams.categoryId : '';
  $scope.currentScope = "all_feed";
  $scope.pageOptions = {page: 1, per_page: 3};
  var index;
  $scope.fetchQuestions = function(){
    Question.query({scope: $scope.currentScope, category_id: $scope.currentCategory}, function(data){
      $scope.questions = data;
    });
  }

  $scope.$watch("currentScope", function(){
    $scope.questions = [];
    $scope.fetchQuestions();
  });


  $scope.beforeQuestionDetailsModal = function(question_id) {
    $scope.selectedQuestion = question_id;
  };
  $scope.setStar = function(question_id, stared){
    index = $filter('firstIndex')($scope.questions, {'id': question_id});
    $scope.questions[index].is_starred = stared;
  }
  $scope.starQuestion = function(question_id){
    Question.starQuestion({'question_id': question_id}, function(response){
      $rootScope.setProfile();
      $scope.setStar(question_id, response.stared);
    });
  }

}
