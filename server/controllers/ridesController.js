module.exports = {
    getRides: async function (req, res) {
        let { locationLatitude, locationLongitude, numberOfRiders, radius } = req.body
        const db = req.app.get("db");
        let rides = await db.get_rides_by_criteria([locationLatitude, locationLongitude, numberOfRiders, radius]);
        res.send(rides)
    },
    getRidesById: async function (req, res) {
        let { userId } = req.params;
        const db = req.app.get("db");
        let rides = await db.get_rides_by_username(+userId);
        res.send(rides)
    },
    
    getRidesByDriverId: async function (req, res) {
        let { driverId } = req.params;
        console.log(driverId, 'driverId')
        console.log('hits controller function')
        const db = req.app.get("db");
        let rides = await db.get_rides_by_driver_id(+driverId);
        console.log(rides, 'rides')
        res.send(rides)
    },

    getConfirmedRidesByDriverId: async function (req, res) {
        let { driverId } = req.params;
        console.log(driverId, 'driverId')
        console.log('hits controller function')
        const db = req.app.get("db");
        let rides = await db.get_confirmed_rides_by_driver_id(+driverId);
        console.log(rides, 'rides')
        res.send(rides)
    },

    createRide: async (req, res) => {
        let { ride_date, driver_id, ride_location, ride_location_lat, ride_location_long, ride_total_seats, ride_open_seats, ride_start_time, ride_end_time, tier_id } = req.body
        const db = req.app.get('db')
        let [ride] = await db.create_ride(ride_date, driver_id, ride_location, ride_location_lat, ride_location_long, ride_total_seats, ride_open_seats, ride_start_time, ride_end_time, tier_id)
        req.session.ride = {

            date: ride.ride_date,
            driverId: ride.driver_id,
            location: ride.ride_location,
            locationLatitude: ride.ride_location_lat,
            locationLongitude: ride.ride_location_long,
            boatSeatNum: ride.ride_total_seats,
            tripSeatNum: ride.ride_open_seats,
            startTime: ride.ride_start_time,
            endTime: ride.ride_end_time,
            tierId: ride.tier_id
        }
        res.status(200).send(req.session.ride)
    },
}
