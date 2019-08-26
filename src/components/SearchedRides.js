import React, { Component } from 'react';
import { connect } from 'react-redux';

class SearchedRides extends Component {
    buyRide = () => {
        console.log('Buy a ride button triggered!')
    }

    render() {
        let { ride_date, ride_location, ride_total_seats, ride_open_seats, ride_start_time, ride_end_time, driver_first_name, driver_last_name } = this.props;

        return (
        <div style={{backgroundColor: 'yellow', margin: '10px'}}>
            <p>Date: {ride_date}</p>
            <p>Location: {ride_location}</p>
            <p>Total seats: {ride_total_seats}</p>
            <p>Available seats: {ride_open_seats}</p>
            <p>Start Time: {ride_start_time}</p>
            <p>End Time: {ride_end_time}</p>
            <p>Driver: {driver_first_name} {driver_last_name}</p>
            <p>Boat Info</p>
            <p>Tier</p>
            <p>Pricing</p>
            <button onClick={this.buyRide} >Reserve Your Seat Now</button>
        </div>
        );
    }
}

export default connect( null, null)(SearchedRides);