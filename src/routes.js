import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./components/Login.js";

//Driver Components
import DriverLogin from "./components/DriverLogin.js";
import DriverSignup from "./components/DriverSignup.js";
import StartPage from "./components/StartPage.js";
import Signup from "./components/Signup.js";
import DriverDashboard from "./components/DriverDashboard.js";


//Rider Components
import RiderLogin from "./components/RiderLogin.js";
import RiderSignup from "./components/RiderSignup.js";
import RiderDashboard from "./components/RiderDashboard.js";



export default (
    <Switch>
        <Route exact path="/" component={StartPage} />
        <Route path="/rider-dashboard" component={RiderDashboard}/> 
        <Route path="/driver-dashboard" component={DriverDashboard}/>
        <Route path="/login" render={() => {
            return (
                <div>
                    <Switch>
                        <Route exact path="/login" component={Login} />
                        <Route path="/login/rider-login" component={RiderLogin} />
                        <Route path="/login/driver-login" component={DriverLogin} />
                    </Switch>
                </div>
            )
        }} />
        <Route path="/signup" render={() => {
            return (
                <div>
                    <Switch>
                        <Route exact path="/signup" component={Signup} />
                        <Route path="/signup/rider-signup" component={RiderSignup} />
                        <Route path="/signup/driver-signup" component={DriverSignup} />
                    </Switch>
                </div>
            )
        }} />

    </Switch>
)