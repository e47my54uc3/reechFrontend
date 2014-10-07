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
    },
    starQuestion: {
      url: BaseUrl + "questions/:question_id/star_question",
      method: 'POST',
      params: {
        question_id: '@question_id'
      },
      isArray: false
    },
    linkQuestionToExpert: {
      url: BaseUrl + "questions/:question_id/link_question_to_expert",
      method: 'POST',
      params: {
        question_id: '@question_id'
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
  return $resource(BaseUrl + "api_users/:id",
  {
    id: '@id'
  },
  {
    friends: {
      url: BaseUrl + "api_users/friends",
      method: 'GET',
      params: {},
      isArray: true
    },
    authorizeFacebook: {
      url: BaseUrl + "api_users/auth_face_book",
      method: 'POST',
      params: {},
      isArray: false
    },
    validateCode: {
      url: BaseUrl + "api_users/validate_code",
      method: 'GET',
      params: {},
      isArray: false
    },
    currentUserProfile: {
      url: BaseUrl + "api_users/current_user_profile",
      method: 'GET',
      params: {},
      isArray: false
    },
    leaderBoard: {
      url: BaseUrl + "api_users/leader_board",
      method: 'GET',
      params: {},
      isArray: false
    },
    Profile: {
      url: BaseUrl + "api_users/:id/profile",
      method: 'GET',
      params: {
        id: '@id'
      },
      isArray: false
    },
    update: {
      method: 'PUT',
      params: {
        id: '@id'
      },
      isArray: false
    },
    sendReechRequest: {
      url: BaseUrl + "api_users/send_reech_request",
      method: 'POST',
      params: {},
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
    },
    previewSolution: {
      url: BaseUrl + "solutions/:solution_id/preview_solution",
      method: 'POST',
      params: {
        solution_id: '@solution_id'
      },
      isArray: false
    },
    purchaseSolution: {
      url: BaseUrl + "solutions/:solution_id/purchase_solution",
      method: 'POST',
      params: {
        solution_id: '@solution_id'
      },
      isArray: false
    },
    solutionHi5: {
      url: BaseUrl + "solutions/:solution_id/solution_hi5",
      method: 'POST',
      params: {
        solution_id: '@solution_id'
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

reech.factory('ReechChat', ['$resource', function($resource) {
  return $resource(BaseUrl + "reech_chats/:id",
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
