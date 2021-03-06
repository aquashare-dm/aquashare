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

    handleFormSubmit = () => {
        let { newRiderEmail, newRiderFirst, newRiderLast, newRiderImage } = this.state
        this.props.editRiderProfile(this.props.user.riderUsername, newRiderEmail, newRiderFirst, newRiderLast, newRiderImage)
    }

    handleUploadedImage = (imgUrl) => {
        this.setState({ editImage: true, riderImage: imgUrl })
    }

    flipEdit = () => this.setState({ editing: !this.state.editing })

    handleImage = (imageUrl) => {
        this.setState({ newRiderImage: imageUrl })
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
        let { newRiderFirst, newRiderLast, newRiderEmail } = this.state
        return (
            <div className="mainAppWindow">
                <section className="normalPageContainer">
                    <section className="profilePageWhiteBox" style={{height: "80%"}}>
                        {this.state.editing ? (
                            <div style={{visibility: !this.props.navMenuOpen?"visible":"hidden"}}>
                                <h2 className="mapPageContainerHeader">EDIT PROFILE</h2>
                                <div className="profilePageContainer">
                                    <div>
                                        <UploadImage action={this.props.handleUploadedImage} handleImage={this.handleImage} newImageUrl={this.state.newRiderImage} />
                                    </div>
                                    <div className="ui labeled input labeledInputBox" style={{width: "100%", marginTop: "10%"}}>
                                        <div className="ui blue label">Email</div>
                                        <input onChange={this.handleChange} type="text" name="newRiderEmail" value={this.state.newRiderEmail} placeholder="Email"/>
                                    </div>
                                    <div className="ui labeled input labeledInputBox" style={{width: "100%"}}>
                                        <div className="ui blue label">First Name</div>
                                        <input onChange={this.handleChange} type="text" name="newRiderFirst" value={this.state.newRiderFirst} placeholder="First Name"/>
                                    </div>
                                    <div className="ui labeled input labeledInputBox" style={{width: "100%"}}>
                                        <div className="ui blue label">Last Name</div>
                                        <input onChange={this.handleChange} type="text" name="newRiderLast" value={this.state.newRiderLast} placeholder="Last Name"/>
                                    </div>
                                    <div>
                                        <button className="ui inverted blue button" style={{marginTop:"5%"}} onClick={this.onSubmitClick}>SUBMIT</button> 
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <h2 className="mapPageContainerHeader">PROFILE INFORMATION</h2>
                                <div className="profilePageContainer">
                                    <img src={`${this.props.user.riderImage}`} className="profilePageProfPic" style={{height: "20vh"}}/>
                                    <h2 className="profilePageH2">{this.props.user.riderFirst} {this.props.user.riderLast}</h2>
                                    <div className="ui divided selection list" style={{ width: "75%" }}>
                                        <div className="profilePageContentCont">
                                            <a className="item" style={{ marginBottom: "1vh" }}>
                                                <div className="large ui blue horizontal label">Username</div>
                                                {this.props.user.riderUsername}
                                            </a>
                                            <a className="item" style={{ marginBottom: "1vh" }}>
                                                <div className="large ui blue horizontal label">Email</div>
                                                {this.props.user.riderEmail}
                                            </a>
                                        </div>
                                        <button className="ui inverted blue button" onClick={this.flipEdit} style={{ marginTop: "5%" }}>EDIT PROFILE</button>
                                    </div>
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