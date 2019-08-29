import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Redirect, Link, withRouter, Switch } from "react-router-dom";
import { logout } from "../redux/userReducer.js";
import { resetBoatStateOnLogout } from "../redux/boatReducer.js"
import "./coreStyling.css";
import "./dashboardStyling.css";
import DriverRegistrationForm from "./DriverRegistrationForm.js";
import DriverTripRequests from './DriverTripRequests';
import BoatRegistrationForm from "./BoatRegistrationForm.js";
import DriverProfile from "./DriverProfile.js";
import DriverHistory from "./DriverHistory.js";
import DriverUpcomingRides from "./DriverUpcomingRides.js";
import DriverRideCreationForm from "./DriverRideCreationForm.js";
import DriverCreatedRides from "./DriverCreatedRides.js";


class DriverDashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            registered: false,
        }
        this.mobileMenuIcon = React.createRef();
        this.navOptionsRowCont = React.createRef();
    }
    componentDidMount() {
        this.triggerMobileMenu();
        this.triggerNavRowOptions();
        this.checkIfRegistered()
    }
    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.render()
        }
    }
    registered = () => {
        this.setState({ registered: true })
        this.props.history.push('/driver-dashboard/create-a-ride')
    }
    triggerMobileMenu = () => {
        let { current } = this.mobileMenuIcon;
        if (window.innerWidth >= 992) {
            current.classList.add("hideMobileIconCont");
            current.classList.remove("showMobileIconCont");
        } else {
            current.classList.add("showMobileIconCont");
            current.classList.remove("hideMobileIconCont")
        }
    }
    triggerNavRowOptions = () => {
        let { current } = this.navOptionsRowCont;
        if (window.innerWidth <= 992) {
            current.classList.add("hideNavOptionsCont");
            current.classList.remove("navOptionsCont");
        } else {
            current.classList.add("navOptionsCont");
            current.classList.remove("hideNavOptionsCont")
        }
    }
    menuClick = () => {
        let { current } = this.navOptionsRowCont;
        console.log(current.classList);
        if (this.state.navMenuOpen === false) {
            current.classList.add("navOptionsCont");
            current.classList.remove("hideNavOptionsCont");
            this.setState({ navMenuOpen: true });
        } else {
            current.classList.add("hideNavOptionsCont");
            current.classList.remove("navOptionsCont");
            this.setState({ navMenuOpen: false });
        }

    }
    logout = () => {
        this.props.logout();
        this.props.resetBoatStateOnLogout()
    }
    registrationForm = () => {
        let { user } = this.props;
        console.log("Checking if user registered");
        console.log("User's rider rating is ", user.driverRating);
        if (user.driverRating < 0 || !user.driverRating) {
            return (
                <DriverRegistrationForm />
            );
        }
        else {
            return (<p />);
        }
    }
    checkIfRegistered = () => {
        console.log("triggered check for rider register");
        if (!this.props.user.driverRating) {
            // return <Redirect to="/rider-dashboard/rider-register" />
            return this.props.history.push("/driver-dashboard/driver-register")

        } else {
            console.log("user regist, redirect to find a ride")
            return this.props.history.push("/driver-dashboard/create-a-ride")
            // return(<Redirect to="/rider-dashboard/find-a-ride" />)
        }
    }
    render() {
        console.log("this.props on DriverDashboard", this.props)
        let { user } = this.props;
        if (!user.loggedIn) {
            return <Redirect to="/" />
        }
        if (user) {
            if (user.loggedIn && !user.isDriver) return <Redirect to="/rider-dashboard" />
        }
        return (
            <section className="mainAppWindow">
                <div className="navBarTopPadding"></div>
                <section className="mainDashCont">
                    <section className="mainDashNavCont">
                        <div className="showMobileIconCont" onClick={() => { this.menuClick() }} ref={this.mobileMenuIcon}>
                            <i className="fas fa-bars" />
                        </div>
                        <h1 className="dashLogoH1">AQUASHARE</h1>
                    </section>
                    <div className="navOptionsCont" ref={this.navOptionsRowCont}>
                        <Link to="/driver-dashboard/create-a-ride" className="navLinkOption" onClick={this.menuClick}>
                            <div>Create a Ride</div>
                        </Link>
                        <Link to="/driver-dashboard/created-rides" className="navLinkOption" onClick={this.menuClick}>
                            <div>Unfilled Ride Posts</div>
                        </Link>
                        <Link to="/driver-dashboard/upcoming-rides" className="navLinkOption" onClick={this.menuClick}>
                            <div>Upcoming Rides</div>
                        </Link>
                        <Link to="/driver-dashboard/ride-requests" className="navLinkOption" onClick={this.menuClick}>
                            <div>Ride Requests</div>
                        </Link>
                        <Link to="/driver-dashboard/ride-history" className="navLinkOption" onClick={this.menuClick}>
                            <div>Ride History</div>
                        </Link>
                        <Link to="/driver-dashboard/driver-profile" className="navLinkOption" onClick={this.menuClick}>
                            <div>View Profile</div>
                        </Link>
                        <div className="navLinkOption" onClick={() => { this.logout(); this.menuClick() }}>LOGOUT</div>
                    </div>
                </section>

                <Switch>
                    <Route path="/driver-dashboard/driver-register" render={() => {
                        return (<DriverRegistrationForm navMenuOpen={this.state.navMenuOpen} />)
                    }} />
                    <Route path="/driver-dashboard/boat-register" render={() => {
                        return (<BoatRegistrationForm navMenuOpen={this.state.navMenuOpen} />)
                    }} />
                    <Route path="/driver-dashboard/upcoming-rides" component={DriverUpcomingRides} />
                    <Route path="/driver-dashboard/create-a-ride" component={DriverRideCreationForm} />
                    <Route path="/driver-dashboard/created-rides" component={DriverCreatedRides} />
                    {/* <Route path="/rider-dashboard/request-a-ride" component={RideRequestForm} /> */}
                    <Route path="/driver-dashboard/ride-requests" component={DriverTripRequests} />
                    <Route path="/driver-dashboard/ride-history" component={DriverHistory} />
                    <Route path="/driver-dashboard/driver-profile" component={DriverProfile} />
                </Switch>
            </section>
        );
    };
}
function mapStateToProps(state) {
    return state.user
}
export default connect(mapStateToProps, { logout, resetBoatStateOnLogout })(withRouter(DriverDashboard));

