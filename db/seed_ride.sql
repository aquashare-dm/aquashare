-- Need to create driver and rider before seeding these files

INSERT INTO rides (ride_date, driver_id, ride_location, ride_location_lat, ride_location_long, ride_total_seats, ride_open_seats, ride_start_time, ride_end_time)
VALUES ('08/31/19', 1, "Lake Powell, UT", 37.0683, -111.2433, 3, 2, 9, 12),
     ('08/31/19', 1, "Lake Powell, UT", 37.1156, -111.2744, 4, 3, 12, 15),
     ('08/31/19', 1, "Lake Powell, UT", 37.0967, -110.3178, 5, 2, 15, 18),
     ('08/20/19', 1, 'Lake Powell, UT', 37.0683, -111.2433, 3, 2, 9, 12),
     ('08/21/19', 1, 'Lake Powell, UT', 37.1156, -111.2744, 4, 3, 12, 15),
     ('08/22/19', 1, 'Lake Powell, UT', 37.0967, -110.3178, 5, 2, 15, 18);


insert into confirmed_riders (ride_id, rider_id)
values(5, 1),
(6, 1),
(7, 1),
(8, 1),
(9, 1),
(10, 1);
