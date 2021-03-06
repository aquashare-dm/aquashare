import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Redirect, Link, withRouter, Switch } from "react-router-dom";
import { logout } from "../redux/userReducer.js";
import RiderRegistrationForm from "./RiderRegistrationForm.js";
import "./coreStyling.css";
import "./dashboardStyling.css";

import AvailableRides from "./AvailableRides.js";
import RideSearch from "./RideSearch.js";
import RideRequestForm from "./RideRequestForm.js";
import RiderTripRequests from "./RiderTripRequests.js";
import RiderHistory from "./RiderHistory.js";
import RiderProfile from "./RiderProfile.js";
import RiderDashLandingPage from "./RiderDashLandingPage.js";
import UpcomingRides from "./UpcomingRides.js";

class RiderDashboard extends Component {
    constructor() {
        super();
        this.state = {
            navMenuOpen: false,
            registered: false
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
        this.props.history.push('/rider-dashboard/find-a-ride')
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

    logout = async () => {
        await this.props.logout();
    }

    // registrationForm = () => {
    //     let { user } = this.props;
    //     console.log("Checking if user registered");
    //     console.log("User's rider rating is ", user.riderRating);
    //     if (user.riderRating < 0 || !user.riderRating) {
    //         return (
    //             <RiderRegistrationForm registered={this.registered} />
    //         );
    //     }
    //     else {
    //         return (<p />);
    //     }

    // }

    checkIfRegistered = () => {
        if (!this.props.user.riderRating) {
            return this.props.history.push("/rider-dashboard/rider-register")

        } else {
            return this.props.history.push("/rider-dashboard/find-a-ride")

        }
    }

    render() {
        let { user } = this.props;
        if (!user.loggedIn) {
            return <Redirect to="/" />
        }
        if (user) {
            if (user.loggedIn && user.isDriver) {
                return <Redirect to="/driver-dashboard/" />
            }
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
                        <Link to="/rider-dashboard/find-a-ride" className="navLinkOption" onClick={this.menuClick}>
                            <div>Find a Ride</div>
                        </Link>
                        <Link to="/rider-dashboard/upcoming-rides" className="navLinkOption" onClick={this.menuClick}>
                            <div>Upcoming Rides</div>
                        </Link>
                        <Link to="/rider-dashboard/ride-requests" className="navLinkOption" onClick={this.menuClick}>
                            <div>Ride Requests</div>
                        </Link>
                        <Link to="/rider-dashboard/ride-history" className="navLinkOption" onClick={this.menuClick}>
                            <div>Ride History</div>
                        </Link>
                        <Link to="/rider-dashboard/rider-profile" className="navLinkOption" onClick={this.menuClick}>
                            <div>View Profile</div>
                        </Link>
                        <div className="navLinkOption" onClick={() => { this.logout(); this.menuClick() }}>LOGOUT</div>
                    </div>
                </section>
                <Switch>
                    <Route path="/rider-dashboard/find-a-ride" render={() => {
                        return (<RideSearch navMenuOpen={this.state.navMenuOpen} />)
                    }} />
                    <Route path="/rider-dashboard/request-a-ride" render={() => {
                        return (<RideRequestForm navMenuOpen={this.state.navMenuOpen} />)
                    }} />
                    <Route path="/rider-dashboard/rider-profile" render={() => {
                        return (<RiderProfile navMenuOpen={this.state.navMenuOpen} />)
                    }} />
                    <Route path="/rider-dashboard/rider-register" render={() => {
                        return (<RiderRegistrationForm navMenuOpen={this.state.navMenuOpen} />)
                    }} />
                    <Route path="/rider-dashboard/available-rides" component={AvailableRides} />
                    <Route path="/rider-dashboard/upcoming-rides" component={UpcomingRides} />
                    <Route path="/rider-dashboard/ride-requests" component={RiderTripRequests} />
                    <Route path="/rider-dashboard/ride-history" component={RiderHistory} />
                </Switch>

            </section>


        )


    };
}



function mapStateToProps(state) {
    return state.user
}

export default connect(mapStateToProps, { logout })(withRouter(RiderDashboard));