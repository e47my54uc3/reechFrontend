var BaseUrl = "http://localhost:3000/api/v2/" ;

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
