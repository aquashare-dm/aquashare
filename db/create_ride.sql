INSERT INTO rides(ride_date, driver_id, ride_location, ride_location_lat, ride_location_long, ride_total_seats, ride_open_seats, ride_start_time, ride_end_time, tier_id)
VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
RETURNING *;