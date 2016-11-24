<?php
require_once 'connectToDb.php'; //connect to DB

$originId= $_GET['originId'];
$destinationId= $_GET['destinationId'];

$result = $conn->query("SELECT
author.username AS 'Author',
js.Id AS 'Id',
js.OriginName AS 'Origin',
js.destinationName AS 'Destination',
js.NegativeVotes,
js.PositiveVotes,
js.Instruction,
js.LeaveDateTime,
js.ArrivalDateTime,
js.Duration,
js.originCountry,
js.destinationCountry,
m.Name AS 'ModeOfTransport',
m.Icon AS 'ModeIcon',
js.Price AS 'Price',
js.CurrencyUsed AS 'CurrencyUsed',
js.Direct,
(SELECT COUNT(*) FROM Vote Where JourneySuggestionId = js.Id AND Value=1) AS Upvote,
(SELECT COUNT(*) FROM Vote Where JourneySuggestionId = js.Id AND Value=-1) AS Downvote,
(SELECT SUM(Value) FROM Vote Where JourneySuggestionId = js.Id) AS Score
FROM JourneySuggestion js
LEFT JOIN Mode m ON js.Mode = m.Id
INNER JOIN User AS author ON author.username = js.authorId
WHERE originName = '$originId' AND destinationName = '$destinationId'
ORDER BY Score DESC;");
$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    $parentId = $rs['Id'];
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"Id":"'  . $rs["Id"] . '",';
    $outp .= '"Origin":"'  . $rs["Origin"] . '",';
    $outp .= '"OriginEncoded":"'  . str_replace(" ", "%20",$rs["Origin"]) . '",';
    $outp .= '"OriginCountryCode":"'  . strtolower($rs["originCountry"]) . '",';
    $outp .= '"Destination":"'  . $rs["Destination"] . '",';
    $outp .= '"DestinationEncoded":"'  . str_replace(" ", "+",$rs["Destination"]) . '",';
    $long_url = urlencode('http://www.crowdroutes.com/#/travel-from-' . $rs["Origin"] . '-to-' . $rs["Destination"] . '?journeyId=' . $rs["Id"]);
    $bitly_login = 'tortanlimited';
    $bitly_apikey = 'R_1f6a7bd8922f4e74b2b7a3dfa658562d';
    $bitly_response = json_decode(file_get_contents("http://api.bit.ly/v3/shorten?login={$bitly_login}&apiKey={$bitly_apikey}&longUrl={$long_url}&format=json"));
    $short_url = $bitly_response->data->url;
    $outp .= '"ShareUrl":"'  . $short_url . '",';
    //$outp .- '"short_url":"' . json_decode(file_get_contents("http://api.bit.ly/v3/shorten?login=tortanlimited&apiKey=bitlyapikey&longUrl=".urlencode("http://example.com")."&format=json"))->data->url;
    $outp .= '"DestinationCountryCode":"'  . strtolower($rs["destinationCountry"]) . '",';
    $outp .= '"Upvote":"'  . $rs["Upvote"] . '",';
    $outp .= '"Downvote":"'  . $rs["Downvote"] . '",';
    $outp .= '"Score":"' . $rs["Score"] . '",';
    $outp .= '"Instruction":"'  . $rs["Instruction"] . '",';
    $outp .= '"Author":"'  . $rs["Author"] . '",';
    $outp .= '"Direct":"'  . $rs["Direct"] . '",';
    $outp .= '"ModeOfTransport":"'  . $rs["ModeOfTransport"] . '",';
    $outp .= '"ModeIcon":"'  . $rs["ModeIcon"] . '",';
    $outp .= '"Price":"'  . $rs["Price"] . '",';
    $outp .= '"CurrencyUsed":"'  . $rs["CurrencyUsed"] . '",';
    $outp .= '"Duration":"'  . $rs["Duration"] . '",';
    $outp .= '"LeaveDateTime":"'  . $rs["LeaveDateTime"] . '",';
    // Find children for this row      
        $subResult = $conn->query("SELECT js.Id,
        originCity.Name AS 'Origin',
        destinationCity.Name AS 'Destination'
        FROM JourneySuggestion js
        INNER JOIN cities AS originCity ON js.Origin = originCity.Id
        INNER JOIN cities AS destinationCity ON js.Destination = destinationCity.Id
        WHERE js.parentId = '$parentId';");
        $subOutp = "";
        while($subRs = $subResult->fetch_array(MYSQLI_ASSOC)) {
        if ($subOutp != "") {$subOutp .= ",";}
        $subOutp .= '{"Id":"'  . $subRs["Id"] . '",';
        $subOutp .= '"Origin":"'  . $subRs["Origin"] . '",';
        $subOutp .= '"Destination":"'  . $subRs["Destination"] . '"}';

    } //end of subquery loop
    $outp .= '"Children": [' . $subOutp . '],';
    $outp .= '"ArrivalDateTime":"'  . $rs["ArrivalDateTime"] . '"}';


}

$outp ='{"records":['.$outp.']}';

$conn->close();
echo($outp);
?>