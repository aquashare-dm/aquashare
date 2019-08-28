import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { getRides } from '../redux/ridesReducer';
import SearchedRides from './SearchedRides.js';
import "./coreStyling.css";
import "./dashboardStyling.css";
import { whileStatement } from "@babel/types";


class AvailableRides extends Component{

    componentDidMount(prevProps) {
        let { locationLatitude, locationLongitude, radius } = this.props.rides.searchCriteria
        if(prevProps !== this.props) {
            this.props.getRides( locationLatitude, locationLongitude, radius)
            console.log("compDidMount rides are ",this.props.getRides( locationLatitude, locationLongitude, radius))
        }
    }
    
    goBack = () => {
        this.props.history.goBack()
    }
    
    requestRide = () => {
        this.props.history.push('/rider-dashboard/request-a-ride')
    }

    getRideData = (rideKey) => {
        console.log("clicked on ride")
    }

    render(){
        let { rides } = this.props.rides
        let { user } = this.props.user
        let { firstDate, secondDate } = this.props.rides.searchCriteria
        console.log("rides is ", this.rides)

        if(!user.loggedIn){
            return <Redirect to="/" />
        }

        return(
            <div className="mainAppWindow">
                <section className="normalPageContainer">
                   <section className="normalPageWhiteBox">
                            {/* <button onClick={this.goBack}>{`<Back`}</button> */}
                            <h2 className="mapPageContainerHeader">AVAILABLE RIDES</h2>

                            <div className="availableRideContainer" style={{backgroundColor: "white", height: "5vh"}}>
                                <div className="six wide column" style={{marginLeft: "4%"}}>DATE</div>
                                <div className="one wide column" style={{marginLeft: "17%"}}>SEATS</div>
                                <div className="one wide column" style={{marginLeft: "4%"}}>TIER</div>
                                <div className="eight wide column" style={{overflowX: "auto", marginLeft: "3%"}}>LOCATION</div>
                            </div>

                            <div className="allAvailRidesContainer" >{
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
                                
                                    <SearchedRides key={ride.ride_id} getRideData={this.getRideData} {...ride} eventTypes={["click"]} />
                                ))
                            }</div>
                            <h2 className="normalContentHeader">NOT FINDING YOUR RIDE?</h2>
                            <button className="ui inverted blue button" onClick={this.requestRide}>REQUEST A RIDE</button> 
                   </section>
                    
                
                </section>

                
            </div>
        );
    };
}

function mapStateToProps(state){
    return state
  }

  export default connect(mapStateToProps, { getRides })(withRouter(AvailableRides));