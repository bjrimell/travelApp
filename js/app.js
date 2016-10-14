//var app = angular.module("myApp", ["ngRoute", "ui.router"]);
//var app = angular.module("myApp", ['ngAnimate', 'ngSanitize', "ui.router", "angular.step", 'mgcrea.ngStrap']);
var app = angular.module("myApp", ['ngAnimate', 'ngSanitize', "ui.router", "angular.step"]);

app.directive('googleplace', function() {
    return {
        require: 'ngModel',
        scope: {
            ngModel: '=',
            details: '=?'
        },
        link: function(scope, element, attrs, model) {
            var options = {
                types: [],
                componentRestrictions: {}
            };
            scope.gPlace = new google.maps.places.Autocomplete(element[0], options);

            google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
// NEW
                var countryCode = '';
                var geoComponents = scope.gPlace.getPlace();
                var addressComponents = geoComponents.address_components;
                addressComponents = addressComponents.filter(function(component){
                    switch (component.types[0]) {
                        case "locality": // city
                            return true;
                        case "administrative_area_level_1": // state
                            return true;
                        case "country": // country
                        countryCode = component.short_name;
                            return true;
                        default:
                            return false;
                    }
                }).map(function(obj) {
                    return obj.long_name;
                });
                
// END NEW
                scope.$apply(function() {
                    scope.details = scope.gPlace.getPlace();
                    scope.details.country = countryCode;
                    model.$setViewValue(element.val());                
                });
            });
        }
    };
});

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

    .state('individualJourneyResults', {
        url: '/travel-from-:originId-to-:destinationId/journey=:journeyId',
        templateUrl : "journey.htm",
        controller : 'individualJourneyController'     
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

    /*
    // nested list with custom controller
    .state('home.list', {
        url: '/list',
        templateUrl: 'partial-home-list.htm',
        controller: function($scope) {
            $scope.dogs = ['Bernese', 'Husky', 'Goldendoodle'];
        }
    })
    */

/*
    // nested list with just some random string data
    .state('home.paragraph', {
        url: '/paragraph',
        template: 'I could sure use a drink right now.'
    })
*/
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

        // url will be /form/interests
        .state('form.step-destination', {
            url: '/step-enter-destination',
            templateUrl: 'form-step-destination.html'
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
        })

        // url will be /form/step-6
        .state('form.success', {
            url: '/success/:journeyId/:originId/:destinationId',
            templateUrl: 'journey-added-success.html'
        })

        // url will be /form/step-6
        .state('form.myJourney', {
            url: '/myJourney/:journeyId',
            templateUrl: 'display-individual-journey.html'
        })

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

/*
app.controller('referenceDataController', function($scope, $http) {

		$http.get("server/getCities.php?id=$scope.seatId")
		    .then(function (response) {$scope.seatToEdit = response.data.records;});

}
);
*/

 app.controller('journeyController', function($scope, $http, $stateParams) {

        $scope.addNewJourney = true;
        $scope.originCity = $stateParams.originId;
        $scope.destinationCity = $stateParams.destinationId;
		$http.get("server/selectJourneys.php?originId="+$scope.originCity+"+&destinationId="+$scope.destinationCity)
		    .then(function (response)
            {
                $scope.journeyResults = response.data.records;
            });
	});

     app.controller('individualJourneyController', function($scope, $http, $stateParams) {

        $scope.originCity = $stateParams.originId;
        $scope.destinationCity = $stateParams.destinationId;
        $scope.journeyId = $stateParams.journeyId;
		$http.get("server/selectIndividualJourney.php?originId="+$scope.originCity+"+&destinationId="+$scope.destinationCity+"&journeyId="+$scope.journeyId)
		    .then(function (response)
            {
                $scope.journeyResults = response.data.records;
            });
	});

 app.controller('journeyAddedController', function($scope, $http, $stateParams) {

        $scope.journeyId = $stateParams.journeyId;
        $scope.originId = $stateParams.originId;
        $scope.destinationId = $stateParams.destinationId;
	});
/*
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
*/

app.controller('formController', function($scope, $templateCache, $http, $state) {
//app.controller('formController', ['$state', '$stateParams', function($scope, $templateCache, $http, $stateProvider, $stateParams){

    // we will store all of our form data in this object
    $scope.formData = {
        "originCityId" : "",
        "originCityName" : "",
        "destinationCityId" : "",
        "destinationCityName" : "",
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
        "CurrencyUsed" : "USD",};
    
    
    // function to process the form
    $scope.processForm = function() {
        
        // Construct Dates
        // 1. Determine if we need to pass today, yesterday, or a manually entered date.
        switch ($scope.formData.leaveDate) {
            case "today":
                $today = new Date();
                $scope.formData.leaveYear = $today.getFullYear();
                $scope.formData.leaveMonth = $today.getMonth()+1;
                $scope.formData.leaveDay = $today.getDate();
                break;
            case "yesterday":
                $today = new Date();
                $yesterday = new Date($today);
                $yesterday.setDate($today.getDate() - 1);
                $scope.formData.leaveYear = $yesterday.getFullYear();
                $scope.formData.leaveMonth = $yesterday.getMonth()+1;
                $scope.formData.leaveDay = $yesterday.getDate();
                break;
            case "other":
                    switch ($scope.formData.leaveMonth) {
                        case "January":
                            $scope.formData.leaveMonth = "01";
                            break;
                        case "February":
                            $scope.formData.leaveMonth = "02";
                            break;
                        case "March":
                            $scope.formData.leaveMonth = "03";
                            break;
                        case "April":
                            $scope.formData.leaveMonth = "04";
                            break;
                        case "May":
                            $scope.formData.leaveMonth = "05";
                            break;
                        case "June":
                            $scope.formData.leaveMonth = "06";
                            break;
                        case "July":
                            $scope.formData.leaveMonth = "07";
                            break;
                        case "August":
                            $scope.formData.leaveMonth = "08";
                            break;
                        case "September":
                            $scope.formData.leaveMonth = "09";
                            break;
                        case "October":
                            $scope.formData.leaveMonth = "10";
                            break;
                        case "November":
                            $scope.formData.leaveMonth = "11";
                            break;
                        case "December":
                            $scope.formData.leaveMonth = "12";
                        break;};
            break;
        }

        $scope.formData.leaveDate = $scope.formData.leaveYear + "-" + $scope.formData.leaveMonth + "-" + $scope.formData.leaveDay;
        $scope.formData.leaveDate += " " + $scope.formData.leaveHour + ":" + $scope.formData.leaveMinute;

        switch ($scope.formData.arrivalDate) {
            case "today":
                $today = new Date();
                $scope.formData.arriveYear = $today.getFullYear();
                $scope.formData.arriveMonth = $today.getMonth()+1;
                $scope.formData.arriveDay = $today.getDate();
                break;
            case "yesterday":
                $today = new Date();
                $yesterday = new Date($today);
                $yesterday.setDate($today.getDate() - 1);
                $scope.formData.arriveYear = $yesterday.getFullYear();
                $scope.formData.arriveMonth = $yesterday.getMonth()+1;
                $scope.formData.arriveDay = $yesterday.getDate();
                break;
            case "other":
                    switch ($scope.formData.arriveMonth) {
                        case "January":
                            $scope.formData.arriveMonth = "01";
                            break;
                        case "February":
                            $scope.formData.arriveMonth = "02";
                            break;
                        case "March":
                            $scope.formData.arriveMonth = "03";
                            break;
                        case "April":
                            $scope.formData.arriveMonth = "04";
                            break;
                        case "May":
                            $scope.formData.arriveMonth = "05";
                            break;
                        case "June":
                            $scope.formData.arriveMonth = "06";
                            break;
                        case "July":
                            $scope.formData.arriveMonth = "07";
                            break;
                        case "August":
                            $scope.formData.arriveMonth = "08";
                            break;
                        case "September":
                            $scope.formData.arriveMonth = "09";
                            break;
                        case "October":
                            $scope.formData.arriveMonth = "10";
                            break;
                        case "November":
                            $scope.formData.arriveMonth = "11";
                            break;
                        case "December":
                            $scope.formData.arriveMonth = "12";
                        break;};
            break;
        }

        $scope.formData.arrivalDate = $scope.formData.arriveYear + "-" + $scope.formData.arriveMonth + "-" + $scope.formData.arriveDay;
        $scope.formData.arrivalDate += " " + $scope.formData.arriveHour + ":" + $scope.formData.arriveMinute;

        switch ($scope.formData.ModeOfTransport) {
            case "Taxi":
                $scope.formData.ModeOfTransport = 1;
                break;
            case "Shared Taxi":
                $scope.formData.ModeOfTransport = 2;
                break;
            case "Airplane":
                $scope.formData.ModeOfTransport = 3;
                break;
            case "Walking":
                $scope.formData.ModeOfTransport = 4;
                break;
            case "Bus":
                $scope.formData.ModeOfTransport = 5;
                break;
            case "Coach":
                $scope.formData.ModeOfTransport = 6;
                break;
            case "Rickshaw":
                $scope.formData.ModeOfTransport = 7;
                break;
            case "Bicycle":
                $scope.formData.ModeOfTransport = 8;
                break;
            case "Motorcycle":
                $scope.formData.ModeOfTransport = 9;
                break;
            case "Large Boat":
                $scope.formData.ModeOfTransport = 10;
                break;
            case "Motorized Boat":
                $scope.formData.ModeOfTransport = 11;
                break;
            case "Metro/Subway":
                $scope.formData.ModeOfTransport = 12;
                break;
            case "Other":
                $scope.formData.ModeOfTransport = 13;
                break;
            case "Shuttle":
                $scope.formData.ModeOfTransport = 14;
                break;
            case "MotoTaxi":
                $scope.formData.ModeOfTransport = 15;
                break;
            case "Hitch":
                $scope.formData.ModeOfTransport = 16;
                break;
            default:
                $scope.formData.ModeOfTransport = 4;
                break;
        }


        $http.post("server/insertJourney.php?authorId=anonymous&originCityId="+$scope.formData.originCityId+
        "&originCityName="+$scope.formData.originCityName+
        "&originCountry="+$scope.formData.originCountry+
        "&destinationCityId="+$scope.formData.destinationCityId+
        "&destinationCityName="+$scope.formData.destinationCityName+
        "&destinationCountry="+$scope.formData.destinationCountry+
        "&leaveDateTime="+$scope.formData.arrivalDate+
        "&arrivalDateTime="+$scope.formData.leaveDate+
        "&mode="+ $scope.formData.ModeOfTransport +
        "&currencyUsed="+$scope.formData.CurrencyUsed+
        "&price="+$scope.formData.Price+
        "&instructions="+$scope.formData.Instructions).success
        (function (response)
            {
                $scope.formData.resultId = response;
                //window.location = "./journeyAdded.php?id="+$scope.formData.resultId;

                $state.go('form.success', {originId: $scope.formData.originCityName, destinationId: $scope.formData.destinationCityName, journeyId: $scope.formData.resultId});
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
'use strict';

angular.module('mgcrea.ngStrapDocs')

.controller('TypeaheadDemoCtrl', function($scope, $templateCache, $http) {

  $scope.selectedState = '';
  $scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

  $scope.selectedIcon = '';
  $scope.icons = [
    {value: 'Gear', label: '<i class="fa fa-gear"></i> Gear'},
    {value: 'Globe', label: '<i class="fa fa-globe"></i> Globe'},
    {value: 'Heart', label: '<i class="fa fa-heart"></i> Heart'},
    {value: 'Camera', label: '<i class="fa fa-camera"></i> Camera'}
  ];

  $scope.selectedAddress = '';
  $scope.getAddress = function(viewValue) {
    var params = {address: viewValue, sensor: false};
    return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {params: params})
    .then(function(res) {
      return res.data.results;
    });
  };

});
*/