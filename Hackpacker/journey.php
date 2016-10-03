<?php include 'standardHeader.php'; ?>
<header>
    <script src="js/app.js"></script>
    <script src="js/collapse.js"></script>
</header>
<body>
<div class="container-fluid">
	<h2>All journeys listed by fellow users for:</h2>
    <h3><i>Corozal, Sucre (Colombia) to Bogota, Bogota (Colombia).</i></h3>
	<div ng-app="myApp" ng-cloak ng-controller="journeyController" id="">
            <div class="table-responsive">
				<table class="table table-bordered table-striped">
					<thead>
				        <tr>
                            <td>
                                <a href="#" ng-click="sortType = 'Row'; sortReverse = !sortReverse">
                                <b>Community Rating</b>
                                <span ng-show="sortType == 'Row' && !sortReverse" class="glyphicon glyphicon-triangle-bottom"></span>
                                <span ng-show="sortType == 'Row' && sortReverse" class="glyphicon glyphicon-triangle-top"></span>
                                </a>
                            </td>
                            <td>
                                <b>Travelled</b>
                            </td>
                            <td>
                                <b>Journey Duration</b>
                            </td>
                            <td>
                                <a href="#" ng-click="sortType = 'Band'; sortReverse = !sortReverse">
                                <b>Notes</b>
                                <span ng-show="sortType == 'Band' && !sortReverse" class="glyphicon glyphicon-triangle-bottom"></span>
                                <span ng-show="sortType == 'Band' && sortReverse" class="glyphicon glyphicon-triangle-top"></span>
                                </a>
                            </td>
                            <td>
                                <a href="#" ng-click="sortType = 'Row'; sortReverse = !sortReverse">
                                <b>Price Paid Per Person</b>
                                <span ng-show="sortType == 'Row' && !sortReverse" class="glyphicon glyphicon-triangle-bottom"></span>
                                <span ng-show="sortType == 'Row' && sortReverse" class="glyphicon glyphicon-triangle-top"></span>
                                </a>
                            </td>
				        </tr>
				    </thead>
                    <tbody>
                        <tr ng-repeat="journeyResult in journeyResults | orderBy:sortType:sortReverse  | filter:{ Preference: searchTermPreference }" class="w3-padding-hor-16" ng-model="journeyResult">
                            <td>
                                <div ng-controller="VoteController">
                                <h1><b><span>{{journeyResult.PositiveVotes - journeyResult.NegativeVotes}}</span></b></h1>
                                <i title="Up Votes" ng-click="changeVote(vote, 'up')" class="fa fa-arrow-circle-up fa-2x" ng-class="{true:'up', false:''}[vote=='up']"></i>
                                <i title="Down Votes" ng-click="changeVote(vote, 'down')" class="fa fa-arrow-circle-down fa-2x"  ng-class="{true:'down', false:''}[vote=='down']"></i>
                                </div>
                            </td>
                            <td>
                                <i>3 days ago.</i>
                            </td>
                            <td>
                                <i>6.5 hours</i>
                            </td>
                            <td>
                                I left at <b>{{journeyResult.LeaveDateTime}}</b> and arrived at <b>{{journeyResult.ArrivalDateTime}}</b>.
                                <br><br>
                                {{journeyResult.Instruction}}
                                <br><br>
                                <a href ="journeyBreakdown.php/{{journeyResult.Id}}" type="button" class="btn btn-success" data-toggle="collapse" data-target="#demo">
                                    <span class="glyphicon glyphicon-collapse-down"></span> Show Journey Details
                                </button>
                            </td>
                            <td>
                                <i>50,000 USD.</i>
                            </td>
                        </tr>
                    </tbody>
				</table>
			</div>
			</div>
		</div>
<?php include 'footer.php'; ?>