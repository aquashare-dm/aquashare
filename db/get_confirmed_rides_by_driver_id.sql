select * from rides
inner join confirmed_riders on rides.ride_id = confirmed_riders.ride_id
full join riders on riders.rider_id = confirmed_riders.rider_id
where driver_id = $1
ORDER BY
    rides.ride_date ASC,
    rides.ride_start_time ASC,
    rides.ride_end_time ASC;