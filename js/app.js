var app = angular.module("myApp", ["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "home.htm"
    })
    .when("/travel-from-:originId-to-:destinationId", {
        templateUrl : "journey.htm",
        controller : 'journeyController'
    })
    .when("/how_to-earn-money-while-you-travel", {
        templateUrl : "about.htm"
    })
    .when("/:description/:journeyId", {
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
		$http.get("server/selectJourneyLegs.php?journeyId="+$scope.journeyId)
		    .then(function (response) {$scope.journeyDetail = response.data.records;});
	});