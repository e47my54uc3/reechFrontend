function registrationCtrl($scope, $rootScope, $location, Auth, $http, $cordovaCamera, $cordovaFile){

  $scope.user = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation: '',
    phone_number: '',
    invite_id: localStorage.inviteId,
    invite_code: localStorage.inviteCode,
    device: $rootScope.device    
  };
  $scope.user_profile = {picture: ''}
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
        $scope.user_profile.picture = imageData;
      }, function(err) {
        alert(err);
      });
    }
    $scope.onRegister = function(user){
      localStorage.currentUser = JSON.stringify(user);
        $rootScope.currentUser = JSON.parse(localStorage.currentUser);
        $http.defaults.headers.common["X-User-Email"]= $rootScope.currentUser.email;
        $http.defaults.headers.common["X-User-Token"]= $rootScope.currentUser.authentication_token;
        $location.path("/categories");
    }
  $scope.register = function() {
    if($scope.user_profile.picture != ""){
        var options = new FileUploadOptions();
        options.fileKey = "picture";
          options.fileName = "filename.jpg";
          options.mimeType = "image/jpeg";
          options.chunkedMode = false;
          var params = {};
          params.user = $scope.user;
          options.params = params;

        $cordovaFile.uploadFile(BaseUrl + '/users', $scope.user_profile.picture, options).then(function(result) {
          $scope.onRegister(result);
          alert("upload success");
      }, function(error) {
        alert("An error has occurred: Code = " + error.code);
        }, function (progress) {
      });
    }else{
      Auth.register($scope.user).then(function(user) {
        $scope.onRegister(user);
      }, function(error) {
        console.log(error.data);
      });
    }

  }

}
