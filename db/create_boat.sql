INSERT INTO boats(boat_name, tier_id, boat_description, boat_license, boat_registration, boat_make, boat_model,
boat_seat_number, boat_tube_seats, boat_image_one, driver_id)
VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
RETURNING *;