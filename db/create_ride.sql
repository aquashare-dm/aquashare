INSERT INTO rides(driver_id, ride_date, ride_location, ride_location_lat, ride_location_long, ride_start_time, ride_end_time, ride_open_seats, ride_total_seats, tier_id)
VALUES($1, $2, $3, $4, $5, $6, $7, 0, 0, 0);

UPDATE rides
SET ride_total_seats = boats.boat_seat_number
FROM boats
WHERE rides.driver_id = boats.driver_id;

UPDATE rides
SET tier_id = boats.tier_id
FROM boats
WHERE rides.driver_id = boats.driver_id;

UPDATE rides
SET ride_open_seats = boats.boat_tube_seats
FROM boats
WHERE rides.driver_id = boats.driver_id
AND rides.ride_id = (SELECT MAX (ride_id) FROM rides);

SELECT * FROM rides
ORDER BY
    rides.ride_date ASC,
    rides.ride_start_time ASC,
    rides.ride_end_time ASC;