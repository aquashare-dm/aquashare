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
        console.log('this is props', this.props)
        let { user } = this.props;
        if (!user.loggedIn) {
            return <Redirect to="/" />
        }
        let { newRiderFirst, newRiderLast, newRiderEmail } = this.state
        return (
            <div className="mainAppWindow">
                <section className="normalPageContainer">
                    {this.state.editing ? (
                        <div style={{visibility: !this.props.navMenuOpen?"visible":"hidden", display: "flex", justifyContent: "center", alignItems: "center"}}>
                            <section className="profilePageWhiteBox" style={{ height: "80%", width: "90vw" }}>
                                <h2 className="mapPageContainerHeader">EDIT PROFILE</h2>
                                <div className="profilePageContainer">
                                    <div style={{marginTop: "17vh"}}>
                                        <UploadImage action={this.props.handleUploadedImage} handleImage={this.handleImage} newImageUrl={this.state.newRiderImage} />
                                    </div>
                                    <div className="ui labeled input labeledInputBox" style={{width: "100%", marginTop: "20%"}}>
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
                            </section>
                        </div>
                    ) : (
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <section className="profilePageWhiteBox" style={{ height: "85%", width: "90vw" }}>
                                <h2 className="mapPageContainerHeader">PROFILE INFORMATION</h2>
                                <div className="profilePageContainer">
                                    <img src={`${this.props.user.riderImage}`} className="profilePageProfPic" style={{height: "28vh", marginTop: "5vh"}}/>
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

export default connect(mapStateToProps, { editRiderProfile })(withRouter(RiderProfile));