function askAQuestionCtrl($scope, Category, Question, $cordovaCamera, $location){
	$scope.categories = Category.query();
	$scope.question = {};
	
	$scope.takePicture = function(type) {
	    var options = { 
	        quality : 75, 
	        destinationType : Camera.DestinationType.DATA_URL, 
	        allowEdit : true,
	        encodingType: Camera.EncodingType.JPEG,
	        targetWidth: 100,
	        targetHeight: 100,
	        popoverOptions: CameraPopoverOptions,
	        saveToPhotoAlbum: false
	    };

	    if(type == 'camera'){
	    	options.sourceType = Camera.PictureSourceType.CAMERA;
	    }else if(type == 'gallery'){
	    	options.sourceType = Camera.PictureSourceType.PHOTOLIBRARY;
	    }

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