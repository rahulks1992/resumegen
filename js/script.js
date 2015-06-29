angular.module('Resumegen', [])
.directive('module1', function() {
  return {
    restrict: 'E',
    scope: {
      templateno: '=info'
    },
    templateUrl: 'module1.html'
  };
})
.directive('module1form', function() {
  return {
    restrict: 'E',
    scope: {
      field:'=', model:'='
    },
    templateUrl: 'module1form.html'
  };
})    
.controller('moduleslist', ['$scope', '$http', '$compile', function( $scope, $http , $compile){
	$scope.module1 = {
		defaults:{
			heading : "John Doe",
			subheading : "Assistant Electrical Engineer",
			description : "Electrical engineers design, develop and maintain electrical control systems and/or components to required specifications, focusing on economy, safety, reliability, quality and sustainability. They design and manufacture electrical equipment for use across many sectors."
		}
	};
	$scope.addModule = function(whichmodule){
		var newmodel = Math.floor(Math.random()*1000000);
		var form = $compile(  "<"+whichmodule+"form model='"+whichmodule+".defaults"+newmodel+"'></"+whichmodule+"form>" )( $scope );
		$('#center').append(form);

		var moduletemplate = $compile("<"+whichmodule+" info='"+whichmodule+".defaults"+newmodel+"'></"+whichmodule+">" )( $scope );
		$('#right').append(moduletemplate);

		$scope[whichmodule]['defaults'+newmodel] = $.extend(true, {}, $scope[whichmodule].defaults);
	}
}]);