UPDATE requests
SET accepted = true
WHERE request_id = $1;
select * from requests;

-- insert into rides (ride_date, driver_id, ride_location, ride_location_lat, ride_location_long, ride_total_seats, ride_open_seats, ride_start_time, ride_end_time, tier_id)
-- values(
--     (select request_date from requests where request_id = $1),
--     (select request_date from requests where request_id = $1),
--     (select request_date from requests where request_id = $1),
--     (select request_date from requests where request_id = $1),
--     (select request_date from requests where request_id = $1),
--     (select request_date from requests where request_id = $1),
--     (select request_date from requests where request_id = $1)
-- )