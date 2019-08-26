import React, { Component } from 'react';
import { connect } from 'react-redux';


class DriverPastRides extends Component {
    


    render() {
        let { ride_id, rider_id, ride_date, ride_location, ride_open_seats, ride_start_time, ride_end_time, tier_id } = this.props;
        console.log(this.state.rating, 'rating')
        return (
        <div style={{backgroundColor: 'yellow', margin: '10px'}}>
            <p>{ride_id}</p>
            <p>Date: {ride_date}</p>
            <p>Location: {ride_location}</p>
            <p>Seats: {ride_open_seats}</p>
            <p>Start Time: {ride_start_time}</p>
            <p>End Time: {ride_end_time}</p>
            {/* <p>Rider: {rider_id}</p> */}
            <p>Tier: {tier_id}</p>
            <p>Pricing</p>
        </div>
        );
    }
}

export default connect( null, null)(DriverPastRides);