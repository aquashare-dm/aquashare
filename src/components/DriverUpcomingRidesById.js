import React, { Component } from 'react';
import { connect } from 'react-redux';
import onClickOutside from 'react-onclickoutside';

class DriverUpcomingRidesById extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: false
        }
    }

    clickedRide = () => {
        let currentSelectedState = this.state.selected;
        this.setState({ selected: !currentSelectedState })
    }

    handleClickOutside = () => {
        if (this.state.selected === true) {
            this.clickedRide();
        }

    }

    render() {
        let { ride_date, ride_location, ride_start_time, ride_end_time, rider_first_name, rider_last_name, tier_id } = this.props;
        if (this.state.selected === false) {
            return (

                <section className="availableRideContainer" onClick={this.clickedRide}>
                    <div className="six wide column" style={{ marginLeft: "4%" }}>{ride_date}</div>
                    <div className="one wide column" style={{ marginLeft: "6%" }}>{ride_location}</div>
                    <div className="one wide column" style={{ marginLeft: "13%" }}>{tier_id}</div>
                    <div className="eight wide column" style={{ overflowX: "auto", marginLeft: "9%" }}>{ride_location}</div>
                </section>
            );
        } else {
            return (
                <section className="selectedRideContainer" style={{ height: "30vh" }} onClick={this.clickedRide}>
                    <div className="selectedRideWhiteBox">
                        <div>
                            <div className="selectedRideRowContainer" style={{ marginTop: "8%" }}>
                                <div className="selectedRideParagraph">Rider Name: {rider_first_name} {rider_last_name}</div>
                            </div>
                            <div className="selectedRideRowContainer" style={{ marginTop: "8%" }}>
                                <div className="selectedRideParagraph">Ride Date: {ride_date}</div>
                                <div className="selectedRideParagraph">Location: {ride_location}</div>
                            </div>
                            <div className="selectedRideRowContainer" style={{ marginTop: "8%" }}>
                                <div className="selectedRideParagraph">Start Time: {ride_start_time}</div>
                                <div className="selectedRideParagraph">End Time: {ride_end_time}</div>
                                <div className="selectedRideParagraph">Tier: {tier_id}</div>
                            </div>
                        </div>
                    </div>
                </section>
            );
        }
    }
}

export default connect(null, null)(onClickOutside(DriverUpcomingRidesById));