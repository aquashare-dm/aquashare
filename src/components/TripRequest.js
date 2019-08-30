import React, { Component } from 'react';
import { connect } from 'react-redux';
import onClickOutside from 'react-onclickoutside';

class TripRequest extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selected: false
        }
    }

    buyRide = () => {
        console.log('Buy a ride button triggered!')
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
        let { request_date, request_location, request_seat_number, tier_id, rider_id, request_start_time, request_end_time } = this.props;

        // return (
        // <div style={{backgroundColor: 'yellow', margin: '10px'}}>

        //     {/* <p>Driver</p>
        //     <p>Boat Info</p>
        //     <p>Tier</p>
        //     <p>Pricing</p> */}

        // </div>

        if (this.state.selected === false) {
            return (

                <section className="availableRideContainer" onClick={this.clickedRide}>
                    <div className="six wide column" style={{ marginLeft: "4%" }}>{request_date}</div>
                    {/* <div className="one wide column" style={{marginLeft: "6%"}}>{ride_open_seats}</div> */}
                    <div className="one wide column" style={{ marginLeft: "13%" }}>{tier_id}</div>
                    <div className="eight wide column" style={{ overflowX: "auto", marginLeft: "9%" }}>{request_location}</div>

                </section>

            );
        } else {
            return (
                <section className="selectedRideContainer" style={{ height: "30vh" }} onClick={this.clickedRide}>
                    <div className="selectedRideWhiteBox">
                        <h2 className="selectedRideH2">RIDE REQUESTS</h2>
                        <div className="selectedRideRowContainer">
                            <div className="selectedRideParagraph">Location: {request_location}</div>
                        </div>
                        <div className="selectedRideRowContainer">
                            <div className="selectedRideParagraph">Ride Date: {request_date}</div>
                        </div>
                        <div className="selectedRideRowContainer">
                            <div className="selectedRideParagraph">Ride Tier: {tier_id}</div>
                            <div className="selectedRideParagraph">Seats: {request_seat_number}</div>
                        </div>
                        <div className="selectedRideRowContainer" >
                            <div className="selectedRideParagraph">{`Start Time: ${request_start_time}:00`}</div>
                            <div className="selectedRideParagraph">{`End Time: ${request_end_time}:00`}</div>
                        </div>
                    </div>
                </section>
            )
        }

    }
}

export default connect(null, null)(onClickOutside(TripRequest));