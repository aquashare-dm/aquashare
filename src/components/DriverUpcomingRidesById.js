import React, { Component } from 'react';
import { connect } from 'react-redux';

class DriverUpcomingRidesById extends Component {
    render() {
        let { ride_id, ride_location, ride_open_seats, ride_start_time, ride_end_time } = this.props;
        return (
        <div style={{backgroundColor: 'yellow', margin: '10px'}}>
            <p>{ride_id}</p>
            <p>{ride_location}</p>
            <p>{ride_open_seats}</p>
            <p>{ride_start_time}</p>
            <p>{ride_end_time}</p>
            <p>Driver</p>
            <p>Boat Info</p>
            <p>Tier</p>
            <p>Pricing</p>
        </div>
        );
    }
}

export default connect( null, null)(DriverUpcomingRidesById);