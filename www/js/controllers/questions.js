function questionsCtrl($scope, $ionicModal, Question, $stateParams, $rootScope, $filter) {
  $scope.selectedQuestion = '';
  $scope.currentCategory = $stateParams.categoryId ? $stateParams.categoryId : '';
  $scope.currentScope = "all_feed";
  $scope.pageOptions = {page: 1, per_page: 3};
  $scope.linkQuestionId = '';
  $scope.modalOpened = false;
  $scope.question = {};
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
    $scope.modalOpened = true;
  };
  $scope.modalClosed = function(){
    $scope.modalOpened = false;
  }
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
  $scope.setlinkQuestionId = function(question_id){
    $scope.linkQuestionId = question_id;
  }
  
  $scope.$on('audien-modalClosed', function(event, args){ 
    $scope.linkQuestionToExpert($scope.modalOpened ? $scope.selectedQuestion : $scope.linkQuestionId, args);
  });

  $scope.linkQuestionToExpert= function(question_id, question){    
    Question.linkQuestionToExpert({question_id: question_id, audien_details: question.audien_details}, function(response){
      index = $filter('firstIndex')($scope.questions, {'id': question_id});
      $scope.questions[index].is_linked = true;
    });
  }

}
