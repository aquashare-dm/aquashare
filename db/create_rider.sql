INSERT INTO riders(rider_username, rider_password)
VALUES($1, $2)
RETURNING *;