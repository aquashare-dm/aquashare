UPDATE requests
SET accepted = true
WHERE request_id = $1;

insert into rides (ride_date, driver_id, ride_location, ride_location_lat, ride_location_long, ride_total_seats, ride_open_seats, ride_start_time, ride_end_time, tier_id)
values(
    (select request_date from requests where request_id = $1),
    $2,
    (select request_location from requests where request_id = $1),
    (select request_location_lat from requests where request_id = $1),
    (select request_location_long from requests where request_id = $1),
    (select tier_id from requests where request_id = $1),
    (select request_seat_number from requests where request_id = $1),
    (select request_start_time from requests where request_id = $1),
    (select request_end_time from requests where request_id = $1),
    (select tier_id from requests where request_id = $1)
);

insert into confirmed_riders (ride_id, rider_id, order_amount, transaction_id)
values (
    (SELECT MAX (ride_id) FROM rides),
    (select rider_id from requests where request_id = $1),
    ((20 + (select tier_id from requests where request_id = $1) * 10) * (select request_seat_number from requests where request_id = $1)),
    'placeholder for Stripe id'
);

select * from requests
inner join riders on requests.rider_id = riders.rider_id
where accepted IS NULL
and requests.tier_id = (select tier_id from boats where boats.driver_id = $2)
ORDER BY
    requests.request_date ASC,
    requests.request_start_time ASC,
    requests.request_end_time ASC;