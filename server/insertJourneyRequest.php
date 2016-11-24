<?php 
	require_once 'connectToDb.php'; //connect to DB
    {
		// Retrieve field from parameters
        $username = $_GET['username'];
        $origin = $_GET['origin'];
        $destination = $_GET['destination'];
		$query="INSERT INTO JourneyRequest(
            UserId,
            Origin,
            Destination
            )
            VALUES (
                '$username',
                '$origin',
                '$destination')";
		$result = $conn->query($query) or die($conn->error.__LINE__);
		 
		$result = $conn->affected_rows;

        $resultId = mysqli_insert_id($conn);

        $result = $resultId;
		 
		$json_response = json_encode($result);

        echo $json_response;

	}

?>