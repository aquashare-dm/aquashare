require("dotenv").config({ path: __dirname + "/../.env" });
const express = require("express");
const massive = require("massive");
const session = require("express-session");
const {SERVER_PORT, SESSION_SECRET, CONNECTION_STRING} = process.env;
const riderController = require("./controllers/riderController.js");
const driverController = require("./controllers/driverController.js");
const ridesController = require("./controllers/ridesController.js");

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
});

//Rider Endpoints
app.post("/api/rider-login", riderController.login);
app.post("/api/rider-signup", riderController.signup);
app.delete("/api/logout", riderController.logout);
app.put("/api/rider-register", riderController.riderRegister);

//Driver Endpoints
app.post("/api/driver-login", driverController.login);
app.post("/api/driver-signup", driverController.signup);
app.put("/api/driver-register", driverController.driverRegister);

// Rides Endpoints
app.get("/api/get-rides", ridesController.getRides);
