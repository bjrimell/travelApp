<?php
require_once 'connectToDb.php'; //connect to DB

//$originId= $_GET['originId'];

$result = $conn->query("SELECT
author.username AS 'Author',
js.Id AS 'Id',
originCity.name AS 'Origin',
originState.name AS 'OriginState',
originCountry.name AS 'OriginCountry',
LOWER(originCountry.SortName) AS 'OriginCountryCode',
destinationCity.name AS 'Destination',
destinationState.name AS 'DestinationState',
destinationCountry.name AS 'DestinationCountry',
LOWER(destinationCountry.SortName) AS 'DestinationCountryCode',
js.NegativeVotes,
js.PositiveVotes,
js.Instruction,
js.LeaveDateTime,
js.ArrivalDateTime,
m.Name AS 'ModeOfTransport',
m.Icon AS 'ModeIcon',
js.Price AS 'Price',
js.CurrencyUsed AS 'CurrencyUsed',
js.Direct
FROM JourneySuggestion js
INNER JOIN cities AS originCity ON js.Origin = originCity.id
INNER JOIN states AS originState ON originCity.state_id = originState.id
INNER JOIN countries AS originCountry ON originState.country_id = originCountry.Id
INNER JOIN cities AS destinationCity ON js.Destination = destinationCity.id
INNER JOIN states AS destinationState ON destinationCity.state_id = destinationState.id
INNER JOIN countries AS destinationCountry ON destinationState.country_id = destinationCountry.Id
LEFT JOIN Mode m ON js.Mode = m.Id
INNER JOIN user AS author ON author.username = js.authorId
WHERE js.ParentId = '1';");
$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"Id":"'  . $rs["Id"] . '",';
    $outp .= '"Origin":"'  . $rs["Origin"] . '",';
    $outp .= '"OriginState":"'  . $rs["OriginState"] . '",';
    $outp .= '"OriginCountry":"'  . $rs["OriginCountry"] . '",';
    $outp .= '"OriginCountryCode":"'  . $rs["OriginCountryCode"] . '",';
    $outp .= '"Destination":"'  . $rs["Destination"] . '",';
    $outp .= '"DestinationState":"'  . $rs["DestinationState"] . '",';
    $outp .= '"DestinationCountry":"'  . $rs["DestinationCountry"] . '",';
    $outp .= '"DestinationCountryCode":"'  . $rs["DestinationCountryCode"] . '",';
    $outp .= '"NegativeVotes":"'  . $rs["NegativeVotes"] . '",';
    $outp .= '"PositiveVotes":"'  . $rs["PositiveVotes"] . '",';
    $outp .= '"Instruction":"'  . $rs["Instruction"] . '",';
    $outp .= '"Author":"'  . $rs["Author"] . '",';
    $outp .= '"Direct":"'  . $rs["Direct"] . '",';
    $outp .= '"ModeOfTransport":"'  . $rs["ModeOfTransport"] . '",';
    $outp .= '"ModeIcon":"'  . $rs["ModeIcon"] . '",';
    $outp .= '"Price":"'  . $rs["Price"] . '",';
    $outp .= '"CurrencyUsed":"'  . $rs["CurrencyUsed"] . '",';
    $outp .= '"LeaveDateTime":"'  . $rs["LeaveDateTime"] . '",';
    $outp .= '"ArrivalDateTime":"'  . $rs["ArrivalDateTime"] . '"}';
}
$outp ='{"records":['.$outp.']}';
$conn->close();
echo($outp);
?>