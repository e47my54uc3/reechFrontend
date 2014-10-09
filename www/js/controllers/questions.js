function questionsCtrl($scope, $ionicModal, Question, $stateParams, $rootScope, $filter) {
  $scope.selectedQuestion = '';
  $scope.selectedCategories = localStorage.selectedCategoriesIds != undefined ? JSON.parse(localStorage.selectedCategoriesIds) : [];
  $scope.allCategories = localStorage.categories != undefined ? JSON.parse(localStorage.categories) : [];
  $scope.categories = $filter('columnIn')($scope.allCategories, 'id', $scope.selectedCategories);
  $rootScope.headerTitle = $stateParams.categoryId ? ($filter('columnIn')($scope.categories, 'id', $stateParams.categoryId))[0].title : 'All';
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
    if(!$scope.isAudienDetailsEmpty(args)){
      $scope.linkQuestionToExpert($scope.modalOpened ? $scope.selectedQuestion : $scope.linkQuestionId, args);
      $scope.init();
    }
  });
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
      $scope.questions[index].is_linked = true;
    });
  }

}
