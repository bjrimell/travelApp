<?php 
	require_once 'connectToDb.php'; //connect to DB
    {
		// Retrieve field from parameters
        $journeyId = $_GET['journeyId'];
        $vote = $_GET['vote'];
		$query="INSERT INTO `Vote` (`Id`, `UserId`, `JourneySuggestionId`, `Value`)
        VALUES (NULL, 'anonymous', '$journeyId', '$vote');";
		$result = $conn->query($query) or die($conn->error.__LINE__);
		 
		$result = $conn->affected_rows;

        $resultId = mysqli_insert_id($conn);

        $result = $resultId;
		 
		$json_response = json_encode($result);

        echo $json_response;

	}

?>