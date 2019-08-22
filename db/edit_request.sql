UPDATE requests
SET request_date = $2, request_location_lat = $3, request_location_long = $4, request_seat_number = $5, tier_id = $6, rider_id = $7, request_start_time = $8, request_end_time = $9
WHERE request_id = $1
SELECT * FROM requests
WHERE request_id = $1;