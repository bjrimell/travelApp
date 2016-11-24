<?php
require_once 'connectToDb.php'; //connect to DB

$placeName= $_GET['placeName'];

$result = $conn->query("SELECT DISTINCT
        OriginName
        FROM JourneySuggestion
        WHERE Destinationname = '$placeName';");
//WHERE originName = '$originId' AND destinationName = '$destinationId';");
$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"OriginName":"'  . $rs["OriginName"] . '"}';

}

$outp ='{"records":['.$outp.']}';

$conn->close();
echo($outp);
?>