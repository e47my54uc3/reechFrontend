var BaseUrl = "http://192.168.0.101:3000/api/v2/" ;

reech.factory('Question', ['$resource', function($resource) {
  return $resource(BaseUrl + "questions/:id",
  {
    id: '@id'
  },
  {
    update: {
      method: 'PUT',
      params: {
        id: '@id'
      },
      isArray: false
    }
  }
  );
}]);

reech.factory('Category', ['$resource', function($resource) {
  return $resource(BaseUrl + "categories/:id",
  {
    id: '@id'
  },
  {
    update: {
      method: 'PUT',
      params: {
        id: '@id'
      },
      isArray: false
    }
  }
  );
}]);

reech.factory('User', ['$resource', function($resource) {
  return $resource(BaseUrl + "users/:id",
  {
    id: '@id'
  },
  {
    friends: {
      url: BaseUrl + "users/friends",
      method: 'GET',
      params: {},
      isArray: true
    },
    leaderBoard: {
      url: BaseUrl + "users/leader_board",
      method: 'GET',
      params: {},
      isArray: false
    },
    update: {
      method: 'PUT',
      params: {
        id: '@id'
      },
      isArray: false
    }
  }
  );
}]);

reech.factory('Group', ['$resource', function($resource) {
  return $resource(BaseUrl + "groups/:id",
  {
    id: '@id'
  },
  {
    update: {
      method: 'PUT',
      params: {
        id: '@id'
      },
      isArray: false
    }
  }
  );
}]);
