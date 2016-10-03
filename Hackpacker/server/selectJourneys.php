<?php
require_once 'connectToDb.php'; //connect to DB

$originId= $_GET['originId'];
$destinationId= $_GET['destinationId'];

$result = $conn->query("SELECT js.Id AS 'Id', originCity.name AS 'Origin', originState.name AS 'OriginState', originCountry.name AS 'OriginCountry', destinationCity.name AS 'Destination', destinationState.name AS 'DestinationState', destinationCountry.name AS 'DestinationCountry', js.NegativeVotes, js.PositiveVotes, js.Instruction, js.LeaveDateTime, js.ArrivalDateTime FROM JourneySuggestion js
INNER JOIN cities AS originCity ON js.Origin = originCity.id
INNER JOIN states AS originState ON originCity.state_id = originState.id
INNER JOIN countries AS originCountry ON originState.country_id = originCountry.Id
INNER JOIN cities AS destinationCity ON js.Destination = destinationCity.id
INNER JOIN states AS destinationState ON destinationCity.state_id = destinationState.id
INNER JOIN countries AS destinationCountry ON destinationState.country_id = destinationCountry.Id
WHERE originCity.name = '$originId' AND destinationCity.name = '$destinationId';");
$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"Id":"'  . $rs["Id"] . '",';
    $outp .= '"Origin":"'  . $rs["Origin"] . '",';
    $outp .= '"OriginState":"'  . $rs["OriginState"] . '",';
    $outp .= '"OriginCountry":"'  . $rs["OriginCountry"] . '",';
    $outp .= '"Destination":"'  . $rs["Destination"] . '",';
    $outp .= '"DestinationState":"'  . $rs["DestinationState"] . '",';
    $outp .= '"DestinationCountry":"'  . $rs["DestinationCountry"] . '",';
    $outp .= '"NegativeVotes":"'  . $rs["NegativeVotes"] . '",';
    $outp .= '"PositiveVotes":"'  . $rs["PositiveVotes"] . '",';
    $outp .= '"Instruction":"'  . $rs["Instruction"] . '",';
    $outp .= '"LeaveDateTime":"'  . $rs["LeaveDateTime"] . '",';
    $outp .= '"ArrivalDateTime":"'  . $rs["ArrivalDateTime"] . '"}';
}
$outp ='{"records":['.$outp.']}';
$conn->close();
echo($outp);
?>