import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { editBoat, getBoatInfo } from '../redux/boatReducer'
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
            newBoatRegistration: this.props.boat.boatboatRegistration,
            newBoatMake: this.props.boat.boat.boatMake,
            newBoatModel: this.props.boat.boat.boatModel,
            newBoatSeatNumber: this.props.boat.boat.boatSeatNumber,
            newBoatImageOne: this.props.boat.boat.boatImageOne,
        }
    }

    componentDidMount() {
        this.props.getBoatInfo(this.props.user.user.id)
    }

    handleChange = (event) => {
        let { name, value } = event.target;
        this.setState({
            [name]: value
        })
    };

    handleFormSubmit = (e) => {
        let { newBoatName, newBoatDescription, newBoatLicense, newBoatRegistration, newBoatMake, newBoatModel, newBoatSeatNumber, newBoatImageOne } = this.state
        console.log("this.props in Boat Profile", this.props)
        this.props.editBoat(this.props.user.user.id, newBoatName, newBoatDescription, newBoatLicense, newBoatRegistration, newBoatMake, newBoatModel, newBoatSeatNumber, newBoatImageOne)
    }

    goBack = () => {
        this.props.history.goBack()
    }

    handleUploadedImage = (imgUrl) => {
        this.setState({ editImage: true, boatImageOne: imgUrl })
    }

    flipEdit = () => this.setState({ editing: !this.state.editing })

    handleImage = (imageUrl) => {
        this.setState({ newBoatImageOne: imageUrl })
    }

    render() {
        let { boat } = this.props.boat;
        let { newBoatName, newBoatDescription, newBoatLicense, newBoatRegistration, newBoatMake, newBoatModel, newBoatSeatNumber, newBoatImageOne } = this.state
        return (
            <div>
                {this.state.editing ? (
                    <div>
                        <h3>Upload New Images</h3>
                        <div>
                            <UploadImage action={this.props.handleImageUpload} handleImage={this.handleImage} newImageUrl={this.state.newBoatImageOne} />
                        </div>
                        <input
                            value={newBoatName}
                            onChange={this.handleChange}
                            name="newBoatName"
                            placeholder="Boat Name"
                        />
                        <input
                            value={newBoatDescription}
                            onChange={this.handleChange}
                            name="newBoatDescription"
                            placeholder="Boat Description"
                        />
                        <input
                            value={newBoatLicense}
                            onChange={this.handleChange}
                            name="newBoatLicense"
                            placeholder="License Number"
                        />
                        <input
                            value={newBoatRegistration}
                            onChange={this.handleChange}
                            name="newBoatRegistration"
                            placeholder="Registration Number"
                        />
                        <input
                            value={newBoatMake}
                            onChange={this.handleChange}
                            name="newBoatMake"
                            placeholder="Make"
                        />
                        <input
                            value={newBoatModel}
                            onChange={this.handleChange}
                            name="newBoatModel"
                            placeholder="Model"
                        />
                        <input
                            type="number"
                            value={+newBoatSeatNumber}
                            onChange={this.handleChange}
                            name="newBoatSeatNumber"
                            placeholder="Seat Number"
                        />
                        {/* <input
                            value={newBoatImageOne}
                            onChange={this.handleChange}
                            name="newBoatImageOne"
                            placeholder="Image"
                        /> */}
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
                            <img src={`${boat.boatImageOne}`} />
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

export default connect(mapStateToProps, { editBoat, getBoatInfo })(withRouter(BoatProfile));