import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { driverRegister } from '../redux/userReducer'
import UploadImage from './UploadImage'
import "./coreStyling.css";
import "./dashboardStyling.css";

class DriverRegistrationForm extends Component {
    constructor() {
        super()
        this.state = {
            user: {},
            driverEmail: '',
            driverFirst: '',
            driverLast: '',
            driverImage: '',
            driverLicense: '',
            startRating: ''
        }
    }

    handleChange = (event) => {
        let { name, value } = event.target;
        this.setState({
            [name]: value
        })
    };

    registrationFormSwitch = () => {
        this.setState({ registered: true }, () => {
            this.props.history.push("/driver-dashboard/boat-register")
        })
    }

    handleFormSubmit = () => {
        let { driverEmail, driverFirst, driverLast, driverImage, driverLicense } = this.state
        const newStartRating = 5.0;
        this.props.driverRegister(this.props.user.driverUsername, driverEmail, driverFirst, driverLast, driverImage, driverLicense, newStartRating)
        this.registrationFormSwitch();
    }
    handleImage = (imgUrl) => {
        this.setState({ driverImage: imgUrl })
    }

    render() {
        let { boat, user } = this.props;
        if (!user.loggedIn) {
            return <Redirect to='/' />
        }

        if (user.driverRating && ![boat].length) {
            return (<div></div>)
        } else {
            return (
                <div className="mainAppWindow">
                    <section className="normalPageContainer">
                        <section className="profilePageWhiteBox" style={{height: "90%"}}>
                                <div className="profilePageContentCont" style={{width: "92%"}}>
                                    <h2 className="profilePageH2" style={{justifyContent: "center", alignItems: "center"}}>DRIVER REGISTRATION</h2>
                                    <div>
                                        <UploadImage action={this.props.handleUploadedImage} handleImage={this.handleImage} newImageUrl={this.state.driverImage} />
                                    </div>
                                    <div className="ui labeled input labeledInputBox" style={{width: "100%", marginTop: "20%"}}>
                                        <div className="ui blue label">Email</div>
                                        <input onChange={this.handleChange} type="text" name="driverEmail" value={this.state.driverEmail} placeholder="Email"/>
                                    </div>
                                    <div className="ui labeled input labeledInputBox" style={{width: "100%"}}>
                                        <div className="ui blue label">First Name</div>
                                        <input onChange={this.handleChange} type="text" name="driverFirst" value={this.state.driverFirst} placeholder="First Name"/>
                                    </div>
                                    <div className="ui labeled input labeledInputBox" style={{width: "100%"}}>
                                        <div className="ui blue label">Last Name</div>
                                        <input onChange={this.handleChange} type="text" name="driverLast" value={this.state.driverLast} placeholder="Last Name"/>
                                    </div>
                                    <div className="ui labeled input labeledInputBox" style={{width: "100%"}}>
                                        <div className="ui blue label">Driver's License</div>
                                        <input onChange={this.handleChange} type="text" name="driverLicense" value={this.state.driverLicense} placeholder="Driver's License"/>
                                    </div>
                                    <div>
                                        <button className="ui inverted blue button" onClick={this.handleFormSubmit}>SUBMIT</button> 
                                    </div>
                                </div>
                        </section>
                    </section>        
                </div>
            );
        }
    };
}

function mapStateToProps(state) {
    return state.user
}

export default connect(mapStateToProps, { driverRegister })(withRouter(DriverRegistrationForm));