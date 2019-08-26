import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import {getRequestsById} from '../redux/requestReducer'
import TripRequest from './TripRequest'


class RiderTripRequests extends Component{

    componentDidMount() {
        let {id} = this.props.user.user
        this.props.getRequestsById(id)
    } 

    goBack = () => {
        this.props.history.goBack()
    }
    
    goToSearchPage = () => {
        this.props.history.push('/rider-dashboard/find-a-ride')
    }

    render(){
        if(!user.loggedIn){
            return <Redirect to="/" />
        }
        

        let { user } = this.props.user;
        let {requests} = this.props
        let {request_date, request_end_time} = this.props.requests.allRequests[0]

        let requestsDisplay = requests.allRequests.map( request => (
            <TripRequest key = {request.rider_id} {...request} />
        ))
        return(
        
            <div>
                <header>
                    <button onClick={this.goBack}>{`<Back`}</button>
                    <h1>This view will list all of the outstanding requests from the rider</h1>
                    {requestsDisplay}
                    <button onClick={this.goToSearchPage}>Search for a New Ride</button> 
                </header>
            </div>
        );
    };
}

function mapStateToProps(state){
    return state
  }

  export default connect(mapStateToProps, {getRequestsById})(withRouter(RiderTripRequests));

