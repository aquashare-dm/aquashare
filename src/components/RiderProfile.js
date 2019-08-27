import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { editRiderProfile } from '../redux/userReducer'
import UploadImage from './UploadImage'
import "./coreStyling.css";
import "./dashboardStyling.css";

class RiderProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {},
            newRiderImage: this.props.user.riderImage,
            riderRating: this.props.user.riderRating,
            newRiderUsername: this.props.user.riderUsername,
            newRiderFirst: this.props.user.riderFirst,
            newRiderLast: this.props.user.riderLast,
            newRiderEmail: this.props.user.riderEmail,
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
        let { newRiderEmail, newRiderFirst, newRiderLast, newRiderImage } = this.state
        this.props.editRiderProfile(this.props.user.riderUsername, newRiderEmail, newRiderFirst, newRiderLast, newRiderImage)
    }

    goBack = () => {
        this.props.history.goBack()
    }

    handleUploadedImage = (imgUrl) => {
        this.setState({ editImage: true, riderImage: imgUrl })
    }

    flipEdit = () => this.setState({ editing: !this.state.editing })

    handleImage = (imageUrl) => {
        this.setState({ newRiderImage: imageUrl })
    }


    render() {
        console.log('this is props', this.props)
        let { user } = this.props;
        if (!user.loggedIn) {
            return <Redirect to="/" />
        }
        let { newRiderFirst, newRiderLast, newRiderEmail } = this.state
        return (
            <div className="mainAppWindow">
                <section className="normalPageContainer">
                   <section className="profilePageWhiteBox">
                    {this.state.editing ? (
                        <div>
                            <h3>Upload New Image</h3>
                            <div>
                                <UploadImage action={this.props.handleUploadedImage} handleImage={this.handleImage} newImageUrl={this.state.newRiderImage} />
                            </div>
                            <input
                                value={newRiderFirst}
                                onChange={this.handleChange}
                                name="newRiderFirst"
                            />
                            <input
                                value={newRiderLast}
                                onChange={this.handleChange}
                                name="newRiderLast"
                            />
                            <input
                                value={newRiderEmail}
                                onChange={this.handleChange}
                                name="newRiderEmail"
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
                                <img src={`${this.props.user.riderImage}`} className="profilePageProfPic" />
                                <h3>{this.props.user.riderRating}</h3>
                                <h1>Username:{this.props.user.riderUsername}</h1>
                                <h3>First Name: {this.props.user.riderFirst} </h3>
                                <h3>Last Name: {this.props.user.riderLast}</h3>
                                <h3>Email: {this.props.user.riderEmail}</h3>
                                <div>
                                    <button onClick={this.flipEdit}>Edit</button>
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

export default connect(mapStateToProps, { editRiderProfile })(withRouter(RiderProfile));