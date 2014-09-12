function friendshipsCtrl($scope, $http) {
	$http.post("http://ec2-54-191-49-230.us-west-2.compute.amazonaws.com:3000/api/v1/friendships", {api_key: "ef7979d45287e06c84db1eb41092e328", user_id: "Reecher-69079392895"}).success(function(response){
          $scope.friendships = response;
	}).error(function(response) { alert("Error") });
}
