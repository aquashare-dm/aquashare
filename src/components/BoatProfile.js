import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { editBoat } from '../redux/boatReducer'
import UploadImage from './UploadImage'

class BoatProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {},
            boatId: this.props.boat.boat.boatId,
            newBoatName: this.props.boat.boat.boatName,
            newBoatDescription: this.props.boat.boat.boatDescription,
            newBoatLicense: this.props.boat.boat.boatLicense,
            newBoatRegistration: this.props.boat.boat.boatRegistration,
            newBoatMake: this.props.boat.boat.boatMake,
            newBoatModel: this.props.boat.boat.boatModel,
            newBoatSeatNumber: this.props.boat.boat.boatSeatNumber,
            newBoatImageOne: this.props.boat.boat.boatImageOne,
            newBoatImageTwo: this.props.boat.boat.boatImageTwo,
        }
    }

    handleChange = (event) => {
        let { name, value } = event.target;
        this.setState({
            [name]: value
        })
    };

    handleFormSubmit = (e) => {
        let { newBoatName, newBoatDescription, newBoatLicense, newBoatRegistration, newBoatMake, newBoatModel, newBoatSeatNumber, newBoatImageOne, newBoatImageTwo } = this.state
        this.props.editBoat(this.props.boat.boat.boatId, newBoatName, newBoatDescription, newBoatLicense, newBoatRegistration, newBoatMake, newBoatModel, newBoatSeatNumber, newBoatImageOne, newBoatImageTwo)
    }

    goBack = () => {
        this.props.history.goBack()
    }

    handleUploadedImage = (imgUrl) => {
        this.setState({ editImage: true, boatImageOne: imgUrl, boatImageTwo: imgUrl })
    }

    flipEdit = () => this.setState({ editing: !this.state.editing })

    render() {
        let { boat } = this.props.boat;
        if (!this.props.user.user.loggedIn) {
            return <Redirect to="/" />
        }
        let { newBoatName, newBoatDescription, newBoatLicense, newBoatRegistration, newBoatMake, newBoatModel, newBoatSeatNumber, newBoatImageOne, newBoatImageTwo } = this.state
        return (
            <div>
                {this.state.editing ? (
                    <div>
                        <h3>Upload New Images</h3>
                        <div>
                            <UploadImage action={this.handleUploadedImage} />
                        </div>
                        <div>
                            <UploadImage action={this.handleUploadedImage} />
                        </div>
                        <input
                            value={newBoatName}
                            onChange={this.handleChange}
                            name="newBoatName"
                        />
                        <input
                            value={newBoatDescription}
                            onChange={this.handleChange}
                            name="newBoatDescription"
                        />
                        <input
                            value={newBoatLicense}
                            onChange={this.handleChange}
                            name="newBoatLicense"
                        />
                        <input
                            value={newBoatRegistration}
                            onChange={this.handleChange}
                            name="newBoatRegistration"
                        />
                        <input
                            value={newBoatMake}
                            onChange={this.handleChange}
                            name="newBoatMake"
                        />
                        <input
                            value={newBoatModel}
                            onChange={this.handleChange}
                            name="newBoatModel"
                        />
                        <input
                            value={newBoatSeatNumber}
                            onChange={this.handleChange}
                            name="newBoatSeatNumber"
                        />
                        <input
                            value={newBoatImageOne}
                            onChange={this.handleChange}
                            name="newBoatImageOne"
                        />
                        <input
                            value={newBoatImageTwo}
                            onChange={this.handleChange}
                            name="newBoatImageTwo"
                        />
                        <div>
                            <button onClick={() => {
                                this.handleFormSubmit()
                                this.flipEdit()
                            }}>Save</button>
                            <button onClick={this.flipEdit}>Cancel</button>
                        </div>
                    </div>
                ) : (
                        <div>
                            <h3>Boat Name: {boat.boatName}</h3>
                            <h3>Description: {boat.boatDescription}</h3>
                            <h1>License Number: {boat.boatLicense}</h1>
                            <h3>Boat Registration Number:{boat.boatRegistration} </h3>
                            <h3>Boat Make: {boat.boatMake}</h3>
                            <h3>Boat Model: {boat.boatModel}</h3>
                            <h3>Number of Seats: {boat.boatSeatNumber}</h3>
                            <h3>{boat.boatImageOne}</h3>
                            <h3>{boat.boatImageTwo}</h3>
                            <div>
                                <button onClick={this.flipEdit}>Edit</button>
                            </div>
                        </div>
                    )}

            </div>
        );
    };
}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps, { editBoat })(withRouter(BoatProfile));