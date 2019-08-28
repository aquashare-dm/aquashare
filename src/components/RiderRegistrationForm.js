import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { riderRegister } from '../redux/userReducer'
import UploadImage from './UploadImage'
// import Dropzone from 'react-dropzone'
import "./coreStyling.css";
import "./dashboardStyling.css";


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


    handleChange = (event) => {
        let { name, value } = event.target;
        this.setState({
            [name]: value
        })
    };

    handleFormSubmit = (e) => {
        e.preventDefault()
        let { riderEmail, riderFirst, riderLast, riderImage } = this.state
        const newStartRating = 5.0
        this.props.riderRegister(this.props.user.riderUsername, riderEmail, riderFirst, riderLast, riderImage, newStartRating)
        this.redirectTo()
    }

    redirectTo = () => {
        this.props.history.push("/rider-dashboard/find-a-ride")
    }




    handleImage = (imgUrl) => {
        this.setState({ riderImage: imgUrl })
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
                   <section className="profilePageWhiteBox" style={{height: "90%"}}>
                        <div className="profilePageContentCont" style={{width: "92%"}}>
                            <h2 className="profilePageH2" style={{justifyContent: "center", alignItems: "center"}}>RIDER REGISTRATION</h2>
                            <div>
                                <UploadImage action={this.props.handleUploadedImage} handleImage={this.handleImage} newImageUrl={this.state.newRiderImage} />
                            </div>
                            <div className="ui labeled input labeledInputBox" style={{width: "100%", marginTop: "20%"}}>
                                <div className="ui blue label">Email</div>
                                <input onChange={this.handleChange} type="text" name="riderEmail" value={this.state.riderEmail} placeholder="Email"/>
                            </div>
                            <div className="ui labeled input labeledInputBox" style={{width: "100%"}}>
                                <div className="ui blue label">First Name</div>
                                <input onChange={this.handleChange} type="text" name="riderFirst" value={this.state.riderFirst} placeholder="First Name"/>
                            </div>
                            <div className="ui labeled input labeledInputBox" style={{width: "100%"}}>
                                <div className="ui blue label">Last Name</div>
                                <input onChange={this.handleChange} type="text" name="riderLast" value={this.state.riderLast} placeholder="Last Name"/>
                            </div>
                            <button className="ui inverted blue button" style={{marginTop:"5%"}} onClick={() => {
                                this.handleFormSubmit()
                                this.flipEdit()
                            }}>SUBMIT</button> 

                        </div>
                   </section>
                </section>        
            </div>
        );

        // let { user } = this.props;

        // return (

        //     <div>
        //         <h1>{this.props.user.riderUsername}</h1>
        //         <div>
        //             <UploadImage action={this.props.handleUploadedImage} handleImage={this.handleImage} newImageUrl={this.state.riderImage} />

        //         </div>
        //         <form>
        //             <input type="hidden" name="riderImage" value={this.state.riderImage} placeholder="Image" />
        //             <input type="text" name="riderEmail" onChange={this.handleChange} value={this.state.riderEmail} placeholder="Email" />
        //             <input type="text" name="riderFirst" onChange={this.handleChange} value={this.state.riderFirst} placeholder="First Name" />
        //             <input type="text" name="riderLast" onChange={this.handleChange} value={this.state.riderLast} placeholder="Last Name" />
        //             <button onClick={(e) => { this.handleFormSubmit(e) }}>Submit</button>
        //         </form>
        //     </div>
        // );
    };
}

function mapStateToProps(state) {
    return state.user
}

export default connect(mapStateToProps, { riderRegister })(withRouter(RiderRegistrationForm));