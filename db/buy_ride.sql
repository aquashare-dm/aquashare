INSERT INTO confirmed_riders (ride_id, rider_id)
VALUES ($2, $1);

UPDATE rides
SET ride_open_seats = $3
WHERE ride_id = $2;

SELECT *
FROM rides;

