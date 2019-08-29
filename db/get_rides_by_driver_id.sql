select rides.ride_id, riders.rider_id, riders.rider_first_name, riders.rider_last_name, rides.ride_date, rides.ride_location, rides.ride_open_seats, rides.ride_start_time, rides.ride_end_time, rides.tier_id, confirmed_riders.rider_rating
from rides
inner join confirmed_riders on rides.ride_id = confirmed_riders.ride_id
full join riders on riders.rider_id = confirmed_riders.rider_id
where driver_id = $1
and ride_open_seats > 0
ORDER BY
    rides.ride_date ASC,
    rides.ride_start_time ASC,
    rides.ride_end_time ASC;