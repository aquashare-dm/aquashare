INSERT INTO requests(request_date, request_location_lat, request_location_long, request_seat_number, tier_id, rider_id, request_start_time, request_end_time)
VALUES($1, $2, $3, $4, $5, $6, $7, $8)
RETURNING *;