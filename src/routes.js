import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./components/Login.js";
import RiderLogin from "./components/RiderLogin.js";
import DriverLogin from "./components/DriverLogin.js";
import RiderSignup from "./components/RiderSignup.js";
import DriverSignup from "./components/DriverSignup.js";
import StartPage from "./components/StartPage.js";
import Signup from "./components/Signup.js";
import RiderDashboard from "./components/RiderDashboard.js";
import DriverDashboard from "./components/DriverDashboard.js";
import AvailableRides from "./components/AvailableRides.js";
import RideSearch from "./components/RideSearch.js";
import RideRequestForm from "./components/RideRequestForm.js";
import RiderTripRequests from "./components/RiderTripRequests.js";
import RiderHistory from "./components/RiderHistory.js";
import RiderProfile from "./components/RiderProfile.js";
import RiderDashLandingPage from "./components/RiderDashLandingPage.js";

export default (
    <Switch>
        <Route exact path="/" component={StartPage} />
        <Route path="/rider-dashboard" render={ () => {
            return(
                <div>
                    <RiderDashboard/>
                    <Switch>
                        <Route exact path="/rider-dashboard" component={RiderDashLandingPage} />
                        <Route path="/rider-dashboard/find-a-ride" component={RideSearch} />
                        <Route path="/rider-dashboard/available-rides" component={AvailableRides} />
                        <Route path="/rider-dashboard/request-a-ride" component={RideRequestForm} />
                        <Route path="/rider-dashboard/ride-requests" component={RiderTripRequests} />
                        <Route path="/rider-dashboard/ride-history" component={RiderHistory} />
                        <Route path="/rider-dashboard/rider-profile" component={RiderProfile} />
                    </Switch>
                </div>

            )
        }}/>
        <Route path="/driver-dashboard" component={DriverDashboard} />
        <Route path="/startpage" component={StartPage} />
        <Route path="/login" render={() => {
            return(
                <div>
                    <Switch>
                        <Route exact path="/login" component={Login}/>
                        <Route path="/login/rider-login" component={RiderLogin}/>
                        <Route path="/login/driver-login" component={DriverLogin}/>
                    </Switch>
                </div>
            )
        }}/>
        <Route path="/signup" render={() => {
            return(
                <div>
                    <Switch>
                        <Route exact path="/signup" component={Signup}/>
                        <Route path="/signup/rider-signup" component={RiderSignup}/>
                        <Route path="/signup/driver-signup" component={DriverSignup}/>
                    </Switch>
                </div>
            )
        }}/>
        
    </Switch>
)