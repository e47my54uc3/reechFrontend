function profilesCtrl($scope, $ionicPopup, User, $rootScope, $cordovaCamera, $stateParams, $cordovaFile){
    User.Profile({id: $stateParams.id}, function(data){
      $scope.profile = data;
      $scope.avatar = "";
      $scope.attributes = {_method: "PUT", user: {phone_number: data.phone_number, user_profile_attributes: {location: data.location, blurb: data.blurb}}};
    });
    
    $scope.updateDetails = function(){
      if($scope.avatar != ""){
        var options = new FileUploadOptions();
        options.fileKey = "file";
          options.fileName = "filename.jpg";
          options.mimeType = "image/jpeg";
          options.chunkedMode = false;
          options.params = $scope.attributes;
          
        $cordovaFile.uploadFile(BaseUrl + 'users/' + $rootScope.currentUser.id, $scope.avatar, options).then(function(result) {
            alert("upload success");
          }, function(error) {
            alert("An error has occurred: Code = " + error.code);
          }, function (progress) {
        });
      }else{
        User.update($scope.attributes, function(data){
          alert("saved!");
        });
      }
    }

    $scope.takePicture = function() {
      var options = { 
          quality : 75, 
          destinationType : Camera.DestinationType.FILE_URI,
          sourceType : Camera.PictureSourceType.PHOTOLIBRARY, 
          allowEdit : true,
          encodingType: Camera.EncodingType.JPEG,
          targetWidth: 100,
          targetHeight: 100,
          popoverOptions: CameraPopoverOptions,
          saveToPhotoAlbum: false
      };

      $cordovaCamera.getPicture(options).then(function(imageData) {
        $scope.avatar = imageData;
        $scope.profile.image_url = imageData;
      }, function(err) {
        alert(err);
      });
    }

    $scope.brands = [
     {title: "Like Reech? Tell your friends", apps: [
        {icon: 'ion-social-facebook'}
      , {icon: 'ion-android-share'}
      , {icon: 'ion-android-forums'}
      , {icon: 'ion-android-mail'}
    ]}
    ];
    
    $scope.showConfirm = function() {
      var confirmPopup = $ionicPopup.confirm({
        templateUrl: 'templates/help.html'
      });
      confirmPopup.then(function(res) {
        if(res) {
          console.log('You are sure');
        } else {
          console.log('You are not sure');
        }
      });
    };
}