import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { getRides } from '../redux/ridesReducer'
import SearchedRides from './SearchedRides.js'


class AvailableRides extends Component{

    // componentDidUpdate(prevProps) {
    //     let { locationLatitude, locationLongitude, numberOfRiders, radius } = this.props.rides.searchCriteria
    //     if(prevProps !== this.props) {
    //         this.props.getRides( locationLatitude, locationLongitude, numberOfRiders, radius)
    //     }
    // }
    
    goBack = () => {
        this.props.history.goBack()
    }
    
    requestRide = () => {
        this.props.history.push('/rider-dashboard/request-a-ride')
    }

    render(){
        console.log(this.props)
        let { rides } = this.props.rides
        let { user } = this.props.user
        let { firstDate, secondDate } = this.props.rides.searchCriteria

        if(!user.loggedIn){
            return <Redirect to="/" />
        }

        return(
            <div>
                <header>
                    <button onClick={this.goBack}>{`<Back`}</button>
                    <h1>Available Rides</h1>
                    <div>{
                        rides.filter( function (ride) {
                            if(Date.now() > Date.parse(firstDate)) {
                                if(JSON.stringify(ride.ride_end_time).length === 1) {
                                    return Date.parse(`${ride.ride_date} 00:0${JSON.stringify(ride.ride_start_time)}:00:00`) >= Date.now()
                                } else {
                                    return Date.parse(`${ride.ride_date} 00:${JSON.stringify(ride.ride_start_time)}:00:00`) >= Date.now()
                                }    
                            } else {
                                return Date.parse(ride.ride_date) >= Date.parse(firstDate)
                            }
                        })
                        .filter( ride => Date.parse(ride.ride_date) <= Date.parse(secondDate))
                        .map( ride => (
                            <SearchedRides key={ride.ride_id} {...ride} />
                        ))
                    }</div>
                    <div>Not finding a trip you like?</div>
                    <button onClick={this.requestRide}>Request A Ride</button> 
                </header>
            </div>
        );
    };
}

function mapStateToProps(state){
    return state
  }

  export default connect(mapStateToProps, { getRides })(withRouter(AvailableRides));