-- select all cities by country code
select name from cities where state_id IN (select Id from states where country_id = '230')

-- select all cities by county/state/province
select name from cities where state_id = '3843'

-- Find city by city and country name

select * from cities
	INNER JOIN states ON cities.state_id = states.id
    INNER JOIN countries ON countries.id = states.country_id
    AND countries.name = 'Colombia' AND cities.name = 'corozal'

-- Insert Journey: Corozal to Bogota
-- JOURNEY ONE
INSERT INTO `JourneySuggestion` (`Id`, `AddedBy`, `Origin`, `LeaveDateTime`, `Destination`, `ArrivalDateTime`, `PositiveVotes`, `NegativeVotes`, `Instruction`) VALUES (NULL, 'anonymous', '13454', '2016-09-27 12:00:00', '12688', '2016-09-27 17:30:00', '0', '0', 'Maybe not the fastest route, but the flights from Monteria are more reliable than those from Corozal.');
INSERT INTO leg (Origin,Mode,Destination,Price,Instruction) VALUES (13454,1,13471,20000,'Hail a taxi from the main square. Yellow taxis are safest.');
INSERT INTO leg (Origin,Mode,Destination,Price,Instruction) VALUES (13471,2,13029,30000,'Shared cabs leave when full. Prices can be haggled as there are many drivers hoping to fill their cabs.')
INSERT INTO leg (Origin,Mode,Destination,Price,CurrencyCode,Instruction) VALUES (13029,3,12688,150000,'COP','Avianca flight to Bogota domestic.')
INSERT INTO `JourneySuggestionLeg` (`Id`, `JourneySuggestionId`, `LegId`, `Ordering`) VALUES (NULL, '1', '1', '0');
INSERT INTO `JourneySuggestionLeg` (`Id`, `JourneySuggestionId`, `LegId`, `Ordering`) VALUES (NULL, '1', '2', '1');
INSERT INTO `JourneySuggestionLeg` (`Id`, `JourneySuggestionId`, `LegId`, `Ordering`) VALUES (NULL, '1', '3', '2');
-- JOURNEY TWO
INSERT INTO `JourneySuggestion` (`Id`, `AddedBy`, `Origin`, `LeaveDateTime`, `Destination`, `ArrivalDateTime`, `PositiveVotes`, `NegativeVotes`, `Instruction`) VALUES (NULL, 'barryrimell@gmail.com', '13454', '2016-08-12 11:45:00', '12688', '2016-08-12 14:40:00', '0', '0', 'Almost missed my flight, but made it!');
INSERT INTO leg (Origin,Mode,Destination,Price,Instruction) VALUES (13454,1,13454,20000,'Got a yellow cab from the main square.');
INSERT INTO leg (Origin,Mode,Destination,Price,CurrencyCode,Instruction) VALUES (13454,3,12688,170000,'COP','Avianca flight to Bogota domestic.');
INSERT INTO `JourneySuggestionLeg` (`Id`, `JourneySuggestionId`, `LegId`, `Ordering`) VALUES (NULL, '2', '4', '0');
INSERT INTO `JourneySuggestionLeg` (`Id`, `JourneySuggestionId`, `LegId`, `Ordering`) VALUES (NULL, '2', '5', '1');

-- Find all journeys from A to B by city Id
SELECT originCity.name AS 'Origin', destinationCity.name AS 'Destination', js.NegativeVotes, js.PositiveVotes, js.Instruction, js.LeaveDateTime, js.ArrivalDateTime FROM JourneySuggestion js
INNER JOIN cities AS originCity ON js.Origin = originCity.id
INNER JOIN cities AS destinationCity ON js.Destination = destinationCity.id
WHERE js.Origin = 13454 AND js.Destination = 12688;

-- Find all legs by journeyID
SELECT * FROM leg
INNER JOIN JourneySuggestionLeg jsl ON jsl.LegId = leg.Id
WHERE jsl.JourneySuggestionId = 1


ADD NEW JOURNEY

http://localhost/Hackpacker/server/insertJourney.php?authorId=anonymous&originCountry=GB&destinationCountry=CO&originCityId=13454&destinationCityId=13471&leaveDateTime=2016-12-12&arrivalDateTime=2016-12-12&mode=3&currencyUsed=COP&price=123000&instructions=this_is_an_instruction&originCityName=Woodway,%20Hutton&destinationCityName=this%20is%20also%20a%20place

http://localhost/Hackpacker/#/travel-from-Corozal,%20Sucre,%20Colombia-to-Bogot%C3%A1%20-%20Bogota,%20Colombia
http://localhost/Hackpacker/#/travel-from-Corozal,%20Sucre,%20Colombia-to-Cartagena%20-%20Bolivar,%20Colombia


http://localhost/Hackpacker/server/selectIndividualJourney.php?originId=Corozal,%20Sucre,%20Colombia&destinationId=Cartagena%20-%20Bolivar,%20Colombia&journeyId=164