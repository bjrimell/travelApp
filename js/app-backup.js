//var app = angular.module("myApp", ["ngRoute", "ui.router"]);
var app = angular.module("myApp", ["ui.router", "angular.step", 'mgcrea.ngStrap']);

app.config(function($stateProvider, $urlRouterProvider) {
    
    $stateProvider

    .state('home', {
        url: '/home',
        templateUrl: 'home.htm'
    })

    .state('journeyResults', {
        url: '/travel-from-:originId-to-:destinationId',
        templateUrl : "journey.htm",
        controller : 'journeyController'     
    })

    .state('addJourney', {
        url: '/addJourney',
        templateUrl : "add.htm",
        controller : 'addJourneyController'     
    })

    .state('about', {
        url: '/how_to-earn-money-while-you-travel',
        templateUrl : "about.htm"   
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

    // form        // route to show our basic form (/form)
        .state('form', {
            url: '/form',
            templateUrl: 'form.html',
            controller: 'formController'
        })

        // url will be /form/indirect
        .state('form.indirect', {
            url: '/indirect',
            templateUrl: 'form-indirect.html'
        })
        
        // url will be /form/step-1
        .state('form.step-1', {
            url: '/step-1',
            templateUrl: 'form-step-1.html'
        })
        
        // url will be /form/interests
        .state('form.step-2', {
            url: '/step-2',
            templateUrl: 'form-step-2.html'
        })

        // url will be /form/step-3
        .state('form.step-3', {
            url: '/step-3',
            templateUrl: 'form-step-3.html'
        })

        // url will be /form/step-4
        .state('form.step-4', {
            url: '/step-4',
            templateUrl: 'form-step-4.html'
        })

        // url will be /form/step-5
        .state('form.step-5', {
            url: '/step-5',
            templateUrl: 'form-step-5.html'
        })
        
        // url will be /form/step-6
        .state('form.step-6', {
            url: '/confirm',
            templateUrl: 'form-step-6.html'
        });

        // catch all route
        // send users to the home page 
        $urlRouterProvider.otherwise('/home');

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

 app.controller('journeyController', function($scope, $http, $stateParams) {

        $scope.originCity = $stateParams.originId;
        $scope.destinationCity = $stateParams.destinationId;
		$http.get("server/selectJourneys.php?originId="+$scope.originCity+"+&destinationId="+$scope.destinationCity)
		    .then(function (response)
            {
                $scope.journeyResults = response.data.records;
            });
	});

     app.controller('addJourneyController', function($scope, $http, $stateParams) {

        $scope.originCity = $stateParams.originId;
        $scope.destinationCity = $stateParams.destinationId;
		$http.get("server/selectJourneys.php?originId="+$scope.originCity+"+&destinationId="+$scope.destinationCity)
		    .then(function (response)
            {
                $scope.journeyResults = response.data.records;
            });
	});

    app.run(function ($rootScope) {
    $rootScope.testSubmit = function () {
        alert("You clicked submit.");
    };
});

app.controller('formController', function($scope, $http) {
    
    // we will store all of our form data in this object
    $scope.formData = {
        "leaveDate" : "today",
        "leaveDay" : "01",
        "leaveMonth" : "January",
        "leaveYear" : "2016",
        "leaveHour" : "12",
        "leaveMinute" : "00",
        "arrivalDate" : "today",
        "arriveDay" : "01",
        "arriveMonth" : "January",
        "arriveYear" : "2016",
        "arriveHour" : "12",
        "arriveMinute" : "00",
        "NoBorder" : true,
        "Direct" : true,
        "ModeOfTransport" : "shared taxi",
        "CurrencyUsed" : "USD"};
    
    // function to process the form
    $scope.processForm = function() {
        
        // Construct Dates
        // 1. Determine if we need to pass today, yesterday, or a manually entered date.
        switch ($scope.formData.leaveDate) {
            case "today":
                var today = new Date();
                $scope.formData.leaveDate = today;
                break;
            case "yesterday":
                $today = new Date();
                $yesterday = new Date($today);
                $yesterday.setDate($today.getDate() - 1);
                $scope.formData.leaveDate = $yesterday;
                break;
            case "other":
                    switch ($scope.formData.leaveMonth) {
                        case "January":
                            leaveMonth = "01";
                            break;
                        case "February":
                            leaveMonth = "02";
                            break;
                        case "March":
                            leaveMonth = "03";
                            break;
                        case "April":
                            leaveMonth = "04";
                            break;
                        case "May":
                            leaveMonth = "05";
                            break;
                        case "June":
                            leaveMonth = "06";
                        case "July":
                            leaveMonth = "07";
                        case "August":
                            leaveMonth = "08";
                        case "September":
                            leaveMonth = "09";
                        case "October":
                            leaveMonth = "10";
                        case "November":
                            leaveMonth = "11";
                        case "December":
                            leaveMonth = "12";};
                $scope.formData.leaveDate = $scope.formData.leaveYear + "-" + leaveMonth + "-" + $scope.formData.leaveDay;
            break;
        }

        switch ($scope.formData.arrivalDate) {
            case "today":
                $today = new Date();
                $scope.formData.arrivalDate = $today;
                break;
            case "yesterday":
                $today = new Date();
                $yesterday = new Date($today);
                $yesterday.setDate($today.getDate() - 1);
                $scope.formData.arrivalDate = $yesterday;
                break;
            case "other":
                    switch ($scope.formData.arrivalDate) {
                        case "January":
                            arriveMonth = "01";
                            break;
                        case "February":
                            arriveMonth = "02";
                            break;
                        case "March":
                            arriveMonth = "03";
                            break;
                        case "April":
                            arriveMonth = "04";
                            break;
                        case "May":
                            arriveMonth = "05";
                            break;
                        case "June":
                            arriveMonth = "06";
                        case "July":
                            arriveMonth = "07";
                        case "August":
                            arriveMonth = "08";
                        case "September":
                            arriveMonth = "09";
                        case "October":
                            arriveMonth = "10";
                        case "November":
                            arriveMonth = "11";
                        case "December":
                            arriveMonth = "12";};
                $scope.formData.arrivalDate = $scope.formData.arriveYear + "-" + arriveMonth + "-" + $scope.formData.arriveDay;
            break;
        }

        //TODO
        // 1. Set destination country equal to origin country if NoBorder = true
        // 2. Set arrival year equal to leave year if checkbox ticked

        var test2 = $scope.formData.arrivalDate.toISOString();

        $http.post("server/insertJourney.php?originCityId="+$scope.formData.originCityId+
        "&destinationCityId="+$scope.formData.destinationCityId+
        "&leaveDateTime="+$scope.formData.leaveDate.toISOString()+"&arrivalDateTime="+$scope.formData.arrivalDate.toISOString()+"&mode=3&currencyUsed="+$scope.formData.CurrencyUsed+
        "&price="+$scope.formData.Price+
        "&instructions="+$scope.formData.Instructions).success
		(function(data){
		  		});
    };
});

/**
 * @ngdoc overview
 * @name angular-step
 *
 * @description
 * An AngularJS way of building clean "wizard" like applications.
 */

angular.module('angular.step', [])

    .controller('StepSetController', ['$scope', function ($scope) {

    var ctrl = this,
        index = -1, // points to the current step in the steps array
        steps = ctrl.steps = $scope.steps = [];

    $scope.nextEnabled = true;
    $scope.previousEnabled = false;
    $scope.submitEnabled = false;

    /*
     * Moves to the next step
     */
    $scope.next = function () {
        if (steps.length === 0) {
            console.debug('No steps provided.');
            return;
        }
        // If we're at the last step, then stay there.
        if (index == steps.length - 1) {
            console.debug('At last step.');
            return;
        }

        steps[index++].isDisplayed = false;
        steps[index].isDisplayed = true;

        ctrl.setButtons();
    }; // $scope.next

    /*
     * Moves to the previous step
     */
    $scope.previous = function () {
        if (steps.length === 0) {
            console.debug('No steps provided.');
            return;
        }

        if (index === 0) {
            console.debug('At first step');
            return;
        }
        steps[index--].isDisplayed = false;
        steps[index].isDisplayed = true;
        ctrl.setButtons();
    }; // $scope.previous

    $scope.submit = function () {
        $scope.submitAction();
    };

    /*
     * Adds a step to the end of the step list and
     * sets the index to 0 if it's the first step added.
     */
    ctrl.addStep = function (obj) {
        ctrl.steps.push(obj);
        if (index == -1) {
            index = 0;
            steps[0].isDisplayed = true;
        }
    };

    /*
     * Sets the correct buttons to be enabled or disabled.
     */
    ctrl.setButtons = function () {
        if (index == steps.length - 1) {
            $scope.nextEnabled = false;
            $scope.submitEnabled = true;
        } else if (index === 0) {
            $scope.previousEnabled = false;
        } else {
            $scope.nextEnabled = true;
            $scope.previousEnabled = true;
            $scope.submitEnabled = false;
        }
    };

}])

/**
 * @ngdoc directive
 * @name stepset
 * @restrict EA TODO: This may or may not be correct.
 *
 * @description
 * Stepset is the outer container for a set of ordered steps.
 * @example
 * TODO: Put example here.
 */.directive('stepset', function () {
    return {
        restrict: 'EA',
        transclude: true,
        scope: {
            nextText: '@',
            previousText: '@',
            submitText: '@',
            submitAction: '='
        },
        controller: 'StepSetController',
        templateUrl: 'partials/stepset.html',
        link: function (scope, element, attrs) {
            // TODO put link related things here.
        }
    };
})


/**
 * @ngdoc directive
 * @name step
 * @restrict EA TODO: this may or may not be correct
 *
 * @description
 * A Step is a single item that is displayed in the step set.
 * @example
 * TODO: put example here.
 */.directive('step', ['$parse', function ($parse) {
    var d = this;
    return {
        require: '^stepset',
        restrict: 'EA', // TODO: see above
        replace: true,
        templateUrl: 'partials/step.html',
        transclude: true,
        scope: {
            title: '@',
            description: '@'
        },
        controller: function ($scope) {
            // Determines if it should be displayed.  The stepset directive
            // controller needs to make sure only one shows up at a time.
            $scope.isDisplayed = false;
        },
        compile: function (elm, attrs, transclude) {
            return function postLink(scope, elm, attrs, ctrl) {
                ctrl.addStep(scope);
            };
        }
    };
}]);

	/*
    app.controller('journeyBreakdownController', function($scope, $http, $routeParams) {

        $scope.journeyId = $routeParams.journeyId;
		$http.get("server/selectJourneyLegs.php?journeyId="+$scope.journeyId)
		    .then(function (response) {$scope.journeyDetail = response.data.records;});

	});
    */