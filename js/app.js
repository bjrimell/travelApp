//var app = angular.module("myApp", ["ngRoute", "ui.router"]);
var app = angular.module("myApp", ["ui.router"]);

app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');
    
    $stateProvider

    // HOME STATES AND NESTED VIEWS ========================================
    .state('home', {
        url: '/home',
        templateUrl: 'home.htm'
    })

    .state('journeyResults', {
        url: '/travel-from-:originId-to-:destinationId',
        templateUrl : "journey.htm",
        controller : 'journeyController'     
    })

        .state('journeyResults.list', {
            url: '/list',
            templateUrl: 'partial-home-list.html',
            controller: function($scope) {
                $scope.dogs = ['Bernese', 'Husky', 'Goldendoodle'];
            }
        })

        .state('journeyResults.paragraph', {
            url: '/paragraph',
            template: 'I could sure use a drink right now.'
        })

    // nested list with custom controller
    .state('home.list', {
        url: '/list',
        templateUrl: 'partial-home-list.htm',
        controller: function($scope) {
            $scope.dogs = ['Bernese', 'Husky', 'Goldendoodle'];
        }
    })

    // nested list with just some random string data
    .state('home.paragraph', {
        url: '/paragraph',
        template: 'I could sure use a drink right now.'
    })

});


/*
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

*/

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

 app.controller('journeyController', function($scope, $http, $stateParams) {

        $scope.originCity = $stateParams.originId;
        $scope.destinationCity = $stateParams.destinationId;
		$http.get("server/selectJourneys.php?originId="+$scope.originCity+"+&destinationId="+$scope.destinationCity)
		    .then(function (response)
            {
                $scope.journeyResults = response.data.records;
            });
	});

	/*
    app.controller('journeyBreakdownController', function($scope, $http, $routeParams) {

        $scope.journeyId = $routeParams.journeyId;
		$http.get("server/selectJourneyLegs.php?journeyId="+$scope.journeyId)
		    .then(function (response) {$scope.journeyDetail = response.data.records;});

	});
    */