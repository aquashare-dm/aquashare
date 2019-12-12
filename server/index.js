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
const stripeController = require("./controllers/stripeController.js");
const path = require('path');

const client = require('twilio')(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
)
const app = express();
app.use(express.json());


app.post('/api/messages', (req, res) => {
    res.header('Content-Type', 'application/json')
    client.messages
        .create({
            from: process.env.TWILIO_PHONE_NUMBER,
            to: req.body.to,
            body: req.body.body
        })
        .then(() => {
            res.send(JSON.stringify({ success: true }));
        })
    // .catch(err => {
    //   console.log(err);
    //   res.send(JSON.stringify({ success: false }));
    // });
})

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
});

//Rider Endpoints
app.post("/api/rider-login", riderController.login);
app.post("/api/rider-signup", riderController.signup);
app.delete("/api/logout", riderController.logout);
app.put("/api/rider-register", riderController.riderRegister);
app.put('/api/rate-driver', riderController.rateRider);
app.put('/api/edit-rider', riderController.editRiderProfile);

//Driver Endpoints
app.post("/api/driver-login", driverController.login);
app.post("/api/driver-signup", driverController.signup);
app.put("/api/driver-register", driverController.driverRegister);
app.put('/api/rate-rider', driverController.rateRider);
app.put('/api/edit-driver', driverController.editDriverProfile);

//Rides Endpoints
app.post("/api/get-rides", ridesController.getRides);
app.get("/api/get-rides-by-id/:userId", ridesController.getRidesById);
app.get("/api/get-rides-by-driver-id/:userId", ridesController.getRidesByDriverId);
app.get("/api/get-confirmed-rides-by-driver-id/:driverId", ridesController.getConfirmedRidesByDriverId);
app.post('/api/create-ride', ridesController.createRide)

//Boat Endpoints
app.post("/api/create-boat", boatController.createBoat);
app.post("/api/boat/:driverId", boatController.getBoatByDriverId);
app.put("/api/edit-boat", boatController.editBoat);

//Ride Request Endpoints
app.post("/api/create-request", requestController.createRequest);
app.put("/api/edit-request", requestController.editRequest);
app.get("/api/get-requests/:userId", requestController.getRequestsById);
app.get("/api/get-available-requests/:driverId", requestController.getAvailableRequests);

//Stripe Endpoint
app.post('/api/payment/:userId', stripeController.pay)

//Twilio Endpoint
app.put('/api/request-accepted', requestController.requestAccepted)


app.use(express.static(__dirname + '/../build'))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'))
})