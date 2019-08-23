import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { editDriverProfile } from '../redux/userReducer'
import UploadImage from './UploadImage'
import BoatProfile from './BoatProfile'

class DriverProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {},
            newDriverImage: this.props.user.driverImage,
            driverRating: this.props.user.driverRating,
            // newDriverUsername: this.props.user.driverUsername,
            newDriverFirst: this.props.user.driverFirst,
            newDriverLast: this.props.user.driverLast,
            newDriverEmail: this.props.user.driverEmail,
            newDriverLicense: this.props.user.driverLicense,
            editing: false,
            editImage: false
        }
    }

    handleChange = (event) => {
        let { name, value } = event.target;
        this.setState({
            [name]: value
        })
    };

    handleFormSubmit = (e) => {
        let { newDriverEmail, newDriverFirst, newDriverLast, newDriverImage, newDriverLicense } = this.state
        this.props.editRiderProfile(this.props.user.riderUsername, newDriverEmail, newDriverFirst, newDriverLast, newDriverImage, newDriverLicense)
    }

    goBack = () => {
        this.props.history.goBack()
    }

    handleUploadedImage = (imgUrl) => {
        this.setState({ editImage: true, driverImage: imgUrl })
    }

    flipEdit = () => this.setState({ editing: !this.state.editing })

    render() {
        let { user } = this.props;
        if (!user.loggedIn) {
            return <Redirect to="/" />
        }
        //
        let { newDriverImage, newDriverUsername, newDriverFirst, newDriverLast, newDriverEmail, newDriverLicense } = this.state
        return (
            <div>
                {this.state.editing ? (
                    <div>
                        <h3>Upload New Image</h3>
                        <div>
                            <UploadImage action={this.handleUploadedImage} />
                        </div>
                        <input
                            value={newDriverFirst}
                            onChange={this.handleChange}
                            name="newDriverFirst"
                        />
                        <input
                            value={newDriverLast}
                            onChange={this.handleChange}
                            name="newDriverLast"
                        />
                        <input
                            value={newDriverEmail}
                            onChange={this.handleChange}
                            name="newDriverEmail"
                        />
                        <input
                            value={newDriverLicense}
                            onChange={this.handleChange}
                            name="newDriverLicense"
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
                            <h3>{this.props.user.driverImage}</h3>
                            <h3>{this.props.user.driverRating}</h3>
                            <h1>{this.props.user.driverUsername}</h1>
                            <h3>{this.props.user.driverFirst} {this.props.user.DriverLast}</h3>
                            <h3>{this.props.user.driverEmail}</h3>
                            <h3>{this.props.user.driverLicense}</h3>
                            <div>
                                <button onClick={this.flipEdit}>Edit</button>
                            </div>
                        </div>
                    )}
                <BoatProfile />

            </div>
        );
    };
}

function mapStateToProps(state) {
    return state.user
}

export default connect(mapStateToProps, { editDriverProfile })(withRouter(DriverProfile));