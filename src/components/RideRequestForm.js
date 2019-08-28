import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import Geocode from "react-geocode";
import CurrentLocation from "./RideSearch/Map.js";
import { createRequest } from '../redux/requestReducer'

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
            requestEndTime: '',
            requesterCell: '',

            //GoogleMaps States
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},

            //UI States
            inInputBox: false
        }
    }

    componentDidUpdate(prevProps, prevState){
        if(document.activeElement.id === "location-address-input" && this.state.inInputBox === false){
            this.setState({inInputBox: true})
        }

        //Check if focus was removed from input box
        if(document.activeElement.id !== "location-address-input" && this.state.inInputBox === true){
            this.setState({inInputBox: false});
            this.submitAddressForGeocoding();
        }
    }

    goBack = () => {
        this.props.history.goBack()
    };

    correctTimeForDatabase = (str) => {
        if (str[1] === ":") {
            return +str.slice(0,1)
        } else {
            return +str.slice(0,2)
        }
    }
    
    requestRide = async (e) => {

        e.preventDefault()
        await this.submitAddressForGeocoding();
        console.log("this.props is ", this.props);
        let {requestDate, locationLatitude, locationLongitude, requestSeatNum, tierId, requestStartTime, requestEndTime} = this.state;
        let correctedStartTime = this.correctTimeForDatabase(requestStartTime)
        let correctedEndTime = this.correctTimeForDatabase(requestEndTime)
        await this.props.createRequest(requestDate, locationLatitude, locationLongitude, requestSeatNum, tierId, this.props.user.id, correctedStartTime, correctedEndTime);
        this.props.history.push('/rider-dashboard/ride-requests');
    };

    handleChange = (event) => {
        let { name, value } = event.target;
        this.setState({
            [name]: value
        })
    };

    //Google Maps API Functions

    onMarkerClick = (props, marker, event) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    }

    onClose = (props) => {
        if(this.state.showingInfoWindow){
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    }

    //------------------------

    submitAddressForGeocoding = () => {
        Geocode.fromAddress(this.state.location).then(
            response => {

                const { lat, lng } = response.results[0].geometry.location;
                this.setState({
                    locationLatitude: lat,
                    locationLongitude: lng
                })
            },
            error => {
                console.error(error);
            }
        );
    }

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
                    <input type="date" name="requestDate" onChange={this.handleChange} value={this.state.requestDate} placeholder="Request Date" />
                    <input type="text" id="location-address-input" name="location" onChange={this.handleChange} value={this.state.location} placeholder="Request Location" />
                    <input type="number" min="0" name="requestSeatNum" onChange={this.handleChange} value={this.state.requestSeatNum} placeholder="Requested Number of Seats" />
                    <input type="number" name="tierId" onChange={this.handleChange} value={this.state.tierId} placeholder="Requested Tier" />
                    <input type="time" step="360000" name="requestStartTime" onChange={this.handleChange} value={this.state.requestStartTime} placeholder="Start Time" />
                    <input type="time" step="360000" name="requestEndTime" onChange={this.handleChange} value={this.state.requestEndTime} placeholder="End Time" />
                    <input type="text"  name="requesterCell" onChange={this.handleChange} value={this.state.requesterCell} placeholder=" ex. 5551234567" />
                    <button onClick={(e) => { this.requestRide(e) }}>Request Your Ride</button>
                </form>

                <div className="mapRightCont" style={{marginTop: "50px"}}>
                    <CurrentLocation centerAroundCurrentLocation width={"500px"} height={"300px"} google={this.props.google} lat={this.state.locationLatitude} lng={this.state.locationLongitude} >
                        <Marker
                            position={{lat:this.state.locationLatitude, lng:this.state.locationLongitude}}
                            onClick={this.onMarkerClick}
                            name={'Your current location'}
                        />
                        <InfoWindow
                            marker={this.state.activeMarker}
                            visible={this.state.showingInfoWindow}
                            onClose={this.onClose}
                        >
                            <div>
                                <h4>{this.state.selectedPlace.name}</h4>
                            </div>
                            
                        </InfoWindow>
                    </CurrentLocation>
                </div>
            </div>
        );
    };
}

function mapStateToProps(state){
    return state.user
  }

  export default GoogleApiWrapper({
    apiKey: REACT_APP_GOOGLE_API_KEY
}) (connect(mapStateToProps, {createRequest})(withRouter(RideRequestForm)));