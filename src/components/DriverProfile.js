import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { editDriverProfile } from '../redux/userReducer'
import UploadImage from './UploadImage'
import BoatProfile from './BoatProfile'
import "./coreStyling.css";
import "./dashboardStyling.css";

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
        this.props.editDriverProfile(this.props.user.driverUsername, newDriverEmail, newDriverFirst, newDriverLast, newDriverImage, newDriverLicense)
    }

    goBack = () => {
        this.props.history.goBack()
    }

    handleUploadedImage = (imgUrl) => {
        this.setState({ editImage: true, driverImage: imgUrl })
    }

    flipEdit = () => this.setState({ editing: !this.state.editing })


    handleImage = (imageUrl) => {
        this.setState({ newDriverImage: imageUrl })
    }

    render() {
        let { user } = this.props;
        if (!user.loggedIn) {
            return <Redirect to="/" />
        }
        //
        let { newDriverImage, newDriverUsername, newDriverFirst, newDriverLast, newDriverEmail, newDriverLicense } = this.state
        return (
            <div className="mainAppWindow">
                <section className="normalPageContainer">
                    <section className="profilePageWhiteBox" style={{ height: "100%" }}>
                        {this.state.editing ? (
                            <div>
                                <h3>Upload New Image</h3>
                                <div>
                                    <UploadImage action={this.handleUploadedImage} handleImage={this.handleImage} newImageUrl={this.state.newDriverImage} />
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
                                <div className="profilePageContainer">
                                    <img src={`${this.props.user.driverImage}`} className="profilePageProfPic" />
                                    <h2 className="profilePageH2">{this.props.user.driverFirst} {this.props.user.driverLast}</h2>
                                    <div className="ui divided selection list" style={{ width: "75%" }}>
                                        <div className="profilePageContentCont">
                                            <a className="item" style={{ marginBottom: "1vh" }}>
                                                <div className="large ui blue horizontal label">Username</div>
                                                {this.props.user.driverUsername}
                                            </a>
                                            <a className="item" style={{ marginBottom: "1vh" }}>
                                                <div className="large ui blue horizontal label">Email</div>
                                                {this.props.user.driverEmail}
                                            </a>
                                            <a className="item" style={{ marginBottom: "1vh" }}>
                                                <div className="large ui blue horizontal label">License Number:</div>
                                                {this.props.user.driverLicense}
                                            </a>
                                        </div>
                                        <button className="ui inverted blue button" onClick={this.flipEdit} style={{ marginTop: "5%", marginBottom: "20%" }}>EDIT PROFILE</button>
                                        <BoatProfile />
                                    </div>

                                </div>

                            )}

                    </section>
                </section>
            </div>
        );
    };
}

function mapStateToProps(state) {
    return state.user
}

export default connect(mapStateToProps, { editDriverProfile })(withRouter(DriverProfile));

