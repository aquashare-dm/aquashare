UPDATE drivers
SET boat_id = $2
WHERE driver_id = $1
RETURNING *;