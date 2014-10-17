function answerQuestionCtrl($scope, $ionicPlatform, $ionicPopup, $cordovaCamera, Solution, $rootScope, $cordovaFile) {

  $scope.model = {is_public: true, solver_id: $scope.currentUser.reecher_id, solver: $scope.currentUser.first_name+" "+$scope.currentUser.last_name};
  $scope.picture = '';
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
	    	$scope.picture = imageData;
	    }, function(err) {
	    	alert(err);
	    });
  	}

  	$scope.submit = function(){
  		$scope.model.question_id = $scope.$parent.selectedQuestion.question.question_id;
      if($scope.picture != ''){
        var options = new FileUploadOptions();
          options.fileKey = "picture";
            options.fileName = "filename.jpg";
            options.mimeType = "image/jpeg";
            options.chunkedMode = false;
            var params = {};
            var headers = {
              "X-User-Email": $rootScope.currentUser.email,
              "X-User-Token": $rootScope.currentUser.authentication_token
            };
            options.headers = headers;
            params.solution = $scope.model;
            options.params = params;

          $cordovaFile.uploadFile(BaseUrl + 'solutions', $scope.picture, options).then(function(result) {
            //$cordovaSpinnerDialog.hide();
            alert("upload success");
             $scope.$parent.closeAnswerModal();
        }, function(error) {
          //$cordovaSpinnerDialog.hide();
          alert("An error has occurred: Code = " + error.code);
          }, function (progress) {
        });
      }else{
    		Solution.save({'solution': $scope.model}, function(data){
    			var alertPopup = $ionicPopup.alert({
       			title: 'Solution',
       			template: 'Solution submitted!'
     			});
     			alertPopup.then(function(res) {
     	 			$scope.model = "";
    				$scope.closeAnswerModal();
            $rootScope.setProfile();
            $rootScope.$broadcast('answerModal-closed');
     			});

    		});
      }
  	}
    $ionicPlatform.onHardwareBackButton(function(){
      if($scope.$parent.answerModal)
        $scope.$parent.closeAnswerModal();
    });
}
