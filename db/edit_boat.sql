UPDATE boats
SET boat_name = $2, tier_id = $3, boat_description = $4, boat_license = $5, boat_registration = $6, boat_make = $7, boat_model = $8,
boat_seat_number = $9, boat_image_one = $10, boat_image_two = $11
WHERE boat_id = $1
SELECT * FROM boats
WHERE boat_id = $1;