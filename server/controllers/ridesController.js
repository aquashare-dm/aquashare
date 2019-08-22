module.exports = {
    getRides: async function(req, res){
        let { locationLatitude, locationLongitude, numberOfRiders, radius } = req.body
        const db = req.app.get("db");
        let rides = await db.get_rides_by_criteria([locationLatitude, locationLongitude, numberOfRiders, radius]);
        res.send(rides)
    },
    getRidesById: async function(req, res){
        let {userId} = req.params;
        const db = req.app.get("db");
        let rides = await db.get_rides_by_username(+userId);
        res.send(rides)
    },

    getRequestedRides: async function(req, res) {
        console.log('Hit the getRequestedRides in controller')
        let {userId} = req.params;
        const db = req.app.get("db");
        let rides = await db.get_requests_by_username(+userId);
        res.send(rides)
    }
}