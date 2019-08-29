SELECT rider_rating
FROM confirmed_riders
WHERE ride_id = $1
AND rider_id = $2;