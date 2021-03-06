import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Rating } from 'semantic-ui-react'
import "./coreStyling.css";
import "./dashboardStyling.css";
import onClickOutside from 'react-onclickoutside';
import axios from "axios"

class DriverPastRides extends Component {
    constructor(props) {
        super(props)
        this.state = {
            rating: this.props.rider_rating,
            maxRating: 5,
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

    handleRate = (e, { rating, maxRating }) => {
        this.setState({ rating, maxRating })
        let riderId = this.props.rider_id
        let rideId = this.props.ride_id
        let data = axios.put('/api/rate-rider', { rating, rideId, riderId }).then(res => res.data)
        // this.setState({ rating: data })
    }

    render() {
        let { ride_id, rider_first_name, rider_last_name, ride_date, ride_location, ride_open_seats, ride_start_time, ride_end_time, tier_id } = this.props;
        if (this.state.selected === false) {
            return (
                <section className="availableRideContainer" onClick={this.clickedRide}>
                    <div className="six wide column" style={{ marginLeft: "4%" }}>{ride_date}</div>
                    {/* <div className="one wide column" style={{ marginLeft: "6%" }}>{ride_open_seats}</div> */}
                    <div className="one wide column" style={{ marginLeft: "13%" }}>{tier_id}</div>
                    <div className="eight wide column" style={{ overflowX: "auto", marginLeft: "9%" }}>{ride_location}</div>
                </section>
            );
        } else {
            return (
                <section className="selectedRideContainer" style={{ height: "30vh" }} onClick={this.clickedRide}>
                    <div className="selectedRideWhiteBox">
                        {/* <div className="selectedRideRowContainer">
                            <div className="selectedRideParagraph">Ride Number: {ride_id}</div>
                        </div> */}
                        <div className="selectedRideRowContainer">
                            <div className="selectedRideParagraph">Location: {ride_location}</div>
                        </div>
                        <div className="selectedRideRowContainer">
                            <div className="selectedRideParagraph">Ride Date: {ride_date}</div>
                            {/* <div className="selectedRideParagraph">Seats: {ride_open_seats}</div> */}
                        </div>
                        <div className="selectedRideRowContainer">
                            <div className="selectedRideParagraph">Rider: {rider_first_name} {rider_last_name}</div>
                            {/* <div className="selectedRideParagraph">Seats: {ride_open_seats}</div> */}
                        </div>
                        <div className="selectedRideRowContainer" style={{ marginTop: "8%" }}>
                            <div className="selectedRideParagraph">Tier: {tier_id}</div>
                            <div className="selectedRideParagraph">{`Start Time: ${ride_start_time}:00`}</div>
                            <div className="selectedRideParagraph">{`End Time: ${ride_end_time}:00`}</div>
                        </div>
                        <div className="selectedRideRowContainer" style={{ marginBottom: "5%" }}>
                            <div className="selectedRideParagraph" style={{ marginTop: "10%" }}>Please rate the rider for this trip </div>
                        </div>
                        <div className="selectedRideRowContainer" style={{ marginBottom: "5%" }}>
                            <Rating defaultRating={this.state.rating} icon='star' maxRating={5} onRate={this.handleRate} />
                        </div>
                    </div>
                </section>
            );
        }
    }
}

export default connect(null, null)(onClickOutside(DriverPastRides))