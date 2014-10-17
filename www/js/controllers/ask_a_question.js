function askAQuestionCtrl($scope, Category, Question, $rootScope, $cordovaCamera, $state, $cordovaFile, $cordovaSpinnerDialog){
	$scope.categories = Category.query();
	$scope.question = {ups: 0, downs: 0, Charisma: 5, posted_by_uid: '', posted_by: '', is_public: true};
	$scope.avatar = "";
	$scope.test = localStorage.currentUser;
	$scope.takePicture = function(type) {
	    var options = {
	        quality : 50,
	        destinationType : Camera.DestinationType.FILE_URI,
	        allowEdit : true,
	        encodingType: Camera.EncodingType.JPEG,
	        targetWidth: 300,
	        targetHeight: 300,
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
  		$state.go("categories");
  	}

  	$scope.createQuestion = function(){
  		$cordovaSpinnerDialog.show();
  		if($scope.question.category_id == null){
  			$cordovaSpinnerDialog.hide();
  			alert("Please select one category.");
  		}else if($scope.question.post == null){
  			$cordovaSpinnerDialog.hide();
  			alert("Please enter your question.");
  		}else{
  			$scope.question.posted_by_uid = $rootScope.currentUser.reecher_id;
			$scope.question.posted_by = ($rootScope.currentUser.first_name + $rootScope.currentUser.last_name);
	  		if($scope.avatar != ""){
	  			var options = new FileUploadOptions();
		  		options.fileKey = "file";
		        options.fileName = "filename.jpg";
		        options.mimeType = "image/jpeg";
		        options.chunkedMode = false;
		        var params = {};
		        var headers = {
		        	"X-User-Email": $rootScope.currentUser.email,
		        	"X-User-Token": $rootScope.currentUser.authentication_token
		        }
		        params.question = $scope.question;
		        options.params = params;
		        options.headers = headers;

		  		$cordovaFile.uploadFile(BaseUrl + 'post_question_with_image', $scope.avatar, options).then(function(result) {
		  			$cordovaSpinnerDialog.hide();
		  				alert("upload success");
				    	$rootScope.setProfile();
				    	$state.go("questions");		  			

				}, function(error) {
					$cordovaSpinnerDialog.hide();
					alert("An error has occurred: Code = " + error.code);
		    	}, function (progress) {
				});
			}else{
				Question.save({question: $scope.question}, function(res){
					$cordovaSpinnerDialog.hide();
		  			alert("Question successfully posted.");
					$rootScope.setProfile();
		  			$state.go("questions");
		  		}, function(err){
		  			$cordovaSpinnerDialog.hide();
		  			alert("Error occured while posting the question. Please try again.");
		  		});
			}
  		}

  	}
}
