<?php
require_once 'connectToDb.php';

$journeyId= $_GET['journeyId'];

$result = $conn->query("SELECT
author.username AS 'Author',
l.Direct AS 'Direct',
l.LeaveDateTime AS 'LeaveDateTime',
originCity.Name AS 'Origin',
originState.Name AS 'OriginState',
originCountry.Name AS 'OriginCountry',
LOWER(originCountry.SortName) AS 'OriginCountryCode',
m.Name AS 'ModeOfTransport',
m.Icon AS 'ModeIcon',
l.ArriveDateTime AS 'ArrivalDateTime',
destinationCity.name AS 'Destination',
destinationState.Name AS 'DestinationState',
destinationCountry.Name AS 'DestinationCountry',
LOWER(destinationCountry.SortName) AS 'DestinationCountryCode',
l.Price AS 'Price',
l.CurrencyCode AS 'CurrencyCode',
l.PricePerPerson AS 'PricePerPerson',
l.Instruction AS 'Instruction',
l.PositiveVotes AS 'PositiveVotes',
l.NegativeVotes AS 'NegativeVotes'
FROM leg l
INNER JOIN JourneySuggestionLeg jsl ON jsl.LegId = l.Id
INNER JOIN Mode m ON l.Mode = m.Id
INNER JOIN cities AS originCity ON l.Origin = originCity.id
INNER JOIN states AS originState ON originCity.state_id = originState.id
INNER JOIN countries AS originCountry ON originState.country_id = originCountry.Id
INNER JOIN cities AS destinationCity ON l.Destination = destinationCity.id
INNER JOIN states AS destinationState ON destinationCity.state_id = destinationState.id
INNER JOIN countries AS destinationCountry ON destinationState.country_id = destinationCountry.id
INNER JOIN user AS author ON author.username = l.authorId
WHERE jsl.JourneySuggestionId='$journeyId'");
$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"Origin":"'  . $rs["Origin"] . '",';
    $outp .= '"OriginState":"'  . $rs["OriginState"] . '",';
    $outp .= '"OriginCountry":"'  . $rs["OriginCountry"] . '",';
    $outp .= '"OriginCountryCode":"'  . $rs["OriginCountryCode"] . '",';
    $outp .= '"ModeOfTransport":"'  . $rs["ModeOfTransport"] . '",';
    $outp .= '"ModeIcon":"'  . $rs["ModeIcon"] . '",';
    $outp .= '"Destination":"'  . $rs["Destination"] . '",';
    $outp .= '"DestinationState":"'  . $rs["DestinationState"] . '",';
    $outp .= '"DestinationCountry":"'  . $rs["DestinationCountry"] . '",';
    $outp .= '"DestinationCountryCode":"'  . $rs["DestinationCountryCode"] . '",';
    $outp .= '"NegativeVotes":"'  . $rs["NegativeVotes"] . '",';
    $outp .= '"PositiveVotes":"'  . $rs["PositiveVotes"] . '",';
    $outp .= '"Instruction":"'  . $rs["Instruction"] . '",';
    $outp .= '"Price":"'  . $rs["Price"] . '",';
    $outp .= '"CurrencyCode":"'  . $rs["CurrencyCode"] . '",';
    $outp .= '"Author":"'  . $rs["Author"] . '",';
    $outp .= '"Direct":"'  . $rs["Direct"] . '",';
    $outp .= '"LeaveDateTime":"'  . $rs["LeaveDateTime"] . '",';
    $outp .= '"ArrivalDateTime":"'  . $rs["ArrivalDateTime"] . '"}';
}
$outp ='{"records":['.$outp.']}';
$conn->close();
echo($outp);
?>