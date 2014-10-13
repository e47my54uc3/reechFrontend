reech.directive('mainHeader',function($state, $ionicModal, $rootScope, $filter){
  return{
    restrict : 'E',
    scope: true,
    templateUrl: 'templates/main_header.html',
    link: function(scope, element, attrs){
    	 scope.askAQuestion = function(){
    	 	$state.go('ask_a_question');
    	 }
    	 $rootScope.openProfileModal = function(profileId) {
		    $rootScope.currentProfileId = profileId;
		    $ionicModal.fromTemplateUrl('templates/profile.html', {
		      scope: $rootScope,
		      animation: 'slide-in-left'
		    }).then(function(modal) {
		      $rootScope.profileModal = modal;
		      $rootScope.profileModal.show();
		    });
		  };
    }
  }
});
