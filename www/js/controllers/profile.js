function profilesCtrl($scope, $ionicPopup, User, $rootScope, $location, $cordovaCamera, $stateParams, $cordovaFile, $ionicPlatform){

    User.Profile({id: $rootScope.currentProfileId}, function(data){

      $scope.profile = data;
      $scope.avatar = "";
      $scope.attributes = {location: data.location, blurb: data.blurb, profile_id: data.profile_id};
    });
    
    $scope.closeProfileModal = function() {
      if($scope.profileModal){
        $scope.profileModal.remove();
      }
    };
    $ionicPlatform.onHardwareBackButton(function(){
      $scope.closeProfileModal();
    });
    $scope.updateDetails = function(){
      if($scope.avatar != ""){
        var options = new FileUploadOptions();
        options.fileKey = "file";
        options.fileName = "filename.jpg";
        options.mimeType = "image/jpeg";
        options.chunkedMode = false;
        var params = {};
        params._method = "PUT";
        params.user = $scope.attributes;
        options.params = params;

        $cordovaFile.uploadFile(BaseUrl + 'api_users/' + $rootScope.currentUser.id, $scope.avatar, options).then(function(result) {
            alert("upload success");
          }, function(error) {
            alert("An error has occurred: Code = " + error.code);
          }, function (progress) {
        });
      }else{
        User.update({id: $rootScope.currentUser.id, user: $scope.attributes}, function(data){
          alert("Profile updated successfully!");
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
