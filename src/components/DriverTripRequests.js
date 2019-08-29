import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import {getAvailableRequests} from '../redux/requestReducer'
import DriverTripRequest from './DriverTripRequest'

class DriverTripRequests extends Component{

    componentDidMount() {
        this.props.getAvailableRequests(this.props.user.user.id)
    } 

    goBack = () => {
        this.props.history.goBack()
    }
    
    goToSearchPage = () => {
        this.props.history.push('/driver-dashboard/create-a-ride')
    }

    render(){
        console.log("Props on request page", this.props)
        let { user } = this.props.user;
        let {requests} = this.props
        
       
        if(!user.loggedIn){
            return <Redirect to="/" />
        }
        console.log(requests, 'requests')
        
        let requestsDisplay = requests.allRequests.map( request => (
            <DriverTripRequest key = {request.request_id} {...request} />
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

  export default connect(mapStateToProps, {getAvailableRequests})(withRouter(DriverTripRequests));

