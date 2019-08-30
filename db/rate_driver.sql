UPDATE confirmed_riders
SET driver_rating = $1
WHERE ride_id = $2;

UPDATE drivers
SET driver_rating = (SELECT AVG (driver_rating)
    FROM confirmed_riders
    INNER JOIN rides ON rides.ride_id = confirmed_riders.ride_id
    WHERE rides.driver_id = $3)
WHERE driver_id = $3;

SELECT driver_rating
FROM confirmed_riders
INNER JOIN rides ON rides.ride_id = confirmed_riders.ride_id
WHERE confirmed_riders.ride_id = $2
AND rides.driver_id = $3;