-- select * from rides
-- full join confirmed_riders on rides.ride_id = confirmed_riders.ride_id
-- where rider_id = $1;

select * from rides
inner join confirmed_riders on rides.ride_id = confirmed_riders.ride_id
full join riders on riders.rider_id = confirmed_riders.rider_id
where rider_id = $1;