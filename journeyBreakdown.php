<header>
    <script src="js/app.js"></script>
    </header>
<body>
<div class="container-fluid">
	<h1>Journey Breakdown</h1>
    <div ng-app="myApp" ng-cloak ng-controller="journeyController" id="">
    <div ng-repeat="journeyResult in journeyResults">
        <h2>{{journeyResult.Origin}}, {{journeyResult.OriginState}}, {{journeyResult.OriginCountry}} to {{journeyResult.Destination}}, {{journeyResult.DestinationState}}, {{journeyResult.DestinationCountry}}.</h2>
    </div>
	<div ng-app="myApp" ng-cloak ng-controller="journeyController" id="">
            <div class="table-responsive">
				<table class="table table-bordered table-striped">
					<thead>
				        <tr>
                            <td>
                                <b>Journey Travelled</b>
                            </td>
                            <td>
                                <a href="#" ng-click="sortType = 'Owner'; sortReverse = !sortReverse">
                                <b>From</b>
                                <span ng-show="sortType == 'Owner' && !sortReverse" class="glyphicon glyphicon-triangle-bottom"></span>
                                <span ng-show="sortType == 'Owner' && sortReverse" class="glyphicon glyphicon-triangle-top"></span>
                                </a>
                            </td>
                            <td>
                                <a href="#" ng-click="sortType = 'Area'; sortReverse = !sortReverse">
                                <b>Destination</b>
                                <span ng-show="sortType == 'Area' && !sortReverse" class="glyphicon glyphicon-triangle-bottom"></span>
                                <span ng-show="sortType == 'Area' && sortReverse" class="glyphicon glyphicon-triangle-top"></span>
                                </a>
                            </td>
                            <td>
                                <a href="#" ng-click="sortType = 'Band'; sortReverse = !sortReverse">
                                <b>Notes</b>
                                <span ng-show="sortType == 'Band' && !sortReverse" class="glyphicon glyphicon-triangle-bottom"></span>
                                <span ng-show="sortType == 'Band' && sortReverse" class="glyphicon glyphicon-triangle-top"></span>
                                </a>
                            </td>
                            <td>
                                <a href="#" ng-click="sortType = 'Preference'; sortReverse = !sortReverse">
                                <b>Journey Started On</b>
                                <span ng-show="sortType == 'Preference' && !sortReverse" class="glyphicon glyphicon-triangle-bottom"></span>
                                <span ng-show="sortType == 'Preference' && sortReverse" class="glyphicon glyphicon-triangle-top"></span>
                                </a>
                            </td>
                            <td>
                                <a href="#" ng-click="sortType = 'Status'; sortReverse = !sortReverse">
                                <b>Journey Ended On</b>
                                <span ng-show="sortType == 'Status' && !sortReverse" class="glyphicon glyphicon-triangle-bottom"></span>
                                <span ng-show="sortType == 'Status' && sortReverse" class="glyphicon glyphicon-triangle-top"></span>
                            </td>
                            <td>
                                <a href="#" ng-click="sortType = 'Row'; sortReverse = !sortReverse">
                                <b>Rating</b>
                                <span ng-show="sortType == 'Row' && !sortReverse" class="glyphicon glyphicon-triangle-bottom"></span>
                                <span ng-show="sortType == 'Row' && sortReverse" class="glyphicon glyphicon-triangle-top"></span>
                                </a>
                            </td>
                            <td>Reveal Details</td>
				        </tr>
				    </thead>
                    <tbody>
                        <tr ng-repeat="journeyResult in journeyResults | orderBy:sortType:sortReverse  | filter:{ Preference: searchTermPreference }" class="w3-padding-hor-16" ng-model="journeyResult">
                            <td>
                                3 days ago.
                            </td>
                            <td>
                                {{journeyResult.Origin}}, {{journeyResult.OriginState}}, {{journeyResult.OriginCountry}}.
                            </td>
                            <td>
                                {{journeyResult.Destination}}, {{journeyResult.DestinationState}}, {{journeyResult.DestinationCountry}}.
                            </td>
                            <td>
                                {{journeyResult.Instruction}}
                            </td>
                            <td>
                                {{journeyResult.LeaveDateTime}} 
                            </td>
                            <td>
                                {{journeyResult.ArrivalDateTime}}
                            </td>
                            <td>
                                {{journeyResult.PositiveVotes - journeyResult.NegativeVotes}} <span class="glyphicon glyphicon-arrow-up"></span> <span class="glyphicon glyphicon-arrow-down"></span>
                            </td>
                            <td>
                                <span class="glyphicon glyphicon-th-list"></span>
                            </td>
                        </tr>
                        <div ng-view></div>
                    </tbody>
				</table>
			</div>
			</div>
		</div>