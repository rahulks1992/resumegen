angular.module('Milangular',['ngRoute'])
.config(['$routeProvider', function( $routeProvider ) {
	$routeProvider
		.when('/list', {
			templateUrl: 'list.html',
			controller: 'ListController'
		})
		.when('/form', {
			templateUrl: 'form.html',
			controller: 'FormController'
		})
		.when('/profile', {
			templateUrl: 'profile.html',
			controller: 'ProfileController'
		})
	    .otherwise({
	        redirectTo: '/list'
	    })
	    ;
}])    
.controller('LoginController', ['$scope', '$http', function( $scope, $http ){
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
	}
	;

	$scope.loginSubmit = function(){
		if( $scope.inputId && $scope.inputPassword ) {
			config.params.user_id = $scope.inputId;
			config.params.pwd = $scope.inputPassword;

			$http(config).then(successCallback,errorCallback)
		}
	};
}])
.controller('ListController', ['$scope', '$http', '$rootScope', '$timeout', function($scope, $http, $rootScope, $timeout) {
	var config = {
		url : '/api/transactions',
		method: 'GET'
	},
	successCallback = function(d) {
		var i
		,	j
		,	total
		,	fTotal = mTotal = 0
		,	curDate = new Date()
		,	dLen = d.data.length
		,	lLen = d.data[0].userList.length
		;

		for ( i = 0 ; i < dLen; i++ ) {
			total = 0;
			for ( j = 0 ; j < lLen; j++ ) {
				total += parseInt(d.data[i].userList[j].paid);
			}

			if ( ( new Date(d.data[i].transDate) ).getMonth() === curDate.getMonth() ) {
                mTotal += total;    
            };

			d.data[i].total = total;
			fTotal += total;
		};

		$scope.transactions = d.data;

		$scope.fTotal = fTotal;
		$scope.mTotal = mTotal;
	},
	errorCallback = function(d) {
		console.error('Error: '+d);       			
	}
	;

	$http(config).then(successCallback,errorCallback);

	$scope.editClick = function(t) {
		$timeout(function(){
			$rootScope.$broadcast( 'CatchForm', t );    			
		}, 100);	// delay in fetching form.html	
	};

	$scope.deleteClick = function(t) {
		var tLen = $scope.transactions.length
		,	i
		;

		config.url = '/api/transactions/' + t._id ;
		config.method = 'DELETE';
		$http(config).then(function(d){
			if (d.data) {
				for ( i = 0; i < tLen; i++ ) {
					if( $scope.transactions[i]._id === t._id ) {
						$scope.transactions.splice( i, 1 );
						break;
					}
				};
			}
		}, errorCallback);		
	};

}])
.controller('FormController', ['$scope', '$http', function($scope, $http) {    
	var edit
	,	emptyObj = {		// hardcoded values: needs to be removed
			description: 'no description',
			userList: [{
				userId: 'aPurw', paid: 0
			},
			{
				userId: 'iJain', paid: 0
			},
			{
				userId: 'nAgar', paid: 0
			},
			{
				userId: 'kShir', paid: 0
			},
			{
				userId: 'kpkr', paid: 0
			}] 
	}
	,	config = {
			method: 'PUT',
	}
	,   successCallback = function (d) {
		window.location.href = 'home.html#/list';
    }
	,   errorCallback = function (d) {
		console.error('Error: ' + d);
		window.location.href = 'home.html#/list';
    }
	;

	if( sessionStorage.getItem('formData') ) {
		edit = true;
		$scope.formData = JSON.parse(sessionStorage.getItem('formData'));
	} else {
		$scope.formData = emptyObj;
	}

	$scope.$on('CatchForm', function( e, data ) {
		edit = true;
		
		// store data in session storage in case user reloads the page
		sessionStorage.setItem('formData',JSON.stringify(data));

		$scope.formData = data ;
    });

    $scope.cancelClick = function() {
    	sessionStorage.removeItem('formData');
		window.location.href = 'home.html#/list';
    };

    $scope.okClick = function() {
    	sessionStorage.removeItem('formData');
		config.url = edit ? ('/api/transactions/' + $scope.formData._id) : '/api/transactions';
	    config.data = {
			description: $scope.formData.description, 
			userList: $scope.formData.userList
		};

    	$http(config).then(successCallback,errorCallback);
    };
}])
.controller('ProfileController', ['$scope', '$http', function($scope, $http) {
	var config = {
		url : '/api/users/' + sessionStorage.getItem('userId'),
		method: 'GET',
		params: {
		}
	},
	successCallback = function(d) {
		$scope.userInfo = d.data[0];
	},
	errorCallback = function(d) {
		console.error('Error: '+ d);       			
	}
	;

	$http(config).then(successCallback,errorCallback)

}])
;