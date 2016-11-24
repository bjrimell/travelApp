var app = angular.module("myApp", ['ngAnimate', 'ngSanitize', "ui.router", "angular.step", "angulartics", "angulartics.google.analytics"]);

function MyCtrl($scope, $location, $window) {
  $scope.$on('$viewContentLoaded', function(event) {
    $window.ga('send', 'pageview', { page: $location.url() });
  });
}

    app.directive('reverseGeocode', function () {
        return {
            restrict: 'E',
            template: '<div></div>',
            link: function (scope, element, attrs) {
                var geocoder = new google.maps.Geocoder();
                var latlng = new google.maps.LatLng(attrs.lat, attrs.lng);
                geocoder.geocode({ 'latLng': latlng }, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        if (results[1]) {
                            element.text(results[1].formatted_address);
                        } else {
                            element.text('Location not found');
                        }
                    } else {
                        element.text('Geocoder failed due to: ' + status);
                    }
                });
            },
            replace: true
        }
    });

app.factory('UserService', function() {
  return {
      username : getCookie('username')
  };
});

app.config(function ($provide) {
    // override default behavious to ensure scroll to top of the page on state change
  $provide.decorator('$uiViewScroll', function ($delegate) {
    return function (uiViewElement) {
       //var top = uiViewElement.getBoundingClientRect().top;
       var top = uiViewElement[0].getBoundingClientRect().top;
       window.scrollTo(0, (top - 30));
    }; 
  });
});

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
        templateUrl: 'home.htm',
        controller: 'homeController'
    })

    .state('journeyResults', {
        url: '/travel-from-:originId-to-:destinationId',
        templateUrl : "journey.php",
        controller : 'journeyController'     
    })

    .state('individualJourneyResults', {
        url: '/travel-from-:originId-to-:destinationId/journey=:journeyId',
        templateUrl : "journey.php",
        controller : 'individualJourneyController'     
    })

    .state('requestedJourney', {
        url: '/travel-from-:originId-to-:destinationId/requested',
        templateUrl : "requestedJourneyForm.html",
        controller: 'addRequestedJourneyController'  
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

    .state('login', {
        url: '/login',
        templateUrl: "login.html",
        controller: "loginController"
    })

    .state('landing-page', {
        url: '/members',
        templateUrl: "landing-page.html",
        controller: "loginController"
    })

    .state('logout', {
        url: '/logout',
        templateUrl: "logout.php",
        controller: "logoutController"
    })

    .state('signup', {
        url: '/signup',
        templateUrl: "signup.html",
        controller: 'signupController'
    })

    .state('signup-success', {
        url: '/welcome',
        templateUrl: "signup-success.html",
        controller: 'signupController'
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

        // url will be /form/step-1
        .state('form.step-1-origin-known-destination-known', {
            url: ':origin/:destination/step-1',
            templateUrl: 'form-step-1.html',
            controller: 'prePopulatedFormController'
        })

        // url will be /form/interests
        .state('form.step-2', {
            url: '/step-2',
            templateUrl: 'form-step-2.html'
        })

        // url will be /form/step-1
        .state('form.step-2-origin-known-destination-known', {
            url: '/:origin/:destination/step-2',
            templateUrl: 'form-step-2.html',
            controller: 'formController'
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

        .state('form.journeyFromTime', {
            url: '/journeyFromTime',
            templateUrl: 'form-step-from-time.html'
        })

        .state('form.journeyArrivalTime', {
            url: '/journeyArrivalTime',
            templateUrl: 'form-step-arrival-time.html'
        })

        .state('form.journeyArrivalDate', {
            url: '/journeyArrivalDate',
            templateUrl: 'form-step-arrival-date.html'
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

        .state('logging-in', {
            url: '/members/logging-in',
            templateUrl: 'logging-in.html',
            controller: 'loggingInController'
        })

        .state('landing-page.home', {
            url: '/home',
            templateUrl: 'landing-home.html'
        })

        // url will be /form/step-1
        .state('landing-page.requests', {
            url: '/requests',
            templateUrl: 'landing-requests.html'
        })

        // url will be /form/step-1
        .state('landing-page.stats', {
            url: '/stats',
            templateUrl: 'landing-stats.html'
        })

                // url will be /form/step-1
        .state('landing-page.settings', {
            url: '/settings',
            templateUrl: 'landing-settings.html'
        })

        .state('landing-page.itineraries', {
            url: '/itineraries',
            templateUrl: 'landing-itineraries.html'
        })

        // url will be /form/step-6
        .state('place', {
            url: '/place/:placeName',
            templateUrl: 'place.html',
            controller : 'placeController'  
        })

        // catch all route
        // send users to the home page 
        $urlRouterProvider.otherwise('/home');

});

app.controller('VoteController', function($scope, $http, $state, UserService) {
  $scope.changeVote = function(journeyId, value, origin, destination){

    if (!$scope.journeyResult.hasVoted)
    {
        $http.post("server/vote.php?journeyId="+journeyId+
            "&vote="+value).success
            (function (response)
                {
                    $scope.journeyResult.hasVoted=true;
                    switch (value) {
                        case 1:
                            // UPVOTE
                            $scope.journeyResult.Upvote++;
                            $scope.journeyResult.Score++;
                            // amend status to Completed if this was a requested journey
                            $http.post("server/updateRequestedJourneyStatus.php?origin="+origin+"&destination="+destination+"&status=Complete&userId="+UserService.username)
                            .success(function (response)
                                {
                                    // if we have set a requested journey to Complete, the author deserves the points!
                                    if (parseInt(response) >0)
                                    {
                                        var pointsToAward = 5 * response;
                                        $http.post("server/awardPointsToUserByJourneyId.php?journeyId="+journeyId+"&pointsToAward="+pointsToAward)
                                        .success(function(response)
                                        {
                                            var pointsAwarded = true;
                                        })
                                        .error(function(errorResponse)
                                        {
                                            var errorHappened = true;
                                        })
                                    }
                                })
                            .error(function (errorResponse)
                                {
                                    var requestUpdated = false;
                                })
                            break;
                        case -1:
                            // DOWNVOTE
                            $scope.journeyResult.Downvote++;
                            $scope.journeyResult.Score--;
                            break;
                    }
                      $scope.downVoteAction = function(journeyId, addNewJourney){
                        switch (addNewJourney) {
                            case true:
                                break;
                            case false:
                                break;
                        }
                    };
                })
            .error(function(errorResponse){
            });
    }
  };
});

app.controller('hackController', function($scope){

        $scope.reloadPage = function() {
        location.reload();
        // THIS IS A TEMPORARY MEASURE UNTIL I CAN FIGURE OUT HOW TO DEAL WITH THE PARENT SCOPE HAVING BEEN DESTROTED
        // I basically needed to have the state update so that user points are refreshed upon Boosting a request.
        // I think the parent scope (i.e. of the parent state) has been destroyed, meaning I cannot update it here.
        // Same issue as the parent state meaning the toolbar doesn't get updated on login.
    }

});


app.controller('locateController', function($scope){
    $scope.currentLocation = "set at TOP of locate controller!";

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position){
      $scope.$apply(function(){
        $scope.latitude = position.coords.latitude;
        $scope.longitude = position.coords.longitude;
        $scope.latlng = $scope.latitude +", "+$scope.longitude;
        $scope.currentLocation = "set in IF STATEMENT of locate controller!";
        populateLocation();
      });
    });
    //$scope.currentLocation = $scope.currentLocation;
  }

function populateLocation ($scope, element, attrs) {
    $scope.currentLocation = "set at top of POPULATELOCATION method of locate controller!";
    var tempProperty = "this is temp property";
    $scope.currentLocation = tempProperty;
                var geocoder = new google.maps.Geocoder();
                var latlng = new google.maps.LatLng(attrs.lat, attrs.lng);
                geocoder.geocode({ 'latLng': latlng }, function (results, status, $scope) {
                    tempProperty = "set within GEOCODE of POPULATELOCATION method of locate controller!";
                    if (status == google.maps.GeocoderStatus.OK) {
                        if (results[1]) {
                            element.text(results[1].formatted_address);
                            $scope.currentLocation = results[1].formatted_address;
                        } else {
                            element.text('Location not found');
                        }
                    } else {
                        element.text('Geocoder failed due to: ' + status);
                    }
                });
            }
            
            //$scope.currentLocation = "set at BOTTOm of POPULATELOCATION method of locate controller!";
            
});


/*

app.controller('locateController', function($scope){

    var ubicacion = "Blu tac";

    getLocation();
    
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
            ubicacion = "set!";
        } else {
            ubicacion = "Geolocation is not supported by this browser.";
        }
    }

    function showPosition(position) {
        var lat = position.coords.latitude;
        var long = position.coords.longitude;
        var geocoder = new google.maps.Geocoder;
        var latlng = {lat: parseFloat(lat), lng: parseFloat(long)};
        geocoder.geocode({'location': latlng}, function(results, status) {
            if (status === 'OK') {
                if (results[1]) {
                    ubicacion = results[1].formatted_address;
        } else {
            $scope.currentLocation  = 'No results found';
        }
        } else {
        $scope.currentLocation  = 'Geocoder failed due to: ' + status;
        }
        });
    }

$scope.currentLocation = ubicacion;
});
*/

 app.controller('homeController', function($scope, $http, $stateParams, $state, UserService) {

    $scope.username = UserService.username;

//$scope.currentLocation = locationString;

    $http.post("server/selectTopRequestedJourneys.php").success
        (function (response)
            {
                $scope.topRequestedJourneys = response.records;

                // TODO: check for success
            });

    $http.post("server/selectRecentJourneyRequests.php").success
    (function (response)
        {
            $scope.recentJourneyRequests = response.records;

            // TODO: check for success
        });
	});

 app.controller('requestJourneyController', function($scope, $http, $stateParams, $state, UserService) {

        $scope.requestJourney = function(origin, destination, boost) {

        $http.post("server/insertJourneyRequest.php?username="+UserService.username+"&origin="+origin+
        "&destination="+destination).success
        (function (response)
            {
                $scope.id = response;
                $scope.requestedJourney.Count ++;

                // TODO: check for success
            });

        $http.post("server/addUserPoints.php?username="+UserService.username+"&points=-5")
        .success(function (response)
        {
            
        })
        }
	});

     app.controller('addRequestedJourneyController', function($scope, $http, $stateParams) {

        $scope.originCity = $stateParams.originId;
        $scope.destinationCity = $stateParams.destinationId;
	});

    app.controller('accountController', function($scope, $http, $stateParams, UserService) {

        $http.post("server/selectRequestedJourneysByUser.php?username="+UserService.username).success
        (function (response)
            {
                $scope.requestedJourneys = response.records;
            });

        $http.post("server/getAccountDetails.php?username="+UserService.username).success
        (function (response)
            {
                $scope.points = parseInt(response.records.points);
                $scope.emailaddress = response.records.emailaddress;
            });

            $scope.username = UserService.username;

	});


 app.controller('signupController', function($scope, $http, $stateParams, $state) {

        $scope.processForm = function() {

        $http.post("server/insertUser.php?username="+$scope.username+
        "&email="+$scope.email+
        "&password="+$scope.password)
        .success(function (response)
            {
                //$scope.username = response;

                // TODO: check for success

                $state.go('signup-success', {originId: $scope.username});
            })
        .error(function (response)
            {
                var error= true;
            }
            
        )}
	});

 app.controller('loginController', function($scope, $http, $stateParams, $state, $location) {

        $scope.processForm = function() {

        $http.post("server/attemptLogin.php?email="+$scope.email+
        "&password="+$scope.password).success
        (function (response)
            {
                $scope.username = response.records.username;

                // TODO: check for success
                setCookie('username', $scope.username, 30);
                $location.path('/members/logging-in');
                location.reload();
                //location.reload();
                //$state.go('landing-page.home', {originId: $scope.username});
            });
        }

        function setCookie(cname, cvalue, exdays) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays*24*60*60*1000));
            var expires = "expires="+ d.toUTCString();
            document.cookie = cname + "=" + cvalue + ";" + expires + "; Path=/";
        }

	});

     app.controller('logoutController', function($scope, $http, $stateParams, $state, $timeout, $location) {

             document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; Path=/;"

             $timeout(function() {
             $location.path('/home');
             location.reload();
             }, 100);

	});

         app.controller('loggingInController', function($scope, $http, $stateParams, $state, $timeout, $location) {

             $timeout(function() {
             $location.path('/members/home');
             }, 100);

	});

 app.controller('journeyController', function($scope, $http, $stateParams) {

        $scope.addNewJourney = true;
        $scope.originCity = $stateParams.originId;
        $scope.destinationCity = $stateParams.destinationId;
		$http.get("server/selectJourneys.php?originId="+$scope.originCity+"+&destinationId="+$scope.destinationCity)
		    .then(function (response)
            {
                $scope.journeyResults = response.data.records;
               angular.forEach($scope.journeyResults, function(value, key){
                   // set default value for Score if there are no votes
                    if(!value.Score)
                        value.Score=0;
                    value.formattedLeaveDate = new date ('1970-30-02');
                });
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
                angular.forEach($scope.journeyResults, function(value, key){
                   // set default value for Score if there are no votes
                    if(!value.Score)
                        value.Score=0;
                });
            });
	});

 app.controller('journeyAddedController', function($scope, $http, $stateParams) {

        $scope.journeyId = $stateParams.journeyId;
        $scope.originId = $stateParams.originId;
        $scope.destinationId = $stateParams.destinationId;
	});

     app.controller('placeController', function($scope, $http, $stateParams) {

        $scope.placeName = $stateParams.placeName;

        $http.get("server/selectDestinationsForPlace.php?placeName="+$scope.placeName)
            .then(function (response)
            {
                $scope.placeDestinations = response.data.records;
            });

        $http.get("server/selectOriginsForPlace.php?placeName="+$scope.placeName)
            .then(function (response)
            {
                $scope.placeOrigins = response.data.records;
            });

        $http.get("server/selectTopRecommendationsForPlace.php?placeName="+$scope.placeName)
            .then(function (response)
            {
                $scope.recommendations = response.data.records;
            });
	});


 app.controller('prePopulatedFormController', function($scope, $http, $stateParams) {

        $scope.formData.originCityName = $stateParams.origin;
        $scope.formData.destinationCityName = $stateParams.destination;
	});

app.controller('formController', function($scope, $templateCache, $http, $state, $stateParams, UserService) {

    $scope.showValidation = function(){
        
        $scope.displayOriginMissingError = true;

    };

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
        "journeyDurationHours" : "0",
        "journeyDurationMinutes" : "30",
        "arrivalDate" : "today",
        "arriveDay" : "01",
        "arriveMonth" : "January",
        "arriveYear" : "2016",
        "arriveHour" : "12",
        "arriveMinute" : "00",
        "NoBorder" : true,
        "Direct" : true,
        "ModeOfTransport" : "shared taxi",
        "CurrencyUsed" : "America (United States) Dollars - USD",};
    
    
    // function to process the form
    $scope.processForm = function() {
        
        // Construct Dates
        // Determine if we need to pass today, yesterday, or a manually entered date.
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
                $scope.startDate = new Date($scope.formData.leaveYear, $scope.formData.leaveMonth-1, $scope.formData.leaveDay, $scope.formData.leaveHour, $scope.formData.leaveMinute);

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
        $scope.endDate = new Date($scope.formData.arriveYear, $scope.formData.arriveMonth-1, $scope.formData.arriveDay, $scope.formData.arriveHour, $scope.formData.arriveMinute);
        // create journey duration (hours)
        var diffMs = ($scope.endDate - $scope.startDate); // milliseconds between the two dates
        $scope.formData.duration = ((diffMs % 86400000) / 3600000);
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

        $http.post("server/insertJourney.php?authorId="+UserService.username+"&originCityId="+$scope.formData.originCityId+
        "&originCityName="+$scope.formData.originCityName+
        "&originCountry="+$scope.formData.originCountry+
        "&destinationCityId="+$scope.formData.destinationCityId+
        "&destinationCityName="+$scope.formData.destinationCityName+
        "&destinationCountry="+$scope.formData.destinationCountry+
        "&leaveDateTime="+$scope.formData.leaveDate+
        "&arrivalDateTime="+$scope.formData.arrivalDate+
        "&duration="+$scope.formData.duration+
        "&mode="+ $scope.formData.ModeOfTransport +
        "&currencyUsed="+$scope.formData.CurrencyUsed+
        "&price="+$scope.formData.Price+
        "&instructions="+$scope.formData.Instructions).success
        (function (response)
            {
                $scope.formData.resultId = response;
                // redirect to success page
                $state.go('form.success', {originId: $scope.formData.originCityName, destinationId: $scope.formData.destinationCityName, journeyId: $scope.formData.resultId});
            });

        // add 5 users to the user for adding this journey
        $http.post("server/addUserPoints.php?username="+UserService.username+"&points=5").success
        (function (response)
        {
            // todo: check for success/error
        })

        $http.post("server/updateRequestedJourneyStatus.php?origin="+$scope.formData.originCityName+"&destination="+$scope.formData.destinationCityName+"&status=Pending&userId="+UserService.username).success
        (function (response)
        {
            // todo: check for success/error
        })
    };

});

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

.directive('stepset', function () {
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

.directive('step', ['$parse', function ($parse) {
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