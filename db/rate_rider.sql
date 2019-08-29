UPDATE confirmed_riders
SET rider_rating = $1
WHERE ride_id = $2
AND rider_id = $3;

UPDATE riders
SET rider_rating = (SELECT AVG (rider_rating)
    FROM confirmed_riders
    WHERE rider_id = $3)
WHERE rider_id = $3;

SELECT rider_rating
FROM confirmed_riders
WHERE ride_id = $2
AND rider_id = $3;


