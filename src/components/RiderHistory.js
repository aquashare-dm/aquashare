import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import {getRides, getPastRides} from "../redux/ridesReducer"
import PastRides from './PastRides.js'

class RiderHistory extends Component{

    componentDidMount() {
        let {id} = this.props.user
        this.props.getPastRides(id)
    }

    goBack = () => {
        this.props.history.goBack()
    }

    goToSearchPage = () => {
        this.props.history.push('/rider-dashboard/find-a-ride')
    }

    render(){
        console.log(this.props, "this.props")
        let {pastRides} = this.props.rides
        let ridesDisplay = pastRides.map( ride => (
            <PastRides key={ride.ride_id} {...ride} />
        ))
        return(
        
            <div>
                <header>
                    <button onClick={this.goBack}>{`<Back`}</button>
                    <h1>This view will list all of the past user trips and will allow riders to rate the driver</h1>
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

  export default connect(mapStateToProps, {getRides, getPastRides})(withRouter(RiderHistory));