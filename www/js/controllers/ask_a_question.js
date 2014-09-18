function askAQuestionCtrl($scope, Category, Question, $cordovaCamera, $location){
	$scope.categories = Category.query();
	$scope.question = {}
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
	    	$scope.question.avatar = imageData;
	    }, function(err) {
	    	alert(err);
	    });
  	}

  	$scope.cancelQuestion = function(){
  		$location.path("/questions");
  	}

  	$scope.createQuestion = function(){
  		Question.save({question: $scope.question}, function(res){
  			alert("success");
  		}, function(err){
  			alert("error");
  		});
  	}
}