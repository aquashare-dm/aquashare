import React, { Component } from 'react';
import { connect } from 'react-redux';



class DriverTripRequest extends Component {
    
    

    render() {
        let { request_date, request_location_lat, request_location_long, request_seat_number, tier_id, rider_id, request_start_time, request_end_time } = this.props;
        
        return (
        <div style={{backgroundColor: 'yellow', margin: '10px'}}>
            <p>{request_date}</p>
            <p>{request_location_lat}</p>
            <p>{request_location_long}</p>
            <p>{request_seat_number}</p>
            <p>{tier_id}</p>
            <p>{request_start_time}</p>
            <p>{request_end_time}</p>
            <p>{rider_id}</p>
            <p>I want to fill this request.</p>
            <button>Accept</button>
            
        </div>
        );
    }
}
export default connect( null, null)(DriverTripRequest);