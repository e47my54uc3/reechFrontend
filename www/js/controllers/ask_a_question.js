function askAQuestionCtrl($scope, Category, Question, $cordovaCamera){
	$scope.categories = Category.query();

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
	      // Success! Image data is here
	    }, function(err) {
	      // An error occured. Show a message to the user
	    });
  	}
}