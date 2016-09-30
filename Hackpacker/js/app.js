
var app = angular.module("myApp", ['ngRoute'])



app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    $routeProvider
        .when('/',
        {
            templateUrl : '/views/home.html',
            controller : 'mainCtrl'
        })
        .when('/journey/:origin/to/:destination',
        {
            templateUrl : '/views/about.html',
            controller : 'mainCtrl'
        })
        .when('/journeyBreakdown/:id',
        {
            templateUrl : '/journeyBreakdown.php',
            controller : 'syncCtrl'
        })
        .otherwise({
            redirectTo : '/'
        });

    if(window.history && window.history.pushState){
    $locationProvider.html5Mode(true);
  }

}]);


/*var app = angular.module("myApp", []);*/

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

 app.controller('journeyController', function($scope, $http) {

		$http.get("server/selectJourneys.php")
		    .then(function (response) {$scope.journeyResults = response.data.records;});
	});

	app.controller('legController', function($scope, $http) {

		$http.get("server/selectJourneyegs.php?journeyId=$scope.journeyId")
		    .then(function (response) {$scope.seatToEdit = response.data.records;});
	});