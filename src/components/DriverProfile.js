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

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.render()
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
        this.props.editDriverProfile(this.props.user.id, newDriverEmail, newDriverFirst, newDriverLast, newDriverImage, newDriverLicense)
    }

    handleUploadedImage = (imgUrl) => {
        this.setState({ editImage: true, driverImage: imgUrl })
    }

    flipEdit = () => this.setState({ editing: !this.state.editing })


    handleImage = (imageUrl) => {
        this.setState({ newDriverImage: imageUrl })
    }

    onSubmitClick = () => {
        this.handleFormSubmit()
        this.flipEdit()
    }

    render() {
        let { user } = this.props;
        if (!user.loggedIn) {
            return <Redirect to="/" />
        }
        
        let { newDriverImage, newDriverUsername, newDriverFirst, newDriverLast, newDriverEmail, newDriverLicense } = this.state
        return (
            <div className="mainAppWindow">
                <section className="normalPageContainer">
                    {this.state.editing ? (
                        <div style={{visibility: !this.props.navMenuOpen?"visible":"hidden", display: "flex", justifyContent: "center", alignItems: "center"}}>
                            <section className="profilePageWhiteBox" style={{ height: "72%", width: "90vw" }}>
                                <h2 className="mapPageContainerHeader">EDIT PROFILE</h2>
                                <div className="profilePageContainer">
                                    <div style={{marginTop: "15vh"}}>
                                        <UploadImage action={this.handleUploadedImage} handleImage={this.handleImage} newImageUrl={this.state.newDriverImage} />
                                    </div>
                                    <div className="ui labeled input labeledInputBox" style={{width: "100%", marginTop: "20%"}}>
                                        <div className="ui blue label">First Name</div>
                                        <input onChange={this.handleChange} type="text" name="newDriverFirst" value={newDriverFirst} placeholder="First Name"/>
                                    </div>
                                    <div className="ui labeled input labeledInputBox" style={{width: "100%"}}>
                                        <div className="ui blue label">Last Name</div>
                                        <input onChange={this.handleChange} type="text" name="newDriverLast" value={newDriverLast} placeholder="Last Name"/>
                                    </div>
                                    <div className="ui labeled input labeledInputBox" style={{width: "100%"}}>
                                        <div className="ui blue label">Email</div>
                                        <input onChange={this.handleChange} type="text" name="newDriverEmail" value={newDriverEmail} placeholder="Email"/>
                                    </div>
                                    <div className="ui labeled input labeledInputBox" style={{width: "100%"}}>
                                        <div className="ui blue label">Driver License</div>
                                        <input onChange={this.handleChange} type="text" name="newDriverLicense" value={newDriverLicense} placeholder="Email"/>
                                    </div>
                                    <div>
                                        <button className="ui inverted blue button" style={{marginTop:"5%"}} onClick={this.onSubmitClick}>SUBMIT</button>
                                    </div>
                                </div>
                            </section>
                        </div>
                    ) : (
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <section className="profilePageWhiteBox" style={{ height: "85%", width: "90vw" }}>
                                <h2 className="mapPageContainerHeader">PROFILE INFORMATION</h2>
                                <div className="profilePageContainer">
                                    <img src={`${this.props.user.driverImage}`} className="profilePageProfPic" style={{height: "20vh", marginTop: "10vh"}}/>
                                    <h2 className="profilePageH2">{newDriverFirst} {newDriverLast}</h2>
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
                                        {/* <BoatProfile /> */}
                                    </div>
                                </div>
                            </section>
                        </div>
                    )}
                </section>
            </div>
        );
    };
}

function mapStateToProps(state) {
    return state.user
}

export default connect(mapStateToProps, { editDriverProfile })(withRouter(DriverProfile));

