<?php
require_once 'connectToDb.php'; //connect to DB

$username= $_GET['username'];

$result = $conn->query("SELECT
points,
emailaddress
FROM User
WHERE username='$username'
LIMIT 1;");

$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"points":"'  . $rs["points"] . '",';
    $outp .= '"emailaddress":"'  . $rs["emailaddress"] . '"}';
}

$outp ='{"records":'.$outp.'}';
//$outp ='{"records":['.$outp.']}';

$conn->close();
echo($outp);
?>