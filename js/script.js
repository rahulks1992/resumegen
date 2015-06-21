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
		var randomnumber = 10, newmodel = Math.floor(Math.random()*1000000);
		var form = $('#'+ whichmodule).find('.moduleform').clone(true, true);
		form.find('input').each(function(i,v){
			var modelis = $(v).attr('ng-model'),
			newmodelis = 'defaults' + newmodel,
			finalmodel = modelis.replace('defaults', newmodelis) ;
			$(v).attr('ng-model', finalmodel)
		})
		form.appendTo($('#center'));
		var moduletemplate = $('#'+ whichmodule).find('.moduletemplate').clone(true, true);
		moduletemplate.find('div').each(function(i,v){
			var modelis = $(v).html(),
			newmodelis = 'defaults' + newmodel,
			finalmodel = modelis.replace('defaults', newmodelis) ;
			$(v).html(finalmodel)
		})
		moduletemplate.appendTo($('#right'))
	}
	var config = {
		url : '/api/authenticate',
		method: 'GET',
		params: {
		}
	},
	successCallback = function(d) {
		if(d.data) {
			sessionStorage.setItem('loggedIn', true);
			sessionStorage.setItem('userId', $scope.inputId);
			// $location.path('/home.html#/list');
			window.location.href = 'home.html#/list';
		}
	},
	errorCallback = function(d) {
		console.error('Error: '+d);       			
	};

	$scope.loginSubmit = function(){
		if( $scope.inputId && $scope.inputPassword ) {
			config.params.user_id = $scope.inputId;
			config.params.pwd = $scope.inputPassword;

			$http(config).then(successCallback,errorCallback)
		}
	};
}]);