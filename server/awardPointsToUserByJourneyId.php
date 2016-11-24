<?php 
	require_once 'connectToDb.php'; //connect to DB
    {
		// Retrieve field from parameters
        $journeyId = $_GET['journeyId'];
        $points = $_GET['pointsToAward'];
		$query="UPDATE User u
            INNER JOIN JourneySuggestion js
            ON js.AuthorId = u.username
            SET u.Points = u.Points + '$points'
            WHERE js.Id = '$journeyId';";
		$result = $conn->query($query) or die($conn->error.__LINE__);
		 
		$result = $conn->affected_rows;

        $resultId = mysqli_insert_id($conn);

        $result = $resultId;
		 
		$json_response = json_encode($result);

        echo $json_response;

	}

?>