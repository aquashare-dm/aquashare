import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { saveSearchCriteria, getRides } from '../redux/ridesReducer';
import { GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import Geocode from "react-geocode";
import CurrentLocation from "./RideSearch/Map.js";

require("dotenv").config({path: __dirname + "/../../.env"});
const {REACT_APP_GOOGLE_API_KEY} = process.env;
//Geocoding Functionality
Geocode.setApiKey(REACT_APP_GOOGLE_API_KEY);

class RideSearch extends Component{
    constructor(props) {
        super(props)
        this.state = {
            firstDate: '',
            secondDate: '',
            location: '',
            locationLatitude: "",
            locationLongitude: "",
            numberOfRiders: 0,
            radius: 50,

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

    searchRides = async () => {
        await this.submitAddressForGeocoding();
        let { firstDate, secondDate, location, locationLatitude, locationLongitude, numberOfRiders, radius } = this.state
        await this.props.saveSearchCriteria(firstDate, secondDate, location, locationLatitude, locationLongitude, numberOfRiders, radius)
        await this.props.getRides( locationLatitude, locationLongitude, numberOfRiders, radius)
        this.props.history.push('/rider-dashboard/available-rides')
    }

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

    handleChange = e => {
        let { name, value } = e.target
        this.setState ({ [name]: value })
    }

    render(){
        let { firstDate, secondDate, location, numberOfRiders, radius } = this.state
        let { user } = this.props;
        if(!user.loggedIn){
            return <Redirect to="/" />
        }

        return(
        
            <div>

                <div className="mapRightCont" id="google-maps-container" style={{visibility: !this.props.navMenuOpen?"visible":"hidden"}}>
                    <CurrentLocation centerAroundCurrentLocation width={"100vw"} height={"300px"} google={this.props.google} lat={this.state.locationLatitude} lng={this.state.locationLongitude}>
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
                <header>
                    

                    <h1>Find an available ride</h1>
                    <div>Dates</div>
                    <input onChange={this.handleChange} type="date" name="firstDate" value={firstDate} placeholder="08/31/2019" />
                    <div>To</div>
                    <input onChange={this.handleChange} type="date" name="secondDate" value={secondDate} placeholder="09/30/2019" />
                    <div>Location</div>
                    <input onChange={this.handleChange} id="location-address-input" name="location" value={location} placeholder="Lake Powell, UT" />
                    <div>within</div>
                    <input onChange={this.handleChange} type="number" min="0" name="radius" value={radius} placeholder="50" />
                    <div>miles</div>
                    <div>Number of Riders</div>
                    <input onChange={this.handleChange} type="number" min="0" name="numberOfRiders" value={numberOfRiders} placeholder="1" />
                    <button onClick={this.searchRides}>Find Ride</button> 
                </header>
            </div>
        );
    };
}

function mapStateToProps(state){
    return state.user
  }

  export default GoogleApiWrapper({
    apiKey: REACT_APP_GOOGLE_API_KEY
}) (connect(mapStateToProps, { saveSearchCriteria, getRides })(withRouter(RideSearch)));
