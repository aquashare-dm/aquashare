import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { driverRegister } from '../redux/userReducer'


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

    handleFormSubmit = (e) => {
        e.preventDefault()
        let { driverEmail, driverFirst, driverLast, driverImage, driverLicense, startRating } = this.state
        const newStartRating = 5.0;
        this.props.driverRegister(this.props.user.driverUsername, driverEmail, driverFirst, driverLast, driverImage, driverLicense, newStartRating)

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
                    <input type="text" name="driverImage" onChange={this.handleChange} value={this.state.driverImage} placeholder="Image" />
                    <input type="text" name="driverEmail" onChange={this.handleChange} value={this.state.driverEmail} placeholder="Email" />
                    <input type="text" name="driverFirst" onChange={this.handleChange} value={this.state.driverFirst} placeholder="First Name" />
                    <input type="text" name="driverLast" onChange={this.handleChange} value={this.state.driverLast} placeholder="Last Name" />
                    <input type="text" name="driverLicense" onChange={this.handleChange} value={this.state.driverLicense} placeholder="Driver's License Number" />
                    <button onClick={(e) => { this.handleFormSubmit(e) }}>Submit</button>
                </form>
            </div>
        );
    };
}

function mapStateToProps(state) {
    return state.user
}

export default connect(mapStateToProps, { driverRegister })(withRouter(DriverRegistrationForm));