<?php
require_once 'connectToDb.php'; //connect to DB

$placeName= $_GET['placeName'];

$result = $conn->query("SELECT
        rec.RecommendationPlaceName,
        cat.Name,
        cat.Icon
        FROM Recommendation rec
        INNER JOIN RecommendationCategory cat
        ON cat.Id = rec.Category
        WHERE rec.PlaceName = '$placeName';");
//WHERE originName = '$originId' AND destinationName = '$destinationId';");
$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"RecommendationPlaceName":"'  . $rs["RecommendationPlaceName"] . '",';
    $outp .= '"Category":"'  . $rs["Name"] . '",';
    $outp .= '"CategoryIcon":"'  . $rs["Icon"] . '"}';

}

$outp ='{"records":['.$outp.']}';

$conn->close();
echo($outp);
?>