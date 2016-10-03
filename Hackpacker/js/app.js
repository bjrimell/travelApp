var app = angular.module("myApp", ["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "home.htm"
    })
    // Soon the below will not be needed, when it is working with IDs. Keep it for now though as it works!
    .when("/travel", {
        templateUrl : "journey.htm",
        controller : 'journeyController'
    })
    .when("/travel-from/:originId/to/:destinationId", {
        templateUrl : "journey.htm",
        controller : 'journeyController'
    })
    .when("/journeyBreakdown", {
        templateUrl : "journeyBreakdown.htm",
        controller : 'journeyController'
    })
    .when("/how_to-earn-money-while-you-travel", {
        templateUrl : "about.htm"
    })
    .when("/journey/:journeyId", {
        templateUrl : "journeyBreakdown.htm",
        controller : 'journeyBreakdownController'
    })
    .otherwise({
        template : "<h1>D'oh!</h1><p>Error 404! Sorry mate.</p>"
    });
});

app.controller('RedController', function($scope) {
 
    $scope.message = 'This is RedController Screen';
 
});

app.controller('VoteController', function($scope) {
  $scope.changeVote = function(vote, flag){
    $scope.vote = vote==flag?'None':flag;
    alert($scope.vote);
  };
});

app.controller('referenceDataController', function($scope, $http) {

		$http.get("server/getCities.php?id=$scope.seatId")
		    .then(function (response) {$scope.seatToEdit = response.data.records;});

}
);

 app.controller('journeyController', function($scope, $http, $routeParams) {

        $scope.originCity = $routeParams.originId;
        $scope.destinationCity = $routeParams.destinationId;
		$http.get("server/selectJourneys.php?originId="+$scope.originCity+"+&destinationId="+$scope.destinationCity)
		    .then(function (response) {$scope.journeyResults = response.data.records;});
	});

	app.controller('journeyBreakdownController', function($scope, $http, $routeParams) {

        $scope.journeyId = $routeParams.journeyId;
		$http.get("server/selectJourneyegs.php?journeyId=$scope.journeyId")
		    .then(function (response) {$scope.seatToEdit = response.data.records;});
	});