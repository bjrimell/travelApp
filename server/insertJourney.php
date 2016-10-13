<?php 
	require_once 'connectToDb.php'; //connect to DB
    {
		// Retrieve field from parameters
        $originCityId = $_GET['originCityId'];
        $destinationCityId = $_GET['destinationCityId'];
		$leaveDateTime = $_GET['leaveDateTime'];
        $arrivalDateTime = $_GET['arrivalDateTime'];
		$mode = $_GET['mode'];
        $currencyUsed = $_GET['currencyUsed'];
        $price = $_GET['price'];
        $instructions = $_GET['instructions'];

		$query="INSERT INTO JourneySuggestion(
            Origin,
            Destination,
            LeaveDateTime,
            ArrivalDateTime,
            Mode,
            CurrencyUsed,
            Price,
            Instruction
            )
            VALUES (
                '$originCityId',
                '$destinationCityId',
                '$leaveDateTime',
                '$arrivalDateTime',
                '$mode',
                '$currencyUsed',
                '$price',
                '$instructions')";
		$result = $conn->query($query) or die($conn->error.__LINE__);
		 
		$result = $conn->affected_rows;
		 
		$json_response = json_encode($result);

	}

?>