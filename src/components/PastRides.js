import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Rating} from 'semantic-ui-react';
import onClickOutside from 'react-onclickoutside';

class PastRides extends Component {
    state = {
        rating: 0,
        maxRating: 5
    }
    
    handleRate = (e, { rating, maxRating }) => this.setState({ rating, maxRating }) 
        
    
        
    buyRide = () => {
        console.log('Buy a ride button triggered!')
    }

    render() {
        let { ride_id, ride_date, ride_location, ride_open_seats, ride_start_time, ride_end_time, driver_first_name, driver_last_name, tier_id } = this.props;
        console.log(this.state.rating, 'rating')
        return (
        <div style={{backgroundColor: 'yellow', margin: '10px'}}>
            <p>{ride_id}</p>
            <p>Date: {ride_date}</p>
            <p>Location: {ride_location}</p>
            <p>Seats: {ride_open_seats}</p>
            <p>Start Time: {ride_start_time}</p> 
            <p>End Time: {ride_end_time}</p>
            <p>Driver: {driver_first_name} {driver_last_name}</p>
            <p>Tier: {tier_id}</p>
            <p>Pricing</p>
            <p>Please rate your trip.</p>
            <div>
                <Rating icon='star' maxRating={5} onRate={this.handleRate} />
                
            </div>
        </div>
        );
    }
}

export default connect( null, null)(PastRides);