SELECT *
FROM rides
-- JOIN drivers
--     ON drivers.driver_id = rides.driver_id
-- JOIN boats
--     ON boats.boat_id = drivers.boat_id
WHERE ride_open_seats >= $3
    AND ST_DistanceSphere(
        ST_SetSRID(ST_MakePoint(ride_location_long, ride_location_lat), 4326),
        ST_SetSRID(ST_MakePoint($2, $1), 4326)
    ) <= $4 * 1609.34;