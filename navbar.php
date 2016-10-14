<nav class="navbar navbar-inverse">
  <div class="container-fluid">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span> 
      </button>
      <a class="navbar-brand" href="/Hackpacker/#/home"><?php include './var/websiteName.php' ?></a>
    </div>
    <div class="collapse navbar-collapse" id="myNavbar">
      <ul class="nav navbar-nav">
        <li><a ui-sref="about">How it works</a></li>
        <li><a ui-sref="form.step-1">Add Journey</a></li>
      </ul>
      <ul class="nav navbar-nav navbar-right">
        <li><a href="#"><span class="glyphicon glyphicon-user"></span> Sign Up</a></li>
        <li><a href="#"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>
      </ul>
      <form class="navbar-form" role="search">
          {{originid = chosenOriginPlaceDetails.place_id;""}}
          {{formData.originCityName = chosenOriginPlace;""}}
          <input class="form-control" ng-model="chosenOriginPlace" details="chosenOriginPlaceDetails" googleplace/>
          {{destinationCityId = chosenDestinationPlaceDetails.place_id;""}}
          {{destinationCityName = chosenDestinationPlace;""}}
          <input class="form-control"  ng-model="chosenDestinationPlace" details="chosenDestinationPlaceDetails" googleplace/>
        <!--<input class="form-control" id="ex1" type="text" ng-model="originCity" placeholder="Travelling from...">
        <input class="form-control" id="ex1" type="text" ng-model="destinationCity" placeholder="Travelling to...">-->
        <a ui-sref="journeyResults({ originId: chosenOriginPlace, destinationId: chosenDestinationPlace })" class="btn btn-primary"><span class="glyphicon glyphicon-search"></span> Search Journeys</a>
      </form>
    </div>
  </div>
</nav>
<header>
</header>