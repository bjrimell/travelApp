<nav class="navbar navbar-inverse">
  <div class="container-fluid">
    <div ng-controller="homeController" class="navbar-header">
      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span> 
      </button>
      <a id="homeLinkAnon" display: hidden class="navbar-brand" href="./#/home"><?php include './var/websiteName.php' ?></a>
      <a id="homeLinkLoggedIn" display: hidden class="navbar-brand" ui-sref="landing-page.home"><?php include './var/websiteName.php' ?></a>
    </div>
    <div class="collapse navbar-collapse" id="myNavbar">
      <ul class="nav navbar-nav">
        <li><a title="" ui-sref="about">How it works</a></li>
        <li><a ui-sref="form.step-1">Add Journey</a></li>
      </ul>
      <ul ng-controller="homeController" id="loggedIn" display: hidden class="nav navbar-nav navbar-right">
      <li><p class='navbar-text'>Logged in as {{username}}</li><li><a ui-sref='logout'><span class='glyphicon glyphicon-log-out'></span> Logout</a></li>
      </ul>
      <ul>
      <ul id="anon" display: hidden class="nav navbar-nav navbar-right">
      <li><a ui-sref='signup'><span class='glyphicon glyphicon-user'></span> Sign Up</a></li><li><a ui-sref='login'><span class='glyphicon glyphicon-log-in'></span> Login</a></li>
      </ul>
<!--      <form class="navbar-form" role="search">
          {{originid = chosenOriginPlaceDetails.place_id;""}}
          {{formData.originCityName = chosenOriginPlace;""}}
          <input class="form-control" ng-model="chosenOriginPlace" details="chosenOriginPlaceDetails" googleplace/>
          {{destinationCityId = chosenDestinationPlaceDetails.place_id;""}}
          {{destinationCityName = chosenDestinationPlace;""}}
          <input class="form-control"  ng-model="chosenDestinationPlace" details="chosenDestinationPlaceDetails" googleplace/>
        <a ui-sref="journeyResults({ originId: chosenOriginPlace, destinationId: chosenDestinationPlace })" class="btn btn-primary"><span class="glyphicon glyphicon-search"></span> Search Journeys</a>
      </form>
      -->
    </div>
  </div>
</nav>
<header>
</header>