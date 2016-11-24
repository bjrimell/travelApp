<?php 
	require_once 'connectToDb.php'; //connect to DB
    {
		// Retrieve field from parameters
        $username = $_GET['username'];
        $points = $_GET['points'];
		$query="UPDATE User
        SET Points = CAST(Points AS Integer) + $points
        WHERE
        username = '$username'";
		$result = $conn->query($query) or die($conn->error.__LINE__);
		 
		$result = $conn->affected_rows;

        $resultId = mysqli_insert_id($conn);

        $result = $resultId;
		 
		$json_response = json_encode($result);

        echo $json_response;

	}

?>