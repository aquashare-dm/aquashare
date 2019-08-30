import React, { Component } from 'react';
import { connect } from 'react-redux';
import { request } from 'http';
import onClickOutside from 'react-onclickoutside';

class DriverPastRides extends Component {
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
        let { ride_id, ride_date, ride_location, ride_open_seats, ride_start_time, ride_end_time, tier_id } = this.props;
        if (this.state.selected === false) {
            return (

                <section className="availableRideContainer" onClick={this.clickedRide}>
                    <div className="six wide column" style={{ marginLeft: "4%" }}>{ride_date}</div>
                    {/* <div className="one wide column" style={{marginLeft: "6%"}}>{ride_open_seats}</div> */}
                    <div className="one wide column" style={{ marginLeft: "13%" }}>{tier_id}</div>
                    <div className="eight wide column" style={{ overflowX: "auto", marginLeft: "9%" }}>{ride_location}</div>
                </section>

            );
        } else {
            return (
                <section className="selectedRideContainer" style={{ height: "30vh" }} onClick={this.clickedRide}>
                    <div className="selectedRideWhiteBox">
                        <div className="selectedRideRowContainer">
                            <h2 className="mapPageContainerHeader">RIDE DATE: {ride_date}</h2>
                        </div>
                        <div className="selectedRideRowContainer">
                            <div className="selectedRideParagraph">Location: {ride_location}</div>
                        </div>
                        <div className="selectedRideRowContainer">
                            <div className="selectedRideParagraph">Ride Tier: {tier_id}</div>
                            <div className="selectedRideParagraph">Seats: {ride_open_seats}</div>
                        </div>
                        <div className="selectedRideRowContainer" >
                            <div className="selectedRideParagraph">{`Start Time: ${ride_start_time}:00`}</div>
                            <div className="selectedRideParagraph">{`End Time: ${ride_end_time}:00`}</div>
                        </div>
                    </div>
                </section>
            );
        }
    }
}

export default connect(null, null)(onClickOutside(DriverPastRides));