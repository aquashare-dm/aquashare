import React, { Component } from 'react';
import { connect } from 'react-redux';

class UpcomingRidesById extends Component {
    render() {
        let { ride_id, ride_location, ride_open_seats, ride_start_time, ride_end_time, driver_first_name, driver_last_name, tier_id, boat_name} = this.props;
        return (
        <div style={{backgroundColor: 'yellow', margin: '10px'}}>
            <p>{ride_id}</p>
            <p>Location: {ride_location}</p>
            <p>Seats: {ride_open_seats}</p>
            <p>Start Time: {ride_start_time}</p>
            <p>End Time: {ride_end_time}</p>
            <p>Driver: {driver_first_name} {driver_last_name}</p>
            <p>Boat Info: {boat_name}</p>
            <p>Tier: {tier_id}</p>
            <p>Pricing</p>
        </div>
        );
    }
}

export default connect( null, null)(UpcomingRidesById);