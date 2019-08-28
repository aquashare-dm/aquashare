import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./coreStyling.css";
import "./dashboardStyling.css";
import "./../reset.css"
import onClickOutside from 'react-onclickoutside'

class SearchedRides extends Component {
    constructor(props){
        super(props);

        this.state={
            selected: false
        }
        
    }

    buyRide = () => {
        console.log('Buy a ride button triggered!')
    }

    clickedRide = () => {
        let currentSelectedState = this.state.selected;
        this.setState({selected: !currentSelectedState})
    }

    handleClickOutside = () => {
        if(this.state.selected === true){
            this.clickedRide();
        }
        
    }

    render() {

        let { ride_id, ride_date, ride_location, ride_total_seats, ride_open_seats, ride_start_time, ride_end_time, driver_id, tier_id, driver_first_name, driver_last_name, boat_name } = this.props;
        //Calculate ride price to show
        let ridePrice = 20 + (tier_id * 10);

        if(this.state.selected === false){
            return (
            
                <section className="availableRideContainer" onClick={this.clickedRide}>
                    <div className="six wide column" style={{marginLeft: "4%"}}>{ride_date}</div>
                    <div className="one wide column" style={{marginLeft: "6%"}}>{ride_open_seats}</div>
                    <div className="one wide column" style={{marginLeft: "13%"}}>{tier_id}</div>
                    <div className="eight wide column" style={{overflowX: "auto", marginLeft: "9%"}}>{ride_location}</div>

                </section>
    
            );
        }else{
            return(
                <section className="selectedRideContainer" onClick={this.clickedRide}>
                    <div className="selectedRideWhiteBox">
                        <h2 className="selectedRideH2">{boat_name}</h2>
                        <div className="selectedRideRowContainer">
                            <div className="selectedRideParagraph">Location: {ride_location}</div>
                        </div>
                        <div className="selectedRideRowContainer">
                            <div className="selectedRideParagraph">Ride Date: {ride_date}</div>
                            <div className="selectedRideParagraph">Open Seats: {ride_open_seats}</div>
                        </div>
                        <div className="selectedRideRowContainer" >
                            <div className="selectedRideParagraph" >Driver: {driver_first_name} {driver_last_name}</div>
                            <div className="selectedRideParagraph">Total Seats: {ride_total_seats}</div>
                        </div>
                        <div className="selectedRideRowContainer" style={{marginTop: "8%"}}>
                            <div className="selectedRideParagraph">Tier: {tier_id}</div>
                            <div className="selectedRideParagraph">Start Time: {ride_start_time}</div>
                            <div className="selectedRideParagraph">End Time: {ride_end_time}</div>
                        </div>
                        <div className="selectedRideRowContainer" style={{marginBottom: "5%"}}>
                            <div className="selectedRideParagraph">Location: {ride_location}</div>
                        </div>
                        <div className="ui labeled button" tabIndex="0">
                            <div className="ui inverted blue button" >
                                PURCHASE
                            </div>
                            <a className="ui basic label">
                                ${ridePrice}
                            </a>
                        </div>
                    </div>

                </section>
            )
        }
        
    }
}

export default connect( null, null)(onClickOutside(SearchedRides));