import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { getRides } from '../redux/ridesReducer'


class AvailableRides extends Component{

    componentDidMount() {
        let { firstDate, secondDate, numberOfRiders } = this.props.trips.searchCriteria
        let { trips } = this.props
        if(!trips.length) {
            this.props.getRides(firstDate, secondDate, numberOfRiders)
        }
    }
    
    goBack = () => {
        this.props.history.goBack()
    }
    
    requestRide = () => {
        this.props.history.push('/rider-dashboard/request-a-ride')
    }

    render(){
        console.log(this.props)
        return(
            <div>
                <header>
                    <button onClick={this.goBack}>{`<Back`}</button>
                    <h1>Available Rides</h1>
                    <div>Map through get request payload here and display rides according to data inputted in previous search screen</div>
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