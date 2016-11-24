<?php
require_once 'connectToDb.php'; //connect to DB
$username = $_GET['username'];

$result = $conn->query("SELECT origin,
destination,
status,
count(*) As count
FROM JourneyRequest
WHERE UserId = '$username'
GROUP BY destination, status;");
$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"Origin":"'  . $rs["origin"] . '",';
    $outp .= '"Destination":"'  . $rs["destination"] . '",';
    $outp .= '"Status":"'  . $rs["status"] . '",';
    $outp .= '"Count":"'  . $rs["count"] . '"}';
}

$outp ='{"records":['.$outp.']}';

$conn->close();
echo($outp);
?>