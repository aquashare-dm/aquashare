import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { createBoat } from '../redux/boatReducer.js'


class BoatRegistrationForm extends Component {
    constructor() {
        super()
        this.state = {
            user: {},
            boatName: '',
            tierId: '',
            boatDescription: '',
            boatLicense: '',
            boatRegistration: '',
            boatMake: '',
            boatModel: '',
            boatSeatNum: '',
            boatImageOne: '',
            boatImageTwo: ''
        }
    }

    registerAccount = () => {
        let { user } = this.props
        console.log('Account information sent to DB to be updated!')
        user.registered = true
        this.props.history.push('/driver-dashboard')
    }

    handleChange = (event) => {
        let { name, value } = event.target;
        this.setState({
            [name]: value
        })
    };

    createBoat = (e) => {
        e.preventDefault()
        let { boatName, tierId, boatDescription, boatLicense, boatRegistration, boatMake, boatModel,
        boatSeatNum, boatImageOne, boatImageTwo } = this.state
        this.props.createBoat(boatName, tierId, boatDescription, boatLicense, boatRegistration, boatMake, boatModel,
            +boatSeatNum, boatImageOne, boatImageTwo, this.props.user.driverId)

    }
    


    render() {

        let { user } = this.props;
        if (!user.loggedIn) {
            return <Redirect to="/" />
        }

        return (

            <div>
                <h1>{this.props.user.riderUsername}</h1>
                <div>
                    Image
                </div>
                <form>
                    <input type="text" name="boatName" onChange={this.handleChange} value={this.state.boatName} placeholder="Boat Name" />
                    <input type="text" name="tierId" onChange={this.handleChange} value={this.state.tierId} placeholder="Tier Id" />
                    <input type="text" name="boatDescription" onChange={this.handleChange} value={this.state.boatDescription} placeholder="Boat Description" />
                    <input type="text" name="boatLicense" onChange={this.handleChange} value={this.state.boatLicense} placeholder="Boat License Number" />
                    <input type="text" name="boatRegistration" onChange={this.handleChange} value={this.state.boatRegistration} placeholder="Boat Registration Number" />
                    <input type="text" name="boatMake" onChange={this.handleChange} value={this.state.boatMake} placeholder="Boat Make" />
                    <input type="text" name="boatModel" onChange={this.handleChange} value={this.state.boatModel} placeholder="Boat Model" />
                    <input type="text" name="boatSeatNum" onChange={this.handleChange} value={this.state.boatSeatNum} placeholder="Number of Boat Seats" />
                    <input type="text" name="boatImageOne" onChange={this.handleChange} value={this.state.boatImageOne} placeholder="Boat Image 1" />
                    <input type="text" name="boatImageTwo" onChange={this.handleChange} value={this.state.boatImageTwo} placeholder="Boat Image 2" />
                    <button onClick={(e) => { this.createBoat(e) }}>Submit</button>
                </form>
            </div>
        );
    };
}

function mapStateToProps(state) {
    return state.user
}

export default connect(mapStateToProps, {createBoat})(withRouter(BoatRegistrationForm));