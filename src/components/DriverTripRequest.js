import React, { Component } from 'react';
import { connect } from 'react-redux';
import SMSForm from './SMSForm';


class DriverTripRequest extends Component {
    
    

    render() {
        let { request_date, request_location, request_seat_number, tier_id, requester_cell_number, request_start_time, request_end_time, rider_first_name, rider_last_name} = this.props;
        
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
            
            <SMSForm  request_first_name={this.request_first_name}
                        request_date={this.request_date}
                        request_location={this.request_location}
                        requester_cell_number={this.requester_cell_number}
                        
            />
            
        </div>
        );
    }
}
export default connect( null, null)(DriverTripRequest);