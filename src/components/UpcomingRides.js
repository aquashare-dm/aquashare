import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import {getRidesById} from "../redux/ridesReducer"
import UpcomingRidesById from './UpcomingRidesById.js'

class UpcomingRides extends Component{

    componentDidMount() {
        let {id} = this.props.user.user
        this.props.getRidesById(id)
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
                <UpcomingRidesById key={ride.ride_id} {...ride} />
            ))
        return(
        
            <div>
                <header>
                    <button onClick={this.goBack}>{`<Back`}</button>
                    <h1>This view will list all of the upcoming user trips and will allow riders to rate the driver</h1>
                    <div>{ridesDisplay}</div>
                </header>
            </div>
        );
    };
}

function mapStateToProps(state){
    return state
  }

  export default connect(mapStateToProps, {getRidesById})(withRouter(UpcomingRides));