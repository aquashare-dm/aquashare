import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Rating } from 'semantic-ui-react';
import onClickOutside from 'react-onclickoutside';
import "./coreStyling.css";
import "./dashboardStyling.css";
import axios from "axios"

class PastRides extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: false,
            rating: this.props.driver_rating,
            maxRating: 5
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
        let driverId = this.props.driver_id
        let rideId = this.props.ride_id
        let data = axios.put('/api/rate-driver', { rating, rideId, driverId }).then(res => res.data)
        // this.setState({ rating: data })
    }

    render() {
        let { ride_date, ride_location, ride_start_time, ride_end_time, tier_id, driver_first_name, driver_last_name, boat_name } = this.props;
        //Calculate ride price to show
        // let ridePrice = 20 + (tier_id * 10);

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
                        <h2 className="selectedRideH2">{boat_name}</h2>
                        <div className="selectedRideRowContainer">
                            <div className="selectedRideParagraph">Location: {ride_location}</div>
                        </div>
                        <div className="selectedRideRowContainer">
                            <div className="selectedRideParagraph">Ride Date: {ride_date}</div>
                            {/* <div className="selectedRideParagraph">Open Seats: {ride_open_seats}</div> */}
                        </div>
                        <div className="selectedRideRowContainer" >
                            <div className="selectedRideParagraph" >Driver: {driver_first_name} {driver_last_name}</div>
                            {/* <div className="selectedRideParagraph">Total Seats: {ride_total_seats}</div> */}
                        </div>
                        <div className="selectedRideRowContainer" style={{ marginTop: "8%" }}>
                            <div className="selectedRideParagraph">Tier: {tier_id}</div>
                            <div className="selectedRideParagraph">{`Start Time: ${ride_start_time}:00`}</div>
                            <div className="selectedRideParagraph">{`End Time: ${ride_end_time}:00`}</div>
                        </div>
                        <div className="selectedRideRowContainer" style={{ marginBottom: "5%" }}>
                            <div className="selectedRideParagraph" style={{ marginTop: "10%" }}>Please rate the driver for this trip </div>
                        </div>
                        <div className="selectedRideRowContainer" style={{ marginBottom: "5%" }}>
                            <Rating defaultRating={this.state.rating} icon='star' maxRating={5} onRate={this.handleRate} />
                        </div>
                    </div>
                </section>
            )
        }

    }
}

export default connect(null, null)(onClickOutside(PastRides));
