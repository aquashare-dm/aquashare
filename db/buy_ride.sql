INSERT INTO confirmed_riders (ride_id, rider_id, transaction_id, order_amount)
VALUES ($2, $1, $4, $5);

UPDATE rides
SET ride_open_seats = $3
WHERE ride_id = $2;

SELECT rides.ride_id, rides.ride_date, rides.ride_location, rides.ride_total_seats, rides.ride_open_seats, rides.ride_start_time, rides.ride_end_time, drivers.driver_first_name, drivers.driver_last_name, boats.boat_name, boats.boat_description, boats.boat_make, boats.boat_model, rides.tier_id
FROM rides
INNER JOIN drivers
    ON drivers.driver_id = rides.driver_id
FULL JOIN boats
    ON boats.driver_id = drivers.driver_id
WHERE ride_open_seats > 0
AND ST_DistanceSphere(
    ST_SetSRID(ST_MakePoint(ride_location_long, ride_location_lat), 4326),
    ST_SetSRID(ST_MakePoint($7, $6), 4326)
) <= $8 * 1609.34
ORDER BY
    rides.ride_date ASC,
    rides.ride_start_time ASC,
    rides.ride_end_time ASC;

