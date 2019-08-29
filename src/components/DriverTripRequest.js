import React, { Component } from 'react';
import { connect } from 'react-redux';
import SMSForm from './SMSForm';
import { request } from 'http';


class DriverTripRequest extends Component {
    
    

    render() {
        let { request_date, request_location, request_seat_number, tier_id, requester_cell_number, request_start_time, request_end_time, rider_first_name, rider_last_name, accepted, request_id} = this.props;
        console.log('this.props for individual requests', this.props)
        
        return (
        <div style={{backgroundColor: 'yellow', margin: '10px'}}>
            <p>Requested Date: {request_date}</p>
            <p>Location: {request_location}</p>
            
            <p>Tube Seats:{request_seat_number}</p>
            <p>Tier: {tier_id}</p>
            <p>Start Time: {request_start_time}</p>
            <p>End Time: {request_end_time}</p>
            <p>Rider Name: {rider_first_name} {rider_last_name}</p>
            <p>I want to fill this request.</p>
            
            <SMSForm
                rider_first_name={rider_first_name}
                request_date={request_date}
                request_location={request_location}
                requester_cell_number={requester_cell_number}
                accepted={accepted}
                request_id = {request_id}
            />
            
        </div>
        );
    }
}
export default connect( null, null)(DriverTripRequest);