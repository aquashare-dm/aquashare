import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { getConfirmedRidesByDriverId } from "../redux/ridesReducer"
import DriverUpcomingRidesById from './DriverUpcomingRidesById.js'
import "./coreStyling.css";
import "./dashboardStyling.css";

class DriverUpcomingRides extends Component {

    componentDidMount() {
        let { id } = this.props.user.user
        this.props.getConfirmedRidesByDriverId(id)
    }

    goBack = () => {
        this.props.history.goBack()
    }

    render() {
        let { user } = this.props.user;
        if (!user.loggedIn) {
            return <Redirect to="/" />
        }

        console.log(this.props, "this.props")
        let { filteredRides } = this.props.rides

        return (
            <div className="mainAppWindow">
                <section className="normalPageContainer">
                    <section className="normalPageWhiteBox">
                        <h2 className="mapPageContainerHeader">UPCOMING RIDES</h2>
                        <div className="availableRideContainer" style={{ backgroundColor: "white", height: "5vh" }}>
                            <div className="six wide column" style={{ marginLeft: "4%" }}>DATE</div>
                            <div className="one wide column" style={{ marginLeft: "7%" }}></div>
                            <div className="one wide column" style={{ marginLeft: "16%" }}>TIER</div>
                            <div className="eight wide column" style={{ overflowX: "auto", marginLeft: "5%" }}>LOCATION</div>
                        </div>
                        <div className="allAvailRidesContainer" >{
                            filteredRides.filter(function (ride) {
                                if (JSON.stringify(ride.ride_end_time).length === 1) {
                                    let currentFlag = Date.parse(`${ride.ride_date} 00:0${JSON.stringify(ride.ride_end_time)}:00:00`) - Date.now()
                                    return currentFlag >= 0
                                } else {
                                    let currentFlag = Date.parse(`${ride.ride_date} 00:${JSON.stringify(ride.ride_end_time)}:00:00`) - Date.now()
                                    return currentFlag >= 0
                                }
                            })
                                .map(ride => (
                                    <DriverUpcomingRidesById key={ride.ride_id} {...ride} eventTypes={["click"]} />
                                ))
                        }</div>
                    </section>
                </section>
            </div>
        );
    };
}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps, { getConfirmedRidesByDriverId })(withRouter(DriverUpcomingRides));