import React, { Component } from 'react';
import { connect } from 'react-redux';

class DriverUpcomingRidesById extends Component {
    render() {
        let { ride_date, ride_location, ride_start_time, ride_end_time, rider_first_name, rider_last_name, tier_id} = this.props;
        return (
        <div style={{backgroundColor: 'yellow', margin: '10px'}}>
            <p>Date: {ride_date}</p>
            <p>Location: {ride_location}</p>
            <p>Start Time: {ride_start_time}</p>
            <p>End Time: {ride_end_time}</p>
            <p>Rider Name: {rider_first_name} {rider_last_name}</p>
            <p>Tier: {tier_id} </p>
        </div>
        );
    }
}

export default connect( null, null)(DriverUpcomingRidesById);