import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import {getConfirmedRidesByDriverId} from "../redux/ridesReducer"
import DriverUpcomingRidesById from './DriverUpcomingRidesById.js'

class DriverUpcomingRides extends Component{

    componentDidMount() {
        let {id} = this.props.user.user
        this.props.getConfirmedRidesByDriverId(id)
    }

    goBack = () => {
        this.props.history.goBack()
    }

    render(){
        let { user } = this.props.user;
        if(!user.loggedIn){
            return <Redirect to="/" />
        }
       
        console.log(this.props, "this.props")
        let {filteredRides} = this.props.rides
        
        let ridesDisplay = filteredRides.filter( function (ride) {
            if (JSON.stringify(ride.ride_end_time).length === 1) {
                let currentFlag = Date.parse(`${ride.ride_date} 00:0${JSON.stringify(ride.ride_end_time)}:00:00`) - Date.now()
                return currentFlag >= 0
            } else {
                let currentFlag = Date.parse(`${ride.ride_date} 00:${JSON.stringify(ride.ride_end_time)}:00:00`) - Date.now()
                return currentFlag >= 0
            }})
            .map( ride => (
                <DriverUpcomingRidesById key={ride.ride_id} {...ride} />
            ))
        return(
        
            <div>
                <header>
                    <button onClick={this.goBack}>{`<Back`}</button>
                    <h1>This view will list all of the upcoming user trips</h1>
                    <div>{ridesDisplay}</div>
                </header>
            </div>
        );
    };
}

function mapStateToProps(state){
    return state
  }

  export default connect(mapStateToProps, {getConfirmedRidesByDriverId})(withRouter(DriverUpcomingRides));