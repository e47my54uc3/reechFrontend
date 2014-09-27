function answerQuestionCtrl($scope, $ionicModal, $ionicPopup, $cordovaCamera, Solution) {

  $scope.model = {is_public: true, solver_id: $scope.currentUser.reecher_id, solver: $scope.currentUser.full_name};
  $scope.takePicture = function() {
	    var options = {
	        quality : 75,
	        destinationType : Camera.DestinationType.DATA_URL,
	        sourceType : Camera.PictureSourceType.PHOTOLIBRARY,
	        allowEdit : true,
	        encodingType: Camera.EncodingType.JPEG,
	        targetWidth: 100,
	        targetHeight: 100,
	        popoverOptions: CameraPopoverOptions,
	        saveToPhotoAlbum: false
	    };

	    $cordovaCamera.getPicture(options).then(function(imageData) {
	    	$scope.model.picture = imageData;
	    	var image = document.getElementById('solutionImage');
    		image.src = "data:image/jpeg;base64," + "imageData";
	    }, function(err) {
	    	alert(err);
	    });
  	}

  	$scope.submit = function(){
  		$scope.model.question_id = $scope.$parent.selectedQuestion.question_id;
  		Solution.save({'solution': $scope.model}, function(data){
  			var alertPopup = $ionicPopup.alert({
     			title: 'Solution',
     			template: 'Solution submitted!'
   			});
   			alertPopup.then(function(res) {
   	 			$scope.model = "";
  				$scope.closeAnswerModal();
   			});

  		});
  	}
}
