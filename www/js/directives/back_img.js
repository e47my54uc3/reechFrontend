reech.directive('backImg', function(){
    return function(scope, element, attrs){
        scope.boxHeight = (window.innerHeight/2 -47);
    	scope.$watch(attrs.backSrc, function(){
    		var url = scope.$eval(attrs.backImg);
        element.css({
            'background-image': 'url(' + url +')',
            'background-position' : 'center',	
            'background-size' : '100% 100%'
        });
    	});        
    };
});