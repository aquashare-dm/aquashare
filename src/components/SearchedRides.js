import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios'
import "./coreStyling.css";
import "./dashboardStyling.css";
// import "./../reset.css"
import StripeCheckout from 'react-stripe-checkout'
import onClickOutside from 'react-onclickoutside'
import { reserveTubeSeat } from '../redux/ridesReducer'
import { toast } from 'react-toastify';

class SearchedRides extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: false,
            ridePrice: (20 + (+this.props.tier_id * 10)) * 100
        }

    }

    clickedRide = () => {
        let currentSelectedState = this.state.selected;
        this.setState({ selected: !currentSelectedState })
    }

    handleClickOutside = () => {
        if (this.state.selected === true) {
            this.clickedRide();
        }

    }
    Notify = () => {
        toast.info("Ride Reserved", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
        });
    }

    onToken = (token) => {
        let { locationLatitude, locationLongitude, radius } = this.props.rides.searchCriteria
        let { id } = this.props.user.user
        let { ride_id, ride_open_seats } = this.props
        let { ridePrice } = this.state
        let newTubeSeatCount = ride_open_seats - 1
        console.log(token)
        token.card = void 0
        // axios.post(`/api/payment/${userId}`, { token, ridePrice: this.state.ridePrice * 100, ride_id, newTubeSeatCount }).then(res => {
        //     console.log(res)
        this.props.reserveTubeSeat(token, ridePrice, id, ride_id, newTubeSeatCount, locationLatitude, locationLongitude, radius)
        this.Notify()
    }

    render() {

        let { ride_date, ride_location, ride_total_seats, ride_open_seats, ride_start_time, ride_end_time, driver_first_name, driver_last_name, boat_name, tier_id } = this.props;
        let { ridePrice } = this.state

        if (this.state.selected === false) {
            return (

                <section className="availableRideContainer" onClick={this.clickedRide}>
                    <div className="six wide column" style={{ marginLeft: "4%" }}>{ride_date}</div>
                    <div className="one wide column" style={{ marginLeft: "6%" }}>{ride_open_seats}</div>
                    <div className="one wide column" style={{ marginLeft: "13%" }}>{tier_id}</div>
                    <div className="eight wide column" style={{ overflowX: "auto", marginLeft: "9%" }}>{ride_location}</div>

                </section>

            );
        } else {
            return (
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
                        <div className="selectedRideRowContainer" style={{ marginTop: "8%" }}>
                            <div className="selectedRideParagraph">Tier: {tier_id}</div>
                            <div className="selectedRideParagraph">Start Time: {ride_start_time}</div>
                            <div className="selectedRideParagraph">End Time: {ride_end_time}</div>
                        </div>
                        <div className="selectedRideRowContainer" style={{ marginBottom: "5%" }}>
                            <div className="selectedRideParagraph">Location: {ride_location}</div>
                        </div>
                        <div className="ui labeled button" tabIndex="0">
                            <StripeCheckout
                                name='Place Order' //header
                                description='Confirm your payment information' //subtitle - beneath header
                                stripeKey={process.env.REACT_APP_PUBLIC_STRIPE} //public key not secret key
                                token={this.onToken} //fires the call back
                                amount={ridePrice} //this will be in cents
                                currency="USD"
                                // image={imageUrl} // the pop-in header image (default none)
                                // ComponentClass="div" //initial default button styling on block scope (defaults to span)
                                panelLabel="Submit Payment" //text on the submit button
                                locale="en" //locale or language (e.g. en=english, fr=french, zh=chinese)
                                allowRememberMe // "Remember Me" option (default true)
                                billingAddress={false}
                                shippingAddress={false} //you can collect their address
                                zipCode={false}
                            >
                                <button className="ui inverted blue button">RESERVE A SEAT</button>
                            </StripeCheckout>
                            <a className="ui basic label">
                                ${ridePrice / 100}
                            </a>
                        </div>
                    </div>


                    {/* <p>Location: {ride_location}</p>
                    <p>Total seats: {ride_total_seats}</p>
                    <p>Available seats: {ride_open_seats}</p>
                    <p>Start Time: {ride_start_time}</p>
                    <p>End Time: {ride_end_time}</p>
                    <p>Driver: {driver_first_name} {driver_last_name}</p>
                    <p>Boat Info</p>
                    <p>Tier</p>
                    <p>Pricing</p> */}
                    {/* <button onClick={this.buyRide} >Reserve Your Seat Now</button</div>> */}
                </section>
            )
        }

    }
}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps, { reserveTubeSeat })(onClickOutside(SearchedRides));