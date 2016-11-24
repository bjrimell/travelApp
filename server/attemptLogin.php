<?php
require_once 'connectToDb.php'; //connect to DB

$email= $_GET['email'];
$password= $_GET['password'];

$result = $conn->query("SELECT
username
FROM User
WHERE emailaddress='$email' AND password='$password'
LIMIT 1;");

$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"username":"'  . $rs["username"] . '"}';
}

$outp ='{"records":'.$outp.'}';
//$outp ='{"records":['.$outp.']}';

$conn->close();
echo($outp);
?>