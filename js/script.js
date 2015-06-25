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
.controller('moduleslist', ['$scope', '$http', '$compile', function( $scope, $http , $compile){
	$scope.module1 = {
		defaults:{
			heading : "John Doe",
			subheading : "Assistant Electrical Engineer",
			description : "Electrical engineers design, develop and maintain electrical control systems and/or components to required specifications, focusing on economy, safety, reliability, quality and sustainability. They design and manufacture electrical equipment for use across many sectors."
		}
	};
	$scope.addModule = function(whichmodule){
		var newmodel = Math.floor(Math.random()*1000000), newmodelis;
		var form = $('#'+ whichmodule).find('.moduleform').clone(true, true);
		form.find('input').each(function(i,v){
			var modelis = $(v).attr('ng-model'),
			newmodelis = 'defaults' + newmodel,
			finalmodel = modelis.replace('defaults', newmodelis) ;
			$(v).attr('ng-model', finalmodel);
		})
		form.appendTo($('#center'));

		var moduletemplate = $compile(  "<module1 info='module1.defaults'></module1>" )( $scope );
		console.log(moduletemplate);
		$('#right').append(moduletemplate)
	}
}]);