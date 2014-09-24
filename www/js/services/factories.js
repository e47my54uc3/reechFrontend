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
    Profile: {
      url: BaseUrl + "users/profile",
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
    },
    associate_user_to_group: {
      url: BaseUrl + "groups/associate_user_to_group",
      method: 'POST',
      isArray: false
    }
  }
  );
}]);

reech.factory('Session', ['$resource', function($resource) {
  return $resource(BaseUrl + "sessions",
  {},
  {
    logIn: {
      url: BaseUrl + "users/sign_in",
      method: 'POST',
      params: {},
      isArray: false
    },
    logOut: {
      url: BaseUrl + "sessions/log_out",
      method: 'DELETE',
      params: {},
      isArray: false
    }
  }
  );
}]);

reech.factory('UserSetting', ['$resource', function($resource) {
  return $resource(BaseUrl + "user_settings/:id",
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

reech.factory('Solution', ['$resource', function($resource) {
  return $resource(BaseUrl + "solutions/:id",
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

reech.factory('Notification', ['$resource', function($resource) {
  return $resource(BaseUrl + "notifications/:id",
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
