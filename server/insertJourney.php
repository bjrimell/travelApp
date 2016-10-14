<?php 
	require_once 'connectToDb.php'; //connect to DB
    {
		// Retrieve field from parameters
        $authorId = $_GET['authorId'];
        $originCityId = $_GET['originCityId'];
        $originCityName = $_GET['originCityName'];
        $originCountry = $_GET['originCountry'];
        $destinationCityId = $_GET['destinationCityId'];
        $destinationCityName = $_GET['destinationCityName'];
        $destinationCountry = $_GET['destinationCountry'];
		$leaveDateTime = $_GET['leaveDateTime'];
        $arrivalDateTime = $_GET['arrivalDateTime'];
		$mode = $_GET['mode'];
        $currencyUsed = $_GET['currencyUsed'];
        $price = $_GET['price'];
        $instructions = $_GET['instructions'];
		$query="INSERT INTO JourneySuggestion(
            AuthorId,
            Origin,
            OriginName,
            OriginCountry,
            Destination,
            DestinationName,
            DestinationCountry,
            LeaveDateTime,
            ArrivalDateTime,
            Mode,
            CurrencyUsed,
            Price,
            Instruction
            )
            VALUES (
                '$authorId',
                '$originCityId',
                '$originCityName',
                '$originCountry',
                '$destinationCityId',
                '$destinationCityName',
                '$destinationCountry',
                '$leaveDateTime',
                '$arrivalDateTime',
                '$mode',
                '$currencyUsed',
                '$price',
                '$instructions')";
		$result = $conn->query($query) or die($conn->error.__LINE__);
		 
		$result = $conn->affected_rows;

        $resultId = mysqli_insert_id($conn);

        $result = $resultId;
		 
		$json_response = json_encode($result);

        echo $json_response;

	}

?>