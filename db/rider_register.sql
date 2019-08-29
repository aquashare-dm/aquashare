UPDATE riders
SET rider_email = $2, rider_first_name=$3, rider_last_name=$4, rider_image_url=$5, rider_rating=$6
WHERE rider_username = $1;

SELECT * FROM riders
WHERE rider_username = $1;