<?php 
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=UTF-8");
	//$conn = new mysqli("localhost", "root", "", "PlanetCracker");
	$conn = new mysqli("localhost", "root", "qu5Wtl1xvP", "PlanetCracker");
	if($conn->connect_errno > 0){
    die('Unable to connect to database [' . $conn->connect_error . ']');
}
?>