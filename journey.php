<div class="container-fluid">
	<h1><p align="center">
        <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<!-- CrowdRoutes -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4698879235076216"
     data-ad-slot="1179143485"
     data-ad-format="auto"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>
</p></h1>
    <div class="row">
            <div class="col-lg-2">
            </div>
            <div class="col-lg-8">
                <div ng-repeat="journeyResult in journeyResults">
                    <div class="col-lg-1 text-center">
                        <h2>
                            <a ng-if="!journeyResult.hasVoted" ng-controller="VoteController" data-toggle="modal" data-target="#upvoteModal_{{journeyResult.Id}}" ng-click="changeVote(journeyResult.Id, 1)"><span class="glyphicon glyphicon-triangle-top"></span></a>
                            <a ng-if="journeyResult.hasVoted" class="not-active" ng-controller="VoteController" data-toggle="modal" data-target="#upvoteModal_{{journeyResult.Id}}" ng-click="changeVote(journeyResult.Id, 1)"><span class="glyphicon glyphicon-triangle-top"></span></a>
                        {{journeyResult.Score}}
                        <a ng-if="!journeyResult.hasVoted" ng-controller="VoteController" data-toggle="modal" data-target="#downvoteModal_{{journeyResult.Id}}" ng-click="changeVote(journeyResult.Id, -1, journeyResult.Origin, journeyResult.Destination)"><span class="glyphicon glyphicon-triangle-bottom"></span></a></span>
                        <a ng-if="journeyResult.hasVoted" class="not-active" ng-controller="VoteController" data-toggle="modal" data-target="#downvoteModal_{{journeyResult.Id}}" ng-click="changeVote(journeyResult.Id, -1, journeyResult.Origin, journeyResult.Destination)"><span class="glyphicon glyphicon-triangle-bottom"></span></a></span>
                    </div>
                    <div class="col-lg-11">
                        <div class="panel panel-default">
                            <div id="{{journeyResult.Id}}" class="panel-heading" ng-if="journeyResult.Direct=='0'">
                                <h3>Travel from <a ui-sref="place({ placeName: journeyResult.Origin})">{{journeyResult.Origin}}</a>, {{journeyResult.OriginState}} <span class="flag-icon flag-icon-{{journeyResult.OriginCountryCode}}"></span> to <a ui-sref="place({ placeName: journeyResult.Destination})">{{journeyResult.Destination}}</a> <span class="flag-icon flag-icon-{{journeyResult.DestinationCountryCode}}"></span> - <span>(Multi-step Route)</span></h3>
                                Journey started: {{journeyResult.LeaveDateTime}}<br>Journey ended: {{journeyResult.ArrivalDateTime}}
                            </div>
                            <div id="{{journeyResult.Id}}" class="panel-heading" ng-if="journeyResult.Direct=='1'">
                                <h3><span class="{{journeyResult.ModeIcon}}"></span> {{journeyResult.ModeOfTransport}} from <a ui-sref="place({ placeName: journeyResult.Origin})">{{journeyResult.Origin}}</a> <span class="flag-icon flag-icon-{{journeyResult.OriginCountryCode}}"></span> to <a ui-sref="place({ placeName: journeyResult.Destination})">{{journeyResult.Destination}}</a> <span class="flag-icon flag-icon-{{journeyResult.DestinationCountryCode}}"></span> - <span>(Direct Route)</span></h3>
                                <b>Journey started:</b> {{journeyResult.LeaveDateTime | date:'yyyy-MM-dd HH:mm:ss Z'}} <b>Journey ended:</b> {{journeyResult.ArrivalDateTime}}
                            </div>
                            <div class="panel-body">
                                <div class="row">
                                    <div class="col-lg-12">
                                        <h4><span class="glyphicon glyphicon-comment"></span> Summary:</h4> "{{journeyResult.Instruction}}"
                                    </div>
                                </div>
                                <div class="row">

                                    <div class="col-lg-6" ng-if="journeyResult.Direct=='0'">
                                        <h4><span class="glyphicon glyphicon-list"></span> Included Steps:</h4>
                                        {{journeyResults.children}}
                                        <!-- journey steps -->
                                            <ul>
                                                <li ng-repeat="child in journeyResult.Children">
                                                    <a href="#/travel-from-{{child.Origin}}-to-{{child.Destination}}">
                                                    {{child.Origin}} to {{child.Destination}}</a>
                                                </li>
                                            </ul>
                                    </div>
                                    <div class="col-lg-6"> 
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-lg-6">
                                        <h4><span class="glyphicon glyphicon-calendar"></span> Journey Date:</h4> {{journeyResult.LeaveDateTime}}
                                    </div>
                                    <div class="col-lg-6">
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-lg-6">
                                        <h4><span class="glyphicon glyphicon-time"></span> Journey Duration:</h4> {{journeyResult.Duration}} hours.
                                    </div>
                                    <div class="col-lg-6">
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-lg-6">
                                        <h4><span class="fa fa-money"></span> Price Paid:</h4> {{journeyResult.Price}} {{journeyResult.CurrencyUsed}}
                                    </div>
                                    <div class="col-lg-6">
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-lg-6">
                                        <h4><span class="glyphicon glyphicon-user"></span> Added by:</h4> {{journeyResult.Author}}
                                    </div>
                                    <div class="col-lg-6">
                                    </div>
                                </div>
                            </div>
                            <div class="panel-footer">
                                <h4><b><span class="glyphicon glyphicon-stats"></span> Community Feedback</b></h4>
                                <div class="row">
                                    <div class="col-lg-6">
                                        <button ng-if="!journeyResult.hasVoted" type="button" class="btn btn-primary" data-toggle="modal" data-target="#upvoteModal_{{journeyResult.Id}}" ng-controller="VoteController" ng-click="changeVote(journeyResult.Id, 1, journeyResult.Origin, journeyResult.Destination)">
                                            <span class="glyphicon glyphicon-thumbs-up"> </span> Upvote
                                        </button>
                                        <button ng-if="journeyResult.hasVoted" disabled type="button" class="btn btn-primary" data-toggle="modal" data-target="#upvoteModal_{{journeyResult.Id}}" ng-controller="VoteController" ng-click="changeVote(journeyResult.Id, 1, journeyResult.Origin, journeyResult.Destination)">
                                            <span class="glyphicon glyphicon-thumbs-up"> </span> Upvote
                                        </button>
                                        <button ng-if="!journeyResult.hasVoted" type="button" class="btn btn-danger" data-toggle="modal" data-target="#downvoteModal_{{journeyResult.Id}}" ng-controller="VoteController" ng-click="changeVote(journeyResult.Id, -1, journeyResult.Origin, journeyResult.Destination)">
                                            <span class="glyphicon glyphicon-thumbs-down"> </span> Downvote
                                        </button>
                                        <button ng-if="journeyResult.hasVoted" disabled type="button" class="btn btn-danger" data-toggle="modal" data-target="#downvoteModal_{{journeyResult.Id}}" ng-controller="VoteController" ng-click="changeVote(journeyResult.Id, -1, journeyResult.Origin, journeyResult.Destination)">
                                            <span class="glyphicon glyphicon-thumbs-down"> </span> Downvote
                                        </button>
                                    </div>
                                    <div class="col-lg-6">
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-lg-4">
                                        <h3><span class="glyphicon glyphicon-thumbs-up"></span> {{journeyResult.Upvote}} upvotes</h3>
                                        <h3><span class="glyphicon glyphicon-thumbs-down"></span> {{journeyResult.Downvote}} downvotes</h3>
                                    </div>
                                    <div class="col-lg-4">
                                        <h3><a href="mailto:?subject=Check out this journey&body=Check out this journey on CrowdRoutes: {{journeyResult.ShareUrl}}" class="btn btn-default btn-lg" role="button"><span class="glyphicon glyphicon-envelope"></span> Share via email</a></h3>
                                        <h3><a target="facebook" href="https://www.facebook.com/sharer/sharer.php?u={{journeyResult.ShareUrl}}" class="btn btn-primary btn-lg" role="button"><span class="fa fa-facebook"></span> Share on Facebook</a></h3>
                                    </div>
                                    <div class="col-lg-4">
                                        <h3><a target="twitter" href="https://twitter.com/intent/tweet?text={{journeyResult.ModeOfTransport}}+from+{{journeyResult.Origin}}+to+{{journeyResult.Destination}}+{{journeyResult.ShareUrl}}" class="btn btn-info btn-lg" role="button"><span class="fa fa-twitter"></span> Tweet</a></h3>
                                        <h3><a href="whatsapp://send?text=Check out this journey on CrowdRoutes: {{journeyResult.ShareUrl}}" data-action="share/whatsapp/share" class="btn btn-green btn-lg" role="button">Share via Whatsapp</a></h3>
                                    </div>
                                </div>
                            <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<!-- CrowdRoutes -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4698879235076216"
     data-ad-slot="1179143485"
     data-ad-format="auto"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>
                            </div>
                        </div>
                    </div>
                    <!-- Start of Upvote Modal -->
                    <div class="modal fade text-center" id="upvoteModal_{{journeyResult.Id}}" tabindex="-1" role="dialog" 
                        aria-labelledby="myModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <!-- Modal Header -->
                                <div class="modal-header">
                                    <button type="button" class="close" 
                                    data-dismiss="modal">
                                        <span aria-hidden="true">&times;</span>
                                        <span class="sr-only">Close</span>
                                    </button>
                                    <h4 class="modal-title" id="myModalLabel">
                                        Thanks for your feedback!
                                    </h4>
                                </div> 
                                <!-- Modal Body -->
                                <div class="modal-body">
                                    <!-- START OF FORM -->
                                    <form class="form-horizontal" role="form">
                                        <div class="row">
                                            <div class="radio col-lg-12">
                                                <h4>Why did you upvote this journey?</h4>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <div class="radio">
                                                <h4><label>
                                                    <input name="upvoteGroup" type="radio" checked="checked" ng-model="addNewJourney" data-ng-value="true"/>
                                                    I have taken this journey and it is accurate
                                                </label></h4>
                                            </div>
                                            <div class="radio">
                                                <h4><label>
                                                    <input name="upvoteGroup" type="radio" ng-model="addNewJourney" data-ng-value="false"/>
                                                This is a useful tip</label></h4>
                                            </div>
                                        </div>
                                    </form>
                                    <!-- END OF FORM -->
                                </div>
                                <!-- Modal Footer -->
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-primary" data-dismiss="modal">Got it</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- End of Upvote Modal -->
                    <!-- Downvote Modal -->
                    <div class="modal fade text-center" id="downvoteModal_{{journeyResult.Id}}" tabindex="-1" role="dialog" 
                        aria-labelledby="myModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <!-- Modal Header -->
                                <div class="modal-header">
                                    <button type="button" class="close" 
                                    data-dismiss="modal">
                                        <span aria-hidden="true">&times;</span>
                                        <span class="sr-only">Close</span>
                                    </button>
                                    <h3 class="modal-title" id="myModalLabel">
                                        Thanks for your feedback!
                                    </h3>
                                </div> 
                                <!-- Modal Body -->
                                <div class="modal-body">
                                    <!-- START OF FORM -->
                                    <form class="form-horizontal" role="form">
                                        <div class="row">
                                            <div class="radio col-lg-12">
                                                <h4>Why did you downvote this journey?</h4>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <div class="radio">
                                                <h4><label>
                                                    <input name="collapseGroup" type="radio" checked="checked" ng-model="addNewJourney" data-ng-value="true"/>
                                                    This is not the best route to take
                                                </label></h4>
                                            </div>
                                            <div class="radio">
                                                <h4><label>
                                                    <input name="collapseGroup" type="radio" ng-model="addNewJourney" data-ng-value="false"/>
                                                Some details of this journey are innaccurate</label></h4>
                                            </div>
                                        </div>
                                    </form>
                                    <!-- END OF FORM -->
                                </div>
                                <!-- Modal Footer -->
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                                    <a data-dismiss="modal" class="btn btn-success" ng-controller="VoteController" ng-click="downVoteAction(journeyResult.Id, addNewJourney)">
                                        Save</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- End of Downvote Modal -->
                </div>
                <!-- Start of individual journeys only content -->
                <div class="text-center" ng-show="journeyId">
                    <h2><a ui-sref="journeyResults({originId: originCity, destinationId: destinationCity})">VIEW ALTERNATE SUGGESTIONS FOR THIS TRIP.</a></h2>
                </div>
                <!-- End of individual journeys only content -->
                <!-- Start of no results content -->
                <div class="text-center" ng-show="!journeyResults.length">
                    <div class="alert alert-danger">
                        <h2><strong>No results found!</strong></h2>
                        <h4>We do not currently have any journeys listed for {{originCity}} to {{destinationCity}}.</h4>
                        <h4>If you have enough <span class="glyphicon glyphicon-fire glyph-small glyph-orange"></span> points, you can request this journey below.</h4>
                    </div>
                    <div ng-controller="accountController">
                        <div ng-if="points < 5" class="row">
                            <div class="col-lg-2"></div>
                            <div class="col-lg-8">
                                <div ng-controller="accountController" class="panel panel-primary">
                                    <div class="panel-heading">Request this journey.</div>
                                        <div class="panel-body">Ask people who have done this trip to help you.
                                            <div class="padded">
                                                <div class="alert alert-danger">
                                                    <h3><strong>Insufficent <span class="glyphicon glyphicon-fire glyph-small glyph-orange"></span> points!</strong></h3>
                                                    <h5>You do not have enough <span class="glyphicon glyphicon-fire glyph-small glyph-orange"></span> points to request a journey. Requests cost just 5 <span class="glyphicon glyphicon-fire glyph-small glyph-orange"></span> points, which you can earn by <a ui-sref="form.step-1">adding just one journey</a> that you know about. You can earn even more points by adding a user requested journey.</h5>  
                                                </div>
                                            </div>
                                        </div>
                                    <div class="panel-footer"><a disabled class="btn btn-primary btn-lg">Request Now</a></div>
                                </div>
                            </div>
                            <div class="col-lg-2"></div>
                        </div>
                        <div ng-if="points > 4" class="row">
                            <div class="col-lg-2"></div>
                            <div class="col-lg-8">
                                <div ng-controller="accountController" class="panel panel-primary">
                                    <div class="panel-heading"><h4>Request this journey.</h4></div>
                                    <div class="panel-body">Ask people who have done this trip to help you.</div>
                                    <div class="padded">
                                        <div class="alert alert-success">
                                            <h3><strong>You have enough <span class="glyphicon glyphicon-fire glyph-small glyph-orange"></span> points!</strong></h3>
                                            <h5>You have enough <span class="glyphicon glyphicon-fire glyph-small glyph-orange"></span> points to request a journey. Requests cost just 5 <span class="glyphicon glyphicon-fire glyph-small glyph-orange"></span> points, which you can earn by <a ui-sref="form.step-1">adding just one journey</a> that you know about. You can earn even more points by adding a user requested journey.</h5>  
                                        </div>
                                    </div>
                                    <div class="panel-footer"><a data-toggle="modal" data-target="#journeyRequestedModal" ng-controller="requestJourneyController" ng-click="requestJourney(originCity, destinationCity, false)" class="btn btn-primary btn-lg">Request Now</a></div>
                                </div>
                            </div>
                            <div class="col-lg-2"></div>
                        </div>
                    </div>
                </div>
                <!-- start of journey request modal -->
                <div class="modal fade text-center" id="journeyRequestedModal" tabindex="-1" role="dialog" 
                    aria-labelledby="myModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <!-- Modal Header -->
                            <div class="modal-header">
                                <button type="button" class="close" 
                                data-dismiss="modal">
                                    <span aria-hidden="true">&times;</span>
                                    <span class="sr-only">Close</span>
                                </button>
                                <h3 class="modal-title" id="myModalLabel">
                                    Journey requested!
                                </h3>
                            </div> 
                            <!-- Modal Body -->
                            <div class="modal-body">
                                <!-- START OF FORM -->
                                <form class="form-horizontal" role="form">
                                    <div class="row" ng-controller="accountController">
                                        <div class="radio col-lg-12">
                                            <h4>Your request has been processed, and our community have been alerted.</h4>
                                            <h5>You will be alerted by email at <b>{{emailaddress}}</b> once someone has added this journey.</h5>
                                            <h5>You have used 5 <span class="glyphicon glyphicon-fire glyph-small glyph-orange"></span> points, but you can earn more right now by adding journeys that you know about.</h5>
                                        </div>
                                    </div>
                                </form>
                                <!-- END OF FORM -->
                            </div>
                            <!-- Modal Footer -->
                            <div class="modal-footer">
                                <button type="button" class="btn btn-success" data-dismiss="modal">Got it!</button>
                            </div>
                        </div>
                    </div>
                </div>
                    <!-- End of journey requested modal -->
                <!-- End of no results content -->
        </div>
        <div class="col-lg-2">
        </div>
    </div>
    <h1><p align="center">
        <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<!-- CrowdRoutes -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4698879235076216"
     data-ad-slot="1179143485"
     data-ad-format="auto"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script></p></h1>
</div>