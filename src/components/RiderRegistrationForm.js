import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { riderRegister } from '../redux/userReducer'
// import Dropzone from 'react-dropzone'
import UploadImage from './UploadImage'


class RiderRegistrationForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {},
            riderEmail: '',
            riderFirst: '',
            riderLast: '',
            riderImage: '',
            startRating: ''
        }
    }

    registerAccount = () => {
        let { user } = this.props
        console.log('Account information sent to DB to be updated!')
        user.registered = true
        this.props.history.push('/rider-dashboard')
    }

    handleChange = (event) => {
        let { name, value } = event.target;
        this.setState({
            [name]: value
        })
    };

    handleFormSubmit = (e) => {
        e.preventDefault()
        let { riderEmail, riderFirst, riderLast, riderImage, startRating } = this.state
        const newStartRating = 5.0
        this.props.riderRegister(this.props.user.riderUsername, riderEmail, riderFirst, riderLast, riderImage, newStartRating)

    }

    handleUploadedImage = (imgUrl) => {
        this.setState({ riderImage: imgUrl })
    }

    render() {

        let { user } = this.props;
        if (!user.isDriver) {
            return <Redirect to="/rider-dashboard" />
        } else if (user.isDriver) {
            return <Redirect to="/driver-dashboard" />
        }

        return (

            <div>
                <h1>{this.props.user.riderUsername}</h1>
                <div>
                    <UploadImage action={this.handleUploadedImage} />
                </div>
                <form>
                    <input type="hidden" name="riderImage" value={this.state.riderImage} placeholder="Image" />
                    <input type="text" name="riderEmail" onChange={this.handleChange} value={this.state.riderEmail} placeholder="Email" />
                    <input type="text" name="riderFirst" onChange={this.handleChange} value={this.state.riderFirst} placeholder="First Name" />
                    <input type="text" name="riderLast" onChange={this.handleChange} value={this.state.riderLast} placeholder="Last Name" />
                    <button onClick={(e) => { this.handleFormSubmit(e) }}>Submit</button>
                </form>
            </div>
        );
    };
}

function mapStateToProps(state) {
    return state.user
}

export default connect(mapStateToProps, { riderRegister })(withRouter(RiderRegistrationForm));