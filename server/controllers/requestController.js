// const inventoryItems = [];
// let id = 0;


module.exports = {

    createRequest: async (req, res) => {
        let {request_date, request_location_lat, request_location_long, request_seat_number, tier_id, rider_id, request_start_time, request_end_time} = req.body;
        const db = req.app.get("db");
        let allRequests = await db.create_request(request_date, request_location_lat, request_location_long, request_seat_number, tier_id, rider_id, request_start_time, request_end_time);
        res.status(200).send(allRequests);   
    },

    editRequest: async (req, res) => {
        let {request_id, request_date, request_location_lat, request_location_long, request_seat_number, tier_id, rider_id, request_start_time, request_end_time} = req.body;
        const db = req.app.get("db");
        let allRequests = await db.edit_request( [request_id, request_date, request_location_lat, request_location_long, request_seat_number, tier_id, rider_id, request_start_time, request_end_time])
        res.status(200).send(allRequests);
    },

    getRequestsById: async function(req, res) {
        console.log('Hit the getRequestedRides in controller')
        let {userId} = req.params;
        const db = req.app.get("db");
        let requests = await db.get_requests_by_username(+userId);
        res.send(requests)
    }
}