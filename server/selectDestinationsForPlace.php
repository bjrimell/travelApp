<?php
require_once 'connectToDb.php'; //connect to DB

$placeName= $_GET['placeName'];

$result = $conn->query("SELECT DISTINCT
        Destinationname
        FROM JourneySuggestion
        WHERE OriginName = '$placeName';");
//WHERE originName = '$originId' AND destinationName = '$destinationId';");
$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"destinationName":"'  . $rs["Destinationname"] . '"}';

}

$outp ='{"records":['.$outp.']}';

$conn->close();
echo($outp);
?>