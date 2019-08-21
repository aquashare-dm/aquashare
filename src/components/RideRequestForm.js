import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import Geocode from "react-geocode";
import CurrentLocation from "./RideSearch/Map.js";

require("dotenv").config({path: __dirname + "/../../.env"});
const {REACT_APP_GOOGLE_API_KEY} = process.env;
//Geocoding Functionality
Geocode.setApiKey(REACT_APP_GOOGLE_API_KEY);

class RideRequestForm extends Component{
    constructor(){
        super();
        this.state = {
            requestDate: '',
            location: '',
            locationLatitude: "",
            locationLongitude: "",
            requestSeatNum: '',
            tierId: '',
            riderId: '',
            requestStartTime: '',
            requestEndTime: ''
        }
    }

    goBack = () => {
        this.props.history.goBack()
    };
    
    requestRide = (e) => {
        e.preventDefault()
        console.log('Request was sent, redirecting to requests outstanding page in 2 seconds!')
        setTimeout( () => {
            this.props.history.push('/rider-dashboard/ride-requests')
        }, 2000)
    };

    handleChange = (event) => {
        let { name, value } = event.target;
        this.setState({
            [name]: value
        })
    };

    render(){
        
        let { user } = this.props;
        if(!user.loggedIn){
            return <Redirect to="/" />
        }

        return(
        
            <div>
                <header>
                    <button onClick={this.goBack}>{`<Back`}</button>
                    <h1>Enter information here to send request to drivers</h1>
                </header>
                <form>
                    <input type="text" name="requestDate" onChange={this.handleChange} value={this.state.requestDate} placeholder="Request Date" />
                    <input type="text" name="location" onChange={this.handleChange} value={this.state.location} placeholder="Request Location" />
                    <input type="text" name="requestSeatNum" onChange={this.handleChange} value={this.state.requestSeatNum} placeholder="Requested Number of Seats" />
                    <input type="text" name="tierId" onChange={this.handleChange} value={this.state.tierId} placeholder="Requested Tier" />
                    <input type="text" name="requestStartTime" onChange={this.handleChange} value={this.state.requestStartTime} placeholder="Start Time" />
                    <input type="text" name="requestEndTime" onChange={this.handleChange} value={this.state.requestEndTime} placeholder="End Time" />

                    <button onClick={(e) => { this.requestRide(e) }}>Request Your Ride</button>
                </form>
            </div>
        );
    };
}

function mapStateToProps(state){
    return state.user
  }

  export default connect(mapStateToProps, null)(withRouter(RideRequestForm));