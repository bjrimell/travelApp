<?php
require_once 'connectToDb.php'; //connect to DB

$result = $conn->query("SELECT id, count(*) as count, origin, destination FROM JourneyRequest
GROUP BY origin, destination
ORDER BY Id DESC
LIMIT 5;");
$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"Origin":"'  . $rs["origin"] . '",';
    $outp .= '"Destination":"'  . $rs["destination"] . '",';
    $outp .= '"Count":"'  . $rs["count"] . '"}';

}

$outp ='{"records":['.$outp.']}';

$conn->close();
echo($outp);
?>