import React, { Component } from 'react';
import { connect } from 'react-redux';

class SearchedRides extends Component {
    buyRide = () => {
        console.log('Buy a ride button triggered!')
    }

    render() {
        let { ride_date, ride_location, ride_total_seats, ride_open_seats, ride_start_time, ride_end_time } = this.props;

        return (
        <div style={{backgroundColor: 'yellow', margin: '10px'}}>
            <p>{ride_date}</p>
            <p>{ride_location}</p>
            <p>{ride_total_seats}</p>
            <p>{ride_open_seats}</p>
            <p>{ride_start_time}</p>
            <p>{ride_end_time}</p>
            <p>Driver</p>
            <p>Boat Info</p>
            <p>Tier</p>
            <p>Pricing</p>
            <button onClick={this.buyRide} >Reserve Your Seat Now</button>
        </div>
        );
    }
}

export default connect( null, null)(SearchedRides);