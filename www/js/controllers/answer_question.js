function answerQuestionCtrl($scope, $ionicModal, $stateParams, $cordovaCamera, Solution) {  
  $scope.model = {is_public: true, question_id: $stateParams.questionId};
  var image = document.getElementById('solutionImage');
  image.src = "img/default-image.png";
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
    		image.src = "data:image/jpeg;base64," + "imageData";
	    }, function(err) {
	    	alert(err);
	    });
  	}
  	
  	$scope.submit = function(){
  		Solution.save(angular.extend($scope.apiParams, {'solution': $scope.model}), function(data){
  			alert("Solution submitted!");
  		});
  	}
}