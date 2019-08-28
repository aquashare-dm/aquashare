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

select * from rides
inner join confirmed_riders on rides.ride_id = confirmed_riders.ride_id
full join riders on riders.rider_id = confirmed_riders.rider_id
full join drivers on drivers.driver_id = rides.driver_id
full join boats on boats.driver_id = drivers.driver_id
where riders.rider_id= $1;