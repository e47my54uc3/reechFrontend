reech.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown", function (event) {
            if(event.which === 13) {
              scope.$eval(attrs.ngEnter);
              scope.$apply();
              event.preventDefault();
            }
        });
    };
});