<!DOCTYPE html>
<html lang="en">
<head>


  <title><?php include './var/websiteName.php' ?></title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="google-site-verification" content="Bmu78dAwdClCvBFBRXO4x5MGYIel_P0ahDgt6od2roM" />
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
  <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBuBZw01MOq7yZWB4f5KGwY_ncPHoDiLeE&libraries=places"></script>
  <!--<script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&libraries=places&key=AIzaSyBuBZw01MOq7yZWB4f5KGwY_ncPHoDiLeE"></script>-->
  <!-- ADDED -->
      <link rel="stylesheet" href="//cdn.jsdelivr.net/fontawesome/4.5.0/css/font-awesome.css">
    <link rel="stylesheet" href="//cdn.jsdelivr.net/bootstrap/3.3.6/css/bootstrap.min.css">
    <link rel="stylesheet" href="//mgcrea.github.io/angular-strap/styles/libs.min.css">
    <link rel="stylesheet" href="//mgcrea.github.io/angular-strap/styles/docs.min.css">
      <script src="//cdn.jsdelivr.net/angularjs/1.5.5/angular.min.js" data-semver="1.5.5"></script>
    <script src="//cdn.jsdelivr.net/angularjs/1.5.5/angular-animate.min.js" data-semver="1.5.5"></script>
    <script src="//cdn.jsdelivr.net/angularjs/1.5.5/angular-sanitize.min.js" data-semver="1.5.5"></script>
    <!--
    <script src="//mgcrea.github.io/angular-strap/dist/angular-strap.js" data-semver="v2.3.8"></script>
    <script src="//mgcrea.github.io/angular-strap/dist/angular-strap.tpl.js" data-semver="v2.3.8"></script>
    <script src="//mgcrea.github.io/angular-strap/docs/angular-strap.docs.tpl.js" data-semver="v2.3.8"></script>
    -->
    <!-- ORIGINAL -->

  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
  <!--<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js"></script>-->
  <!--<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.2.16/angular-animate.min.js"></script>-->
  <script src="//cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.2.8/angular-ui-router.min.js"></script>
  <!-- typeahead is used for smart city search -->
  <!--<script src="//netsh.pp.ua/upwork-demo/1/js/typeahead.js"></script>-->
  <link data-require="fontawesome@*" data-semver="4.1.0" rel="stylesheet" href="//netdna.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" />
  <link rel="stylesheet" href="./flags/css/flag-icon.min.css">
  <script>
    document.write('<base href="' + document.location + '" />');
  </script>
  <!--<script src="js/googlePlaces.js"></script>-->
  <script src="js/app.js"></script>
  <script src="js/checkLogin.js"></script>
  <!--<script src="js/formApp.js"></script>-->
  <link rel="stylesheet" type="text/css" href="style.css">
  <link rel="stylesheet" type="text/css" href="formStyle.css">
  <link rel="icon" href="./images/favicon.png">
  <!-- START OF ADBLOCK DETECTION -->
  <script type="text/javascript">
    var adblock = true;
</script>
<script type="text/javascript" src="js/adframe.js"></script>
<script type="text/javascript">
    if(adblock) {
          //adblock is installed and enabled on this site.
          window.location.replace("./adBlockDetected.php");
    }
</script>

<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-87462046-1', 'auto');
//  ga('send', 'pageview'); THIS LINE COMES WITH GOOGLE ANALYTICS BUT REMOVED DUE TO Angulartic implementation

</script>
<script src="./bower_components/angulartics/dist/angulartics.min.js"></script>
<script src="./bower_components/angulartics-google-analytics/dist/angulartics-ga.min.js"></script>
  <!--
  <script>
window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
ga('create', 'UA-87462046-1', 'auto');

// Replace the following lines with the plugins you want to use.
ga('require', 'eventTracker');
ga('require', 'outboundLinkTracker');
ga('require', 'urlChangeTracker');
// ...

ga('send', 'pageview');
</script>
<script async src='https://www.google-analytics.com/analytics.js'></script>
-->
<!--<script async src='js/autotrack.js'></script>-->

</head>
<?php include 'navbar.php'; ?> 