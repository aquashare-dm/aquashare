import React, { Component } from 'react';
import { connect } from 'react-redux';

class Ride extends Component {

  render() {
    let { ride_id, ride_location_lat, ride_location_long, ride_total_seats, ride_open_seats, ride_length_minutes, ride_start_hour } = this.props;

    return (
      <div style={{backgroundColor: 'yellow', margin: '10px'}}>
        <p>{ride_id}</p>
        <p>{ride_location_lat}</p>
        <p>{ride_location_long}</p>
        <p>{ride_total_seats}</p>
        <p>{ride_open_seats}</p>
        <p>{ride_length_minutes}</p>
        <p>{ride_start_hour}</p>
      </div>
    );
  }
}

export default connect( null, null)(Ride);