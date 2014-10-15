function questionsCtrl($scope, $ionicModal, Question, $stateParams, $rootScope, $filter) {
  $scope.selectedQuestion = '';
  $scope.selectedCategories = localStorage.selectedCategoriesIds != undefined ? JSON.parse(localStorage.selectedCategoriesIds) : [];
  $scope.allCategories = localStorage.categories != undefined ? JSON.parse(localStorage.categories) : [];
  $scope.categories = $filter('columnIn')($scope.allCategories, 'id', $scope.selectedCategories);
  $rootScope.headerTitle = $stateParams.categoryId ? $scope.allCategories[($filter('firstIndex')($scope.allCategories, {id: $stateParams.categoryId}))].title : 'All';
  $scope.currentCategory = $stateParams.categoryId ? $stateParams.categoryId : '';
  $scope.currentScope = "all_feed";
  $scope.pageOptions = {page: 1, per_page: 4};
  $scope.linkQuestionId = '';
  $scope.modalOpened = false;
  $scope.question = {};
  $scope.questions = [];
  var index;
  $scope.fetchQuestions = function(){
    Question.query(angular.extend($scope.pageOptions, {scope: $scope.currentScope, category_id: $scope.currentCategory}), function(data){
      $scope.questions = $scope.questions.concat(data);
      $scope.count = data.length;
      $scope.noMoreQuestionsAvailable = false;
    });
  }
  $scope.loadMoreQuestions = function(){
    if($scope.count == 4){
      $scope.pageOptions.page+= 1;
      $scope.noMoreQuestionsAvailable = false;
      $scope.fetchQuestions();
    }else{
      $scope.noMoreQuestionsAvailable = true;
    }
    $rootScope.$broadcast('scroll.infiniteScrollComplete');

  }
  $scope.$watch("currentScope", function(){
    $scope.questions = [];
    $scope.pageOptions = {page: 1, per_page: 4};
    $scope.fetchQuestions();
  });

  $scope.beforeQuestionDetailsModal = function(question_id) {
    $scope.selectedQuestion = question_id;
    $scope.modalOpened = true;
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
  $scope.setlinkQuestionId = function(question_id){
    $scope.linkQuestionId = question_id;
  }

  $scope.$on('audien-modalClosed', function(event, args){
    if(!$scope.modalOpened && !$scope.isAudienDetailsEmpty(args)){
      $scope.linkQuestionToExpert( $scope.linkQuestionId, args);
      $scope.init();
      $scope.modalOpened = false;
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
  $scope.linkQuestionToExpert = function(question_id, question){
    Question.linkQuestionToExpert({question_id: question_id, audien_details: question.audien_details}, function(response){
      index = $filter('firstIndex')($scope.questions, {'id': question_id});
      $scope.questions[index].is_linked = true;
    });
  }

}
