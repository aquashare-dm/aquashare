import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { saveSearchCriteria, getRides } from '../redux/ridesReducer';
import { GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import Geocode from "react-geocode";
import CurrentLocation from "./RideSearch/Map.js";
import Select from "react-select";
import "./coreStyling.css";
import "./dashboardStyling.css";

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
    handleDropDownChange = (event) => {
        let {name, value} = event;
        this.setState({
            [name]: value
        })
    }

    render(){
        let { firstDate, secondDate, location, numberOfRiders, radius } = this.state
        let { user } = this.props;

        //Drop Down Selection Variables
        let radiusOptions = [
            {label:"10 Miles", value: 10, name: "radius"},
            {label:"25 Miles", value: 25, name: "radius"},
            {label:"50 Miles", value: 50, name: "radius"},
            {label:"100 Miles", value: 100, name: "radius"},
            {label:"200 Miles", value: 200, name: "radius"}
        ];
        let seatOptions = [
            {label:"1 Seat", value: 1, name: "numberOfRiders"},
            {label:"2 Seats", value: 2, name: "numberOfRiders"},
            {label:"3 Seats", value: 3, name: "numberOfRiders"},
            {label:"4 Seats", value: 4, name: "numberOfRiders"},
            {label:"5 Seats", value: 5, name: "numberOfRiders"},
            {label:"6 Seats", value: 6, name: "numberOfRiders"},
            {label:"7 Seats", value: 7, name: "numberOfRiders"},
            {label:"8 Seats", value: 8, name: "numberOfRiders"},
            {label:"9 Seats", value: 9, name: "numberOfRiders"},
            {label:"10 Seats", value: 10, name: "numberOfRiders"},
        ];

        if(!user.loggedIn){
            return <Redirect to="/" />
        }
        return(
        
            <div>

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
                        <h2 className="mapPageContainerHeader">FIND A RIDE</h2>
                        <div className="ui labeled input labeledInputBox" style={{width: "100%"}}>
                            <div className="ui label">Start Date</div>
                            <input onChange={this.handleChange} type="date" name="firstDate" value={firstDate} placeholder="08/31/2019" />
                        </div>
                        <div className="ui labeled input labeledInputBox" style={{width: "100%"}}>
                            <div className="ui label">End Date</div>
                            <input onChange={this.handleChange} type="date" name="secondDate" value={secondDate} placeholder="09/30/2019" />
                        </div>
                        <div className="ui labeled input labeledInputBox" style={{width: "100%"}}>
                            <div className="ui label">Location</div>
                            <input onChange={this.handleChange} id="location-address-input" name="location" value={location} placeholder="Lake Powell, UT" />
                        </div>
                        <div className="rowContainerSpaceBetween">
                            <Select className="ui search dropdown dropdownBoxContainer" placeholder="Mile Radius" label="radius" options={radiusOptions} onChange={this.handleDropDownChange}></Select>
                            <Select className="ui search dropdown dropdownBoxContainer" placeholder="Seats Needed" label="numberOfRiders" options={seatOptions} onChange={this.handleDropDownChange}></Select>
                        </div>
                        <button className="ui inverted blue button" onClick={this.searchRides}>FIND RIDE</button> 
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
}) (connect(mapStateToProps, { saveSearchCriteria, getRides })(withRouter(RideSearch)));
