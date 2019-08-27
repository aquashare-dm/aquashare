require("dotenv").config({ path: __dirname + "/../.env" });
const express = require("express");
const massive = require("massive");
const session = require("express-session");
const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env;
const riderController = require("./controllers/riderController.js");
const driverController = require("./controllers/driverController.js");
const ridesController = require("./controllers/ridesController.js");
const boatController = require("./controllers/boatController.js");
const requestController = require("./controllers/requestController.js");

const app = express();
app.use(express.json());



app.use(session({
    secret: SESSION_SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 365 }
}));

massive(CONNECTION_STRING).then(db => {
    app.set("db", db);
    app.listen(SERVER_PORT, () => { console.log("Server Listening on Port", SERVER_PORT) });
    console.log("DB connected");
    // console.log(Date.parse('08/31/19') - 21600000)
    // console.log(Date.now() + 61200000)
    // console.log(Date.now() - Date.parse('08/21/19 21:24:00'))
});

//Rider Endpoints
app.post("/api/rider-login", riderController.login);
app.post("/api/rider-signup", riderController.signup);
app.delete("/api/logout", riderController.logout);
app.put("/api/rider-register", riderController.riderRegister);
app.put('/api/edit-rider', riderController.editRiderProfile);

//Driver Endpoints
app.post("/api/driver-login", driverController.login);
app.post("/api/driver-signup", driverController.signup);
app.put("/api/driver-register", driverController.driverRegister);

//Rides Endpoints
app.post("/api/get-rides", ridesController.getRides);
app.get("/api/get-rides-by-id/:userId", ridesController.getRidesById);
app.get("/api/get-rides-by-driver-id/:driverId", ridesController.getRidesByDriverId);
app.get("/api/get-confirmed-rides-by-driver-id/:driverId", ridesController.getConfirmedRidesByDriverId);
app.post('/api/create-ride', ridesController.createRide)

//Boat Endpoints
app.post("/api/create-boat", boatController.createBoat);
app.put("/api/edit-boat", boatController.editBoat);

//Ride Request Endpoints
app.post("/api/create-request", requestController.createRequest);
app.put("/api/edit-request", requestController.editRequest);
app.get("/api/get-requests/:userId", requestController.getRequestsById);
app.get("/api/get-available-requests", requestController.getAvailableRequests);


app.use(express.static(__dirname + '/../build'))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'))
})
