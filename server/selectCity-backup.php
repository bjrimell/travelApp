<?php

//CREDENTIALS FOR DB
define ('DBSERVER', 'localhost');
define ('DBUSER', 'root');
define ('DBPASS','qu5Wtl1xvP');
define ('DBNAME','PlanetCracker');

//LET'S INITIATE CONNECT TO DB
$connection = mysql_connect(DBSERVER, DBUSER, DBPASS) or die("Can't connect to server. Please check credentials and try again");
$result = mysql_select_db(DBNAME) or die("Can't select database. Please check DB name and try again");

//CREATE QUERY TO DB AND PUT RECEIVED DATA INTO ASSOCIATIVE ARRAY
if (isset($_REQUEST['query'])) {
    $query = $_REQUEST['query'];
    $sql = mysql_query ("SELECT
    city.Id AS 'CityId',
    city.Name AS 'CityName',
    state.Name AS 'StateName',
    country.Name AS 'CountryName'
    FROM
    cities city
    INNER JOIN states state ON city.state_id = state.Id
    INNER JOIN countries country ON state.country_id = country.Id
    WHERE
    city.name LIKE '%{$query}%'");
	$array = array();
    while ($row = mysql_fetch_array($sql)) {
        $array[] = array (
            'label' => $row['CityId'], 
            'value' => $row['CityName'].', '.$row['StateName'].', '.$row['CountryName'],
        );
    }
    //RETURN JSON ARRAY
    echo json_encode ($array);
}

?>