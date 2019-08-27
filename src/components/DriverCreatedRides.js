import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import {getRidesByDriverId} from "../redux/ridesReducer"
import DriverCreatedRide from './DriverCreatedRide.js'

class DriverCreatedRides extends Component{

    componentDidMount() {
        let {id} = this.props.user.user
        this.props.getRidesByDriverId(id)
    }

    goBack = () => {
        this.props.history.goBack()
    }

    // goToSearchPage = () => {
    //     this.props.history.push('/driver-dashboard/create-a-ride')
    // }

    render(){
        // let { user } = this.props.user;
        // if(!user.loggedIn){
        //     return <Redirect to="/" />
        // }
       
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
                <DriverCreatedRide key={ride.ride_id} {...ride} />
            ))
        return(
        
            <div>
                <header>
                    <button onClick={this.goBack}>{`<Back`}</button>
                    <h1>This view will show all the rides the driver has created. (That aren't filled yet?)</h1>
                    <div>{ridesDisplay}</div>
                    <button onClick={this.goToSearchPage}>Search for a New Ride</button> 
                </header>
            </div>
        );
    };
}

function mapStateToProps(state){
    return state
  }

  export default connect(mapStateToProps, {getRidesByDriverId})(withRouter(DriverCreatedRides));