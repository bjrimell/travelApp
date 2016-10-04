<nav class="navbar navbar-inverse">
  <div class="container-fluid">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span> 
      </button>
      <a class="navbar-brand" href="/Hackpacker/#/"><?php include './var/websiteName.php' ?></a>
    </div>
    <div class="collapse navbar-collapse" id="myNavbar">
      <ul class="nav navbar-nav">
      <li><a href="#how_to-earn-money-while-you-travel">How it works</a></li> 
        <li class=""><a href="#">Add Journey</a></li>
        <li class=""><a href="#">Top Earners League</a></li>
      </ul>
      <ul class="nav navbar-nav navbar-right">
        <li><a href="#"><span class="glyphicon glyphicon-user"></span> Sign Up</a></li>
        <li><a href="#"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>
      </ul>
      <form class="navbar-form" role="search">
        <input class="form-control" id="ex1" type="text" ng-model="originCity" placeholder="Travelling from...">
        <input class="form-control" id="ex1" type="text" ng-model="destinationCity" placeholder="Travelling to...">
        <a href="#/travel-from-{{originCity}}-to-{{destinationCity}}" class="btn btn-primary"><span class="glyphicon glyphicon-search"></span> Search</a>
      </form>
    </div>
  </div>
</nav>
<header>
    <script src="js/app.js"></script>
</header>