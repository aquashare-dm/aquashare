import React, { Component } from "react";
import { connect } from "react-redux";
import { driverSignup } from "../redux/userReducer.js";
import { Redirect, Link } from "react-router-dom";
import "./coreStyling.css";
import "./mainEntryAuth.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


class DriverSignup extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: ""
        }
    }
    handleChange = (event) => {
        let { name, value } = event.target;
        this.setState({
            [name]: value
        })
    };
    signupUser = async () => {
        //Create company password for future sub-used identification------------------------
        let numOfEmptyBoxes = 0;
        let inputBoxesEmpty = [];
        //----------------------------------------------------------------------------------
        let { username, password } = this.state;
        if (username === "") { numOfEmptyBoxes += 1; inputBoxesEmpty.push("Username"); }
        if (password === "") { numOfEmptyBoxes += 1; inputBoxesEmpty.push("Password"); }
        if (numOfEmptyBoxes <= 0) {
            this.props.driverSignup(username, password);
        } else {
            //this.signUpToastError(numOfEmptyBoxes, inputBoxesEmpty)
            // alert("Missing inputs", numOfEmptyBoxes, inputBoxesEmpty);
            this.notify()
        }
    }
    notify = () => {
        toast.error("Missing inputs", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
        })
    }

    // signUpToastError = (numOfEmptyBoxes, inputBoxNames) => {
    //     console.log("Empty boxes are ", numOfEmptyBoxes);
    //     if(numOfEmptyBoxes === 1){
    //         toast.error(`Please fill in the ${inputBoxNames.map((name) => {return " " + name})} box`, {
    //             position: "top-center",
    //             autoClose: 3500,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //             pauseOnHover: true,
    //             draggable: true
    //         });
    //     }else{
    //         toast.error(`Please fill in the ${inputBoxNames.map((name) => { return " " + name})} boxes`, {
    //             position: "top-center",
    //             autoClose: 3500,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //             pauseOnHover: true,
    //             draggable: true
    //         });
    //     }
    // }
    render() {
        let { username, password } = this.state;
        let { user } = this.props;
        //Check if user is signed in
        if (user) {
            if (user.loggedIn && !user.isDriver) return <Redirect to="/rider-dashboard" />
            if (user.loggedIn && user.isDriver) return <Redirect to="/driver-dashboard/sign-up" />
        }
        return (
            <section className="mainAppWindow">
                <section className="fullScreenContainerStartPages">
                    <div className="startPageLogoContainer" style={{ marginBottom: "15%" }}>
                        <h1 className="logoH1">AQUASHARE</h1>
                    </div>
                    <h2 className="startPagesH2" style={{ marginBottom: "10%" }}>DRIVER SIGNUP</h2>
                    <div className="doubleInputCont" style={{ height: "20%" }}>
                        <div className="fluid ui icon input" style={{ width: "100%" }}>
                            <input placeholder="Username" type="text" value={username} name="username" onChange={this.handleChange} />
                            <i className="fas fa-user icon" style={{ color: "#337AB7" }}></i>
                        </div>
                        <div className="ui fluid icon input" style={{ width: "100%" }}>
                            <input placeholder="Password" type="password" value={password} name="password" onChange={this.handleChange} />
                            <i className="fas fa-unlock icon" style={{ color: "#337AB7" }}></i>
                        </div>
                        <button className="ui fluid inverted blue button" onClick={this.signupUser}>
                            <p className="buttonInsideText">SIGNUP</p>
                        </button>
                    </div>
                </section>
            </section>
        )
    };
}
function mapStateToProps(state) {
    return state.user;
}
export default connect(mapStateToProps, { driverSignup })(DriverSignup);