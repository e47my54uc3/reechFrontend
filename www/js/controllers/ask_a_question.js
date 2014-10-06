function askAQuestionCtrl($scope, Category, Question, $rootScope, $cordovaCamera, $location, $cordovaFile){
	$scope.categories = Category.query();
	$scope.question = {ups: 0, downs: 0, Charisma: 5, posted_by_uid: '', posted_by: '', is_public: true};
	$scope.avatar = "";
	$scope.test = localStorage.currentUser;
	$scope.takePicture = function(type) {
	    var options = {
	        quality : 75,
	        destinationType : Camera.DestinationType.FILE_URI,
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
	    	$scope.avatar = imageData;
	    }, function(err) {
	    	alert(err);
	    });
  	}

		$scope.audienceCount = function(){
		 var audience = $scope.question.audien_details;
		 return (audience.emails.length + audience.groups.length + audience.reecher_ids.length + audience.phone_numbers.length);
		}

  	$scope.cancelQuestion = function(){
  		$location.path("/questions");
  	}

  	$scope.createQuestion = function(){
		$scope.question.posted_by_uid = $rootScope.currentUser.reecher_id;
		$scope.question.posted_by = ($rootScope.currentUser.first_name + $rootScope.currentUser.last_name);
  		if($scope.avatar != ""){
  			var options = new FileUploadOptions();
	  		options.fileKey = "file";
	        options.fileName = "filename.jpg";
	        options.mimeType = "image/jpeg";
	        options.chunkedMode = false;
	        var params = {};
	        params.question = $scope.question;
	        options.params = params;

	  		$cordovaFile.uploadFile(BaseUrl + 'post_question_with_image', $scope.avatar, options).then(function(result) {
			    alert("upload success");
			}, function(error) {
				alert("An error has occurred: Code = " + error.code);
	    	}, function (progress) {
			});
		}else{
			Question.save({question: $scope.question}, function(res){
	  			alert("Question successfully posted.");
					$rootScope.setProfile();
	  			$location.path("/questions");
	  		}, function(err){
	  			alert("Error occured while posting the question. Please try again.");
	  		});
		}
  	}
}
