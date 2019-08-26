import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { driverRegister } from '../redux/userReducer'
import UploadImage from './UploadImage'


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

    handleFormSubmit = (e) => {
        console.log(this.props.user)
        e.preventDefault()
        let { driverEmail, driverFirst, driverLast, driverImage, driverLicense } = this.state
        const newStartRating = 5.0;
        this.props.driverRegister(this.props.user.driverUsername, driverEmail, driverFirst, driverLast, driverImage, driverLicense, newStartRating)
        console.log(this.props.user.driverUsername)
        this.registrationFormSwitch();
    }
    handleImage = (imgUrl) => {
        this.setState({ driverImage: imgUrl })
    }

    render() {
        let { boat, user } = this.props;
        console.log("this.props on registration", this.props)
        if (!user.loggedIn) {
            return <Redirect to='/' />
        }

        if (user.driverRating && ![boat].length) {
            return (<div></div>)
        } else {
            return (
                <div>
                    <h1>{this.props.user.riderUsername}</h1>
                    <div>
                        <UploadImage action={this.props.handleUploadedImage} handleImage={this.handleImage} newImageUrl={this.state.driverImage} />
                    </div>
                    <form>
                        <input type="hidden" name="driverImage" value={this.state.driverImage} placeholder="Image" />
                        <input type="text" name="driverEmail" onChange={this.handleChange} value={this.state.driverEmail} placeholder="Email" />
                        <input type="text" name="driverFirst" onChange={this.handleChange} value={this.state.driverFirst} placeholder="First Name" />
                        <input type="text" name="driverLast" onChange={this.handleChange} value={this.state.driverLast} placeholder="Last Name" />
                        <input type="text" name="driverLicense" onChange={this.handleChange} value={this.state.driverLicense} placeholder="Driver's License Number" />
                        <button onClick={(e) => { this.handleFormSubmit(e) }}>Submit</button>
                    </form>
                </div>
            );
        }
    };
}

function mapStateToProps(state) {
    return state.user
}

export default connect(mapStateToProps, { driverRegister })(withRouter(DriverRegistrationForm));