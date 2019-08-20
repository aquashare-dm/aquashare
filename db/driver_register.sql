UPDATE drivers
SET driver_email = $2, driver_first_name=$3, driver_last_name=$4, driver_image_url=$5, driver_license=$6, driver_rating=$7
WHERE driver_username = $1;
SELECT * FROM drivers
WHERE driver_username = $1;