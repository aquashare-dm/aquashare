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
            boatId: this.props.boat.boatId,
            newBoatName: this.props.boat.boatName,
            newBoatDescription: this.props.boat.boatDescription,
            newBoatLicense: this.props.boat.boatLicense,
            newBoatRegistration: this.props.boat.boatRegistration,
            newBoatMake: this.props.boat.boatMake,
            newBoatModel: this.props.boat.boatModel,
            newBoatSeatNumber: this.props.boat.boatSeatNumber,
            newBoatImageOne: this.props.boat.boatImageOne,
            newBoatImageTwo: this.props.boat.boatImageTwo,
            // driverId: this.props.boat.driverId
        }
    } d

    handleChange = (event) => {
        let { name, value } = event.target;
        this.setState({
            [name]: value
        })
    };

    handleFormSubmit = (e) => {
        let { boatId, newBoatName, newBoatDescription, newBoatLicense, newBoatRegistration, newBoatMake, newBoatModel, newBoatSeatNumber, newBoatImageOne, newBoatImageTwo } = this.state
        this.props.editRiderProfile(this.props.boat.boatId, newBoatName, newBoatDescription, newBoatLicense, newBoatRegistration, newBoatMake, newBoatModel, newBoatSeatNumber, newBoatImageOne, newBoatImageTwo)
    }

    goBack = () => {
        this.props.history.goBack()
    }

    handleUploadedImage = (imgUrl) => {
        this.setState({ editImage: true, boatImageOne: imgUrl, boatImageTwo: imgUrl })
    }

    flipEdit = () => this.setState({ editing: !this.state.editing })

    render() {
        let { boat } = this.props;
        if (!user.loggedIn) {
            return <Redirect to="/" />
        }
        let { newBoatName, newBoatDescription, newBoatLicense, newBoatRegistration, newBoatMake, newBoatModel, newBoatSeatNumber, newBoatImageOne, newBoatImageTwo } = this.state
        return (
            <div>
                {this.state.editing ? (
                    <div>
                        <h3>Upload New Image</h3>
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
                            <h3>{this.props.boat.boatName}</h3>
                            <h3>{this.props.boat.boatDescription}</h3>
                            <h1>{this.props.boat.boatLicense}</h1>
                            <h3>{this.props.boat.boatRegistration} </h3>
                            <h3>{this.props.boat.boatMake}</h3>
                            <h3>{this.props.boat.boatModel}</h3>
                            <h3>{this.props.boat.boatSeatNumber}</h3>
                            <h3>{this.props.boat.boatImageOne}</h3>
                            <h3>{this.props.boat.boatImageTwo}</h3>
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
    return state.boat
}

export default connect(mapStateToProps, { editBoat })(withRouter(BoatProfile));