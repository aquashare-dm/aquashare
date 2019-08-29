import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Rating} from 'semantic-ui-react';
import axios from "axios"

class DriverPastRides extends Component {
    constructor(props) {
        super(props)
        this.state = {
            rating: 0,
            maxRating: 5
        }
    }

    componentDidMount(props) {
        console.log('Component Mounting!!!!!!!!!!!')
        let riderId = this.props.rider_id
        let rideId = this.props.ride_id
        let data = axios.get('/api/rider-ratings', {rideId, riderId}).then(res => res.data)
        console.log('data in DriverPastRides', data)
        this.setState({rating: data})
        console.log('this.state.rating', this.state.rating)
    }
    
    handleRate = (e, { rating, maxRating }) => {
        this.setState({ rating, maxRating })
        let riderId = this.props.rider_id
        let rideId = this.props.ride_id
        let data = axios.put('/api/rate-rider', {rating, rideId, riderId} ).then(res => res.data)
        this.setState({ rating: data })
    } 

    render() {
        let { ride_id, rider_first_name, rider_last_name, ride_date, ride_location, ride_open_seats, ride_start_time, ride_end_time, tier_id } = this.props;
        console.log(this.state.rating, 'rating')
        return (
        <div style={{backgroundColor: 'yellow', margin: '10px'}}>
            <p>{ride_id}</p>
            <p>Date: {ride_date}</p>
            <p>Location: {ride_location}</p>
            <p>Seats: {ride_open_seats}</p>
            <p>Start Time: {ride_start_time}</p>
            <p>End Time: {ride_end_time}</p>
            <p>Rider: {rider_first_name} {rider_last_name}</p>
            <p>Tier: {tier_id}</p>
            <p>Please rate the trip.</p>
            <div>
                <Rating value={this.state.rating} icon='star' maxRating={5} onRate={this.handleRate} /> 
            </div>
        </div>
        );
    }
}

export default connect( null, null)(DriverPastRides);