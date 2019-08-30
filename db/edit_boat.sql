UPDATE boats
SET boat_name = $2, boat_description = $3, boat_license = $4, boat_registration = $5, boat_make = $6, boat_model = $7,
boat_seat_number = $8, boat_image_one = $9, boat_tube_seats = $10, tier_id = $11
WHERE driver_id = $1;

SELECT * FROM boats
WHERE driver_id = $1;