import React, { Component } from 'react';
import { connect } from 'react-redux';

class DriverUpcomingRidesById extends Component {
    render() {
        let { ride_id, ride_location, ride_open_seats, ride_start_time, ride_end_time } = this.props;
        return (
        <div style={{backgroundColor: 'yellow', margin: '10px'}}>
            <p>{ride_id}</p>
            <p>Location: {ride_location}</p>
            <p>Seats: {ride_open_seats}</p>
            <p>Start Time: {ride_start_time}</p>
            <p>End Time: {ride_end_time}</p>
            <p>Rider Id: </p>
            <p>Rider Name: </p>
            <p>Tier</p>
            <p>Pricing</p>
        </div>
        );
    }
}

export default connect( null, null)(DriverUpcomingRidesById);