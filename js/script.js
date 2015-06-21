angular.module('Resumegen', [])    
.controller('moduleslist', ['$scope', '$http', function( $scope, $http ){
	$scope.module1 = {
		defaults:{
			heading : "John Doe",
			subheading : "Assistant Electrical Engineer",
			description : "Electrical engineers design, develop and maintain electrical control systems and/or components to required specifications, focusing on economy, safety, reliability, quality and sustainability. They design and manufacture electrical equipment for use across many sectors."
		}
	};
	$scope.addModule = function(whichmodule){
		var selectedmodule = angular.element( document.querySelector( ('#'+ whichmodule) ) );
		var newform = angular.element(selectedmodule.children()[2]).clone();
		angular.element( document.querySelector( ('#center') )).append(newform);
		var newtemplate = angular.element(selectedmodule.children()[1]).clone();
		angular.element( document.querySelector( ('#right') )).append(newtemplate);
	}
}]);