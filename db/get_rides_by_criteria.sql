SELECT rides.ride_id, rides.ride_date, rides.ride_location, rides.ride_total_seats, rides.ride_open_seats, rides.ride_start_time, rides.ride_end_time, drivers.driver_first_name, drivers.driver_last_name, boats.boat_name, boats.boat_description, boats.boat_make, boats.boat_model, rides.tier_id
FROM rides
INNER JOIN drivers
    ON drivers.driver_id = rides.driver_id
FULL JOIN boats
    ON boats.driver_id = drivers.driver_id
WHERE ride_open_seats > 0
AND ST_DistanceSphere(
    ST_SetSRID(ST_MakePoint(ride_location_long, ride_location_lat), 4326),
    ST_SetSRID(ST_MakePoint($2, $1), 4326)
) <= $3 * 1609.34;