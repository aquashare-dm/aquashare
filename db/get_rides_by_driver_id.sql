select * from rides
where driver_id = $1
and ride_open_seats > 0
ORDER BY
    rides.ride_date ASC,
    rides.ride_start_time ASC,
    rides.ride_end_time ASC;