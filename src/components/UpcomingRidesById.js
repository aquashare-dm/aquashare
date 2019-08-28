import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./coreStyling.css";
import "./dashboardStyling.css";
import onClickOutside from 'react-onclickoutside'

class UpcomingRidesById extends Component {
    constructor(props){
        super(props);

        this.state={
            selected: false
        }
        
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
                <section className="selectedRideContainer" style={{height: "30vh"}} onClick={this.clickedRide}>
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
                        {/* <div className="ui labeled button" tabIndex="0">
                            <div className="ui inverted blue button" >
                                PURCHASE
                            </div>
                            <a className="ui basic label">
                                ${ridePrice}
                            </a>
                        </div> */}
                    </div>

                </section>
            )
        }
        // return (
        //     <div style={{backgroundColor: 'yellow', margin: '10px'}}>
        //         <p>{ride_id}</p>
        //         <p>{ride_location}</p>
        //         <p>{ride_open_seats}</p>
        //         <p>{ride_start_time}</p>
        //         <p>{ride_end_time}</p>
        //         <p>Driver: {driver_first_name} {driver_last_name}</p>
        //         <p>Boat Info: {boat_name}</p>
        //         <p>Tier: {tier_id}</p>
        //         <p>Pricing</p>
        //     </div>
        // );
    }
}

export default connect( null, null)(onClickOutside(UpcomingRidesById));