import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./coreStyling.css";
import "./dashboardStyling.css";

class SearchedRides extends Component {
    constructor(props){
        super(props);
    }

    buyRide = () => {
        console.log('Buy a ride button triggered!')
    }

    render() {
        console.log("rendered a ride")
        let { ride_id, ride_date, ride_location, ride_total_seats, ride_open_seats, ride_start_time, ride_end_time, driver_id, tier_id, driver_first_name, driver_last_name } = this.props;
        return (
            
            <div className="availableRideContainer" onClick={()=>{this.props.getRideData(this.props.key)}}>
                <div className="six wide column" style={{marginLeft: "4%"}}>{ride_date}</div>
                <div className="one wide column" style={{marginLeft: "6%"}}>{ride_open_seats}</div>
                <div className="one wide column" style={{marginLeft: "13%"}}>{tier_id}</div>
                <div className="eight wide column" style={{overflowX: "auto", marginLeft: "9%"}}>{ride_location}</div>
                
                {/* <p>Location: {ride_location}</p>
                <p>Total seats: {ride_total_seats}</p>
                <p>Available seats: {ride_open_seats}</p>
                <p>Start Time: {ride_start_time}</p>
                <p>End Time: {ride_end_time}</p>
                <p>Driver: {driver_first_name} {driver_last_name}</p>
                <p>Boat Info</p>
                <p>Tier</p>
                <p>Pricing</p> */}
                {/* <button onClick={this.buyRide} >Reserve Your Seat Now</button> */}
            </div>

        );
    }
}

export default connect( null, null)(SearchedRides);