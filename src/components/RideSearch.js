import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";


class RideSearch extends Component{
    constructor(props) {
        super(props)
        this.state = {
            firstDate: '',
            secondDate: '',
            location: '',
            numberOfRiders: 0
        }
    }

    searchRides = () => {
        this.props.history.push('/rider-dashboard/available-rides')
    }

    handleChange = e => {
        let { name, value } = e.target
        this.setState ({ [name]: value })
    }

    render(){
        let { firstDate, secondDate, location, numberOfRiders } = this.state
        let { user } = this.props;
        if(!user.loggedIn){
            return <Redirect to="/" />
        }

        return(
        
            <div>
                <header>
                    <h1>Find an available ride</h1>
                    <div>Dates</div>
                    <input onChange={this.handleChange} name="firstDate" value={firstDate} placeholder="08/31/19" />
                    <div>To</div>
                    <input onChange={this.handleChange} name="secondDate" value={secondDate} placeholder="09/30/19" />
                    <div>Location</div>
                    <input onChange={this.handleChange} name="location" value={location} placeholder="Lake Powell" />
                    <div>Number of Riders</div>
                    <input onChange={this.handleChange} type="number" name="numberOfRiders" value={numberOfRiders} placeholder="1" />
                    <button onClick={this.searchRides}>Find Ride</button> 
                </header>
            </div>
        );
    };
}

function mapStateToProps(state){
    return state.user
  }

  export default connect(mapStateToProps, null)(withRouter(RideSearch));