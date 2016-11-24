<?php 
	require_once 'connectToDb.php'; //connect to DB
    {
		// Retrieve field from parameters
        $origin = $_GET['origin'];
        $destination = $_GET['destination'];
        $username = $_GET['userId'];
        $status = $_GET['status'];
		$query="UPDATE JourneyRequest
        SET Status = '$status'
        WHERE Origin = '$origin'
        AND Destination = '$destination'
        AND UserId = '$username'";
		$result = $conn->query($query) or die($conn->error.__LINE__);
		 
		$result = $conn->affected_rows;

        $resultId = mysqli_insert_id($conn);

        $result = $resultId;

        echo mysqli_affected_rows($conn);
		 
		//$json_response = json_encode($result);

        //echo $json_response;

	}

?>