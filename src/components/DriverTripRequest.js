import React, { Component } from 'react';
import { connect } from 'react-redux';
import SMSForm from './SMSForm';
import { request } from 'http';
import onClickOutside from 'react-onclickoutside';


class DriverTripRequest extends Component {

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
        let { request_date, request_location, request_seat_number, tier_id, requester_cell_number, request_start_time, request_end_time, rider_first_name, rider_last_name, accepted, request_id } = this.props;
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
                        <h2 className="selectedRideH2">REQUESTED RIDES</h2>
                        <div className="selectedRideRowContainer">
                            <div className="selectedRideParagraph">Rider Name: {rider_first_name} {rider_last_name}</div>
                        </div>
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
                            <div className="selectedRideParagraph" >Start Time: {request_start_time}</div>
                            <div className="selectedRideParagraph">End Time: {request_end_time}</div>
                        </div>

                        <SMSForm
                            rider_first_name={rider_first_name}
                            request_date={request_date}
                            request_location={request_location}
                            requester_cell_number={requester_cell_number}
                            accepted={accepted}
                            request_id={request_id}
                        />

                    </div>
                </section>
            );
        }
    }
}
export default connect(null, null)(onClickOutside(DriverTripRequest));