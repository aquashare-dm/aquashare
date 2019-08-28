import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import Geocode from "react-geocode";
import CurrentLocation from "./RideSearch/Map.js";
import { createRequest } from '../redux/requestReducer';
import Select from "react-select";
import "./coreStyling.css";
import "./dashboardStyling.css";

require("dotenv").config({path: __dirname + "/../../.env"});
const {REACT_APP_GOOGLE_API_KEY} = process.env;
//Geocoding Functionality
Geocode.setApiKey(REACT_APP_GOOGLE_API_KEY);

class RideRequestForm extends Component{
    constructor(props){
        super(props);
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

    handleChange = e => {
        let { name, value } = e.target
        this.setState ({ [name]: value })
    }
    handleDropDownChange = (event) => {
        let {name, value} = event;
        this.setState({
            [name]: value
        })
    }

    render(){
        
        let { requestDate, location, requestSeatNum, tierId, requestStartTime, requestEndTime, requesterCell } = this.state
        let { user } = this.props;
        if(!user.loggedIn){
            return <Redirect to="/" />
        }

        //Drop Down Selection Variables
        let radiusOptions = [
            {label:"Tier 1", value: 1, name: "tierId"},
            {label:"Tier 2", value: 2, name: "tierId"},
            {label:"Tier 3", value: 3, name: "tierId"},
            {label:"Tier 4", value: 4, name: "tierId"}
        ];
        let seatOptions = [
            {label:"1 Seat", value: 1, name: "requestSeatNum"},
            {label:"2 Seats", value: 2, name: "requestSeatNum"},
            {label:"3 Seats", value: 3, name: "requestSeatNum"},
            {label:"4 Seats", value: 4, name: "requestSeatNum"},
            {label:"5 Seats", value: 5, name: "requestSeatNum"},
            {label:"6 Seats", value: 6, name: "requestSeatNum"},
            {label:"7 Seats", value: 7, name: "requestSeatNum"},
            {label:"8 Seats", value: 8, name: "requestSeatNum"},
            {label:"9 Seats", value: 9, name: "requestSeatNum"},
            {label:"10 Seats", value: 10, name: "requestSeatNum"},
        ];

        return(
    
            <div className="mainAppWindow">

                <div className="mapRightCont" id="google-maps-container" style={{visibility: !this.props.navMenuOpen?"visible":"hidden"}}>
                    <CurrentLocation centerAroundCurrentLocation width={"100vw"} height={"40vh"} google={this.props.google} lat={this.state.locationLatitude} lng={this.state.locationLongitude}>
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
                
                <section className="mapPageBottomContainer">
                    <div className="mapPageBottomContainerWhiteBox" style={{visibility: !this.props.navMenuOpen?"visible":"hidden"}}>
                        <h2 className="mapPageContainerHeader">REQUEST A RIDE</h2>
                        <div className="ui labeled input labeledInputBox" style={{width: "100%"}}>
                            <div className="ui label">Ride Date</div>
                            <input onChange={this.handleChange} type="date" name="requestDate" value={requestDate} placeholder="08/31/2019" />
                        </div>
                        <div className="ui labeled input labeledInputBox" style={{width: "100%"}}>
                            <div className="ui label">Location</div>
                            <input onChange={this.handleChange} type="date" name="location" value={location} placeholder="Lake Powell, UT." />
                        </div>
                        <div className="ui labeled input labeledInputBox" style={{width: "100%"}}>
                            <div className="ui label">Start Time</div>
                            <input onChange={this.handleChange} id="location-address-input" name="requestStartTime" value={requestStartTime} placeholder="8:00" />
                        </div>
                        <div className="ui labeled input labeledInputBox" style={{width: "100%"}}>
                            <div className="ui label">End Time</div>
                            <input onChange={this.handleChange} id="location-address-input" name="requestEndTime" value={requestEndTime} placeholder="11:00" />
                        </div>
                        <div className="rowContainerSpaceBetween">
                            <Select className="ui search dropdown dropdownBoxContainer" placeholder="Seats Requested" label="requestSeatNum" options={requestSeatNum} onChange={this.handleDropDownChange}></Select>
                            <Select className="ui search dropdown dropdownBoxContainer" placeholder="Tier Desired" label="tierId" options={tierId} onChange={this.handleDropDownChange}></Select>
                        </div>
                        <div className="ui labeled input labeledInputBox" style={{width: "100%"}}>
                            <div className="ui label">Contact Number</div>
                            <input onChange={this.handleChange} id="location-address-input" name="requesterCell" value={requesterCell} placeholder="5005005000" />
                        </div>
                        <div className="labeledInputBox">
                            <button className="ui inverted blue button" onClick={this.searchRides}>REQUEST RIDE</button> 
                        </div>
                        
                    </div>
                </section>
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