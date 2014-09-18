'use strict';
var arrayFilters = angular.module('arrayFilters',[]);
arrayFilters.filter("sum", [function(){
	return function(items, column){
		var sum = 0;
		angular.forEach(items, function(item){
			var val = (isNaN(parseFloat(item[column]))) ? 0 : parseFloat(item[column]);
			sum += val;
		});
		return sum;
	}
}]);
arrayFilters.filter("collect", [function(){
	return function(items, column){
		var arr = [];
		angular.forEach(items, function(item){
			arr.push(item[column]);
		});
		return arr;
	}
}]);
arrayFilters.filter("columnIn", [function(){
	return function(items, column, values){
		var arr = [];
		angular.forEach(items, function(item){		
			if(values.indexOf(item[column]) > -1)
			  arr.push(item);
		});
		return arr;
	}
}]);
arrayFilters.filter("columnWith", [function(){
	return function(items, column, values){
		var arr = [];
		angular.forEach(items, function(item){	
			if(values == item[column])
			  arr.push(item);
		});
		return arr;
	}
}]);
arrayFilters.filter("assign", [function(){
	return function(items, column, value){
		angular.forEach(items, function(item){
			item[column] = value;
		});
		return items;
	}
}]);
arrayFilters.filter("keys", [function(){
	var arr = [];
	return function(item){
		angular.forEach(item, function(value, key){
			arr.push(key);
		});
		return arr;
	}
}]);
arrayFilters.filter("firstIndex", [function($filter){
	return function(items, itemHash){
		var keys = [];
		var cindex = -1;
		angular.forEach(itemHash, function(value, key){
			keys.push(key);
		});
		angular.forEach(items, function(item, index){
			var condition = true;
			angular.forEach(keys, function(key){
        condition = condition && (itemHash[key] == item[key]);
			});
			if(condition) {
				cindex = index;
			}
		});
		return cindex;
	}
}]);
arrayFilters.filter('unique', function () {

  return function (items, filterOn) {

    if (filterOn === false) {
      return items;
    }

    if ((filterOn || angular.isUndefined(filterOn)) && angular.isArray(items)) {
      var hashCheck = {}, newItems = [];

      var extractValueToCompare = function (item) {
        if (angular.isObject(item) && angular.isString(filterOn)) {
          return item[filterOn];
        } else {
          return item;
        }
      };

      angular.forEach(items, function (item) {
        var valueToCheck, isDuplicate = false;

        for (var i = 0; i < newItems.length; i++) {
          if (angular.equals(extractValueToCompare(newItems[i]), extractValueToCompare(item))) {
            isDuplicate = true;
            break;
          }
        }
        if (!isDuplicate) {
          newItems.push(item);
        }

      });
      items = newItems;
    }
    return items;
  };
});
