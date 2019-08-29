import React, { Component } from 'react';
import { connect } from 'react-redux';


class DriverPastRides extends Component {
    


    render() {
        let { ride_id, ride_date, ride_location, ride_open_seats, ride_start_time, ride_end_time, tier_id } = this.props;
        
        return (
        <div style={{backgroundColor: 'yellow', margin: '10px'}}>
            <p>{ride_id}</p>
            <p>Date: {ride_date}</p>
            <p>Location: {ride_location}</p>
            <p>Start Time: {ride_start_time}</p>
            <p>End Time: {ride_end_time}</p>
            <p>Seats: {ride_open_seats}</p>
            <p>Tier: {tier_id}</p>
        </div>
        );
    }
}

export default connect( null, null)(DriverPastRides);