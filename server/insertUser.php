<?php 
	require_once 'connectToDb.php'; //connect to DB
    {
		// Retrieve field from parameters
        $username = $_GET['username'];
        $email = $_GET['email'];
        $password = $_GET['password'];
		$query="INSERT INTO User(
            username,
            emailaddress,
            Password
            )
            VALUES (
                '$username',
                '$email',
                '$password')";
		$result = $conn->query($query) or die($conn->error.__LINE__);
		 
		$result = $conn->affected_rows;

        $resultId = mysqli_insert_id($conn);

        $result = $resultId;
		 
		$json_response = json_encode($result);

        echo $json_response;

	}

?>