// const inventoryItems = [];
// let id = 0;


module.exports = {

    createBoat: async (req, res) => {
        let { boat_name, tier_id, boat_description, boat_license, boat_registration, boat_make, boat_model,
        boat_seat_number, boat_image_one, boat_image_two, driver_id } = req.body;
        const db = req.app.get("db");
        let allBoats = await db.create_boat(boat_name, tier_id, boat_description, boat_license, boat_registration, boat_make, boat_model,
        boat_seat_number, boat_image_one, boat_image_two, driver_id);
        res.status(200).send(allBoats);
        
    },

    editBoat: async (req, res) => {
        let {boat_id, boat_name, tier_id, boat_description, boat_license, boat_registration, boat_make, boat_model,
        boat_seat_number, boat_image_one, boat_image_two, driver_id} = req.body;
        const db = req.app.get("db");

        let allBoats = await db.edit_boat( [ boat_id, boat_name, tier_id, boat_description, boat_license, boat_registration, boat_make, boat_model,
        boat_seat_number, boat_image_one, boat_image_two, driver_id])
        res.status(200).send(allBoats);
    },

}