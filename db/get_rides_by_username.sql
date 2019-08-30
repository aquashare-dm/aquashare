-- select * from rides
-- full join confirmed_riders on rides.ride_id = confirmed_riders.ride_id
-- where rider_id = $1;

-- select * from rides
-- inner join confirmed_riders on rides.ride_id = confirmed_riders.ride_id
-- full join riders on riders.rider_id = confirmed_riders.rider_id
-- where rider_id = $1;

-- select * from rides
-- inner join confirmed_riders on rides.ride_id = confirmed_riders.ride_id
-- full join riders on riders.rider_id = confirmed_riders.rider_id
-- full join drivers on drivers.driver_id = rides.driver_id
-- where riders.rider_id= 1;

select rides.ride_id, rides.driver_id, rides.ride_date, rides.ride_start_time, rides.ride_end_time, rides.tier_id, drivers.driver_first_name, drivers.driver_last_name, boats.boat_name, rides.ride_location, confirmed_riders.driver_rating
from rides
inner join confirmed_riders on rides.ride_id = confirmed_riders.ride_id
full join riders on riders.rider_id = confirmed_riders.rider_id
full join drivers on drivers.driver_id = rides.driver_id
full join boats on boats.driver_id = drivers.driver_id
where riders.rider_id= $1
ORDER BY
    rides.ride_date ASC,
    rides.ride_start_time ASC,
    rides.ride_end_time ASC;