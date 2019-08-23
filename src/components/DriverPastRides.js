import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Rating} from 'semantic-ui-react'

class DriverPastRides extends Component {
    state = {
        rating: 0,
        maxRating: 5
    }
    
    handleRate = (e, { rating, maxRating }) => this.setState({ rating, maxRating }) 
        
    
        
    buyRide = () => {
        console.log('Buy a ride button triggered!')
    }

    render() {
        let { ride_id, ride_location, ride_open_seats, ride_start_time, ride_end_time } = this.props;
        console.log(this.state.rating, 'rating')
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
            <p>Please rate your trip.</p>
            <div>
                <Rating icon='star' maxRating={5} onRate={this.handleRate} />
                
            </div>
        </div>
        );
    }
}

export default connect( null, null)(DriverPastRides);