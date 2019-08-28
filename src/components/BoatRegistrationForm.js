import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { createBoat, connectBoatIdToDriver } from '../redux/boatReducer.js'
import UploadImage from './UploadImage'
import { setTimeout } from "timers";


class BoatRegistrationForm extends Component {
    constructor() {
        super()
        this.state = {
            boatName: '',
            tierId: 0,
            boatDescription: '',
            boatLicense: '',
            boatRegistration: '',
            boatMake: '',
            boatModel: '',
            boatSeatNum: 0,
            tubeSeatNum: 0,
            boatImage: '',
        }
    }

    handleChange = (event) => {
        let { name, value } = event.target;
        this.setState({
            [name]: value
        })
    };

    createBoat = (e) => {
        console.log('slllllslslslslslslslslsslslsl', this.props.user)
        e.preventDefault()
        let { boatName, tierId, boatDescription, boatLicense, boatRegistration, boatMake, boatModel,
            boatSeatNum, tubeSeatNum, boatImage } = this.state
        this.props.createBoat(boatName, tierId, boatDescription, boatLicense, boatRegistration, boatMake, boatModel,
            boatSeatNum, tubeSeatNum, boatImage, this.props.user.id)
        this.props.history.push("/driver-dashboard/create-a-ride")
    }

    handleImage = (imgUrl) => {
        this.setState({ boatImage: imgUrl })
    }

    render() {
        let { user } = this.props;

        return (

            <div>
                <h1>{user.riderUsername}</h1>
                <div>
                    <UploadImage action={this.props.handleUploadedImage} handleImage={this.handleImage} newImageUrl={this.state.boatImage} />
                </div>
                <form>
                    <input type="text" name="boatName" onChange={this.handleChange} value={this.state.boatName} placeholder="Boat Name" />
                    <input type="number" name="tierId" onChange={this.handleChange} value={this.state.tierId} placeholder="Tier" />
                    <input type="text" name="boatDescription" onChange={this.handleChange} value={this.state.boatDescription} placeholder="Boat Description" />
                    <input type="text" name="boatLicense" onChange={this.handleChange} value={this.state.boatLicense} placeholder="Boat License Number" />
                    <input type="text" name="boatRegistration" onChange={this.handleChange} value={this.state.boatRegistration} placeholder="Boat Registration Number" />
                    <input type="text" name="boatMake" onChange={this.handleChange} value={this.state.boatMake} placeholder="Boat Make" />
                    <input type="text" name="boatModel" onChange={this.handleChange} value={this.state.boatModel} placeholder="Boat Model" />
                    <input type="number" name="boatSeatNum" onChange={this.handleChange} value={this.state.boatSeatNum} placeholder="Seats" />
                    <input type="number" name="tubeSeatNum" onChange={this.handleChange} value={this.state.tubeSeatNum} placeholder="Tube Seats" />
                    <button onClick={(e) => { this.createBoat(e) }}>Submit</button>
                </form>
            </div>
        );
    };
}

function mapStateToProps(state) {
    return state.user
}

export default connect(mapStateToProps, { createBoat })(withRouter(BoatRegistrationForm));
