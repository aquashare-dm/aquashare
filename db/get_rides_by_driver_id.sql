select * from rides
where driver_id = $1
ORDER BY
    rides.ride_date ASC,
    rides.ride_start_time ASC,
    rides.ride_end_time ASC;