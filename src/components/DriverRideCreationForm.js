import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import Geocode from "react-geocode";
import CurrentLocation from "./RideSearch/Map.js";
import { createRide } from '../redux/ridesReducer'

require("dotenv").config({ path: __dirname + "/../../.env" });
const { REACT_APP_GOOGLE_API_KEY } = process.env;
//Geocoding Functionality
Geocode.setApiKey(REACT_APP_GOOGLE_API_KEY);

class DriverRideCreationForm extends Component {
    constructor() {
        super();
        this.state = {
            driverId: '',
            date: '',
            location: '',
            locationLatitude: "",
            locationLongitude: "",
            totalBoatSeatNum: '',
            openBoatSeats: '',
            startTime: '',
            endTime: '',
            tierId: '',

            //GoogleMaps States
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},

            //UI States
            inInputBox: false
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (document.activeElement.id === "location-address-input" && this.state.inInputBox === false) {
            this.setState({ inInputBox: true })
        }

        //Check if focus was removed from input box
        if (document.activeElement.id !== "location-address-input" && this.state.inInputBox === true) {
            this.setState({ inInputBox: false });
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

    createRide = async (e) => {
        e.preventDefault()
        await this.submitAddressForGeocoding();
        console.log("this.props is ", this.props);
        let { date, location, locationLatitude, locationLongitude, openBoatSeats, startTime, endTime } = this.state;
        let correctedStartTime = this.correctTimeForDatabase(startTime)
        let correctedEndTime = this.correctTimeForDatabase(endTime)
        await this.props.createRide(this.props.user.id, date, location, locationLatitude, locationLongitude, openBoatSeats, correctedStartTime, correctedEndTime);
        this.props.history.push('/driver-dashboard/created-rides');
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

    onClose = () => {
        if (this.state.showingInfoWindow) {
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

    render() {

        let { user } = this.props;
        if (!user.loggedIn) {
            return <Redirect to="/" />
        }
        return (

            <div>

                <header>
                    <button onClick={this.goBack}>{`<Back`}</button>
                    <h1>Create a Ride</h1>
                </header>
                <form>
                    <input type="date" name="date" onChange={this.handleChange} value={this.state.requestDate} placeholder="Date" />
                    <input type="text" id="location-address-input" name="location" onChange={this.handleChange} value={this.state.location} placeholder="Location" />
                    {/* <input type="text" name="totalBoatSeatNum" onChange={this.handleChange} value={this.state.totalBoatSeatNum} placeholder="Number of Seats" /> */}
                    <input type="number" name="openBoatSeats" onChange={this.handleChange} value={this.state.openBoatSeats} placeholder="Available Seats on Tube" />
                    {/* <input type="text" name="tierId" onChange={this.handleChange} value={this.state.tierId} placeholder="Requested Tier" /> */}
                    <input type="time" step="360000" name="startTime" onChange={this.handleChange} value={this.state.startTime} placeholder="Start Time" />
                    <input type="time" step="360000" name="endTime" onChange={this.handleChange} value={this.state.endTime} placeholder="End Time" />

                    <button onClick={(e) => { this.createRide(e) }}>Create Ride</button>
                </form>

                <div className="mapRightCont" style={{ marginTop: "50px" }}>
                    <CurrentLocation centerAroundCurrentLocation width={"500px"} height={"300px"} google={this.props.google} lat={this.state.locationLatitude} lng={this.state.locationLongitude} >
                        <Marker
                            position={{ lat: this.state.locationLatitude, lng: this.state.locationLongitude }}
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

function mapStateToProps(state) {
    return state.user
}

export default GoogleApiWrapper({
    apiKey: REACT_APP_GOOGLE_API_KEY
})(connect(mapStateToProps, { createRide })(withRouter(DriverRideCreationForm)));