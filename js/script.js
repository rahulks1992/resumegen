angular.module('Resumegen', [])
.directive('module1', function() {
  return {
    restrict: 'E',
    scope: {
      templateno: '=info'
    },
    templateUrl: '/partials/module1.html'
  };
})
.directive('module1form', function() {
  return {
    restrict: 'E',
    scope: {
      model:'='
    },
    templateUrl: '/partials/module1form.html'
  };
})
.directive('module2', function() {
  return { restrict: 'E', scope: {templateno: '=info'}, templateUrl: '/partials/module2.html'};
})
.directive('module2form', function() {
  return { restrict: 'E', scope: { model:'='}, templateUrl: '/partials/module2form.html'};
})   
.controller('moduleslist', ['$scope', '$http', '$compile', function( $scope, $http , $compile){
	$scope.module1 = {
		defaults:{
			heading : "John Doe",
			subheading : "Assistant Electrical Engineer",
			description : "Electrical engineers design, develop and maintain electrical control systems and/or components to required specifications, focusing on economy, safety, reliability, quality and sustainability. They design and manufacture electrical equipment for use across many sectors."
		}
	};
	$scope.module2 = {
		defaults:{
			company : "Sapient Nitro",
			subheading : "Front End Engineer",
			fromdate : "16 June 2014",
			todate : "24 Dec 2021",
			description : "This is the first company I worked for and have gained lots of experience. Extensively worked on dynamic websites creating beatiful interface at the same time. Learning curve was exponential here. Will always look back at what I did at this place."
		}
	};
	$scope.addModule = function(whichmodule){
		var newmodel = Math.floor(Math.random()*1000000);
		var moduleform = $compile(  "<"+whichmodule+"form model='"+whichmodule+".defaults"+newmodel+"'></"+whichmodule+"form>" )( $scope );
		$('#center').append(moduleform);

		var moduletemplate = $compile("<"+whichmodule+" info='"+whichmodule+".defaults"+newmodel+"'></"+whichmodule+">" )( $scope );
		$('#right').append(moduletemplate);

		//Cloning new model object for the module to defaults model object
		$scope[whichmodule]['defaults'+newmodel] = (JSON.parse(JSON.stringify($scope[whichmodule].defaults)));
	}
}]);