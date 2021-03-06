// const inventoryItems = [];
// let id = 0;


module.exports = {

    createRequest: async (req, res) => {
        let {id, requestDate, locationLatitude, locationLongitude, requestSeatNum, tierId, requestStartTime, requestEndTime, location, requesterCell} = req.body;
        const db = req.app.get("db");
        let allRequests = await db.create_request(id, requestDate, locationLatitude, locationLongitude, requestSeatNum, tierId, requestStartTime, requestEndTime, location, requesterCell);
        res.status(200).send(allRequests);   
    },

    editRequest: async (req, res) => {
        let {request_id, request_date, request_location_lat, request_location_long, request_seat_number, tier_id, rider_id, request_start_time, request_end_time, request_cell_number} = req.body;
        const db = req.app.get("db");
        let allRequests = await db.edit_request( [request_id, request_date, request_location_lat, request_location_long, request_seat_number, tier_id, rider_id, request_start_time, request_end_time, request_cell_number])
        res.status(200).send(allRequests);
    },

    getRequestsById: async function(req, res) {
        let {userId} = req.params;
        const db = req.app.get("db");
        let requests = await db.get_requests_by_username(+userId);
        res.send(requests)
    },

    getAvailableRequests: async function(req, res) {
        const db = req.app.get("db");
        let { driverId } = req.params
        let allRequests = await db.get_available_requests(+driverId);
        res.send(allRequests)
    },

    requestAccepted: async function (req, res) {
        let { requestId, driverId } = req.body
        const db = req.app.get("db")
        let requests = await db.request_accepted(requestId, driverId);
        res.status(200).send(requests)
    }
}