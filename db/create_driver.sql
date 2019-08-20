INSERT INTO drivers(driver_username, driver_password)
VALUES($1, $2)
RETURNING *;