import React, { Component } from "react";
import { connect } from "react-redux";
import { driverSignup } from "../redux/driverReducer.js";
import { Redirect, Link } from "react-router-dom";

class DriverSignup extends Component{

    constructor(){
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
        await this.genCompanyKey(25);
        let numOfEmptyBoxes = 0;
        let inputBoxesEmpty = [];
        
        //----------------------------------------------------------------------------------
        let { username, password} = this.state;

        if(username === ""){numOfEmptyBoxes += 1; inputBoxesEmpty.push("Username");} 
        if(password === ""){numOfEmptyBoxes += 1; inputBoxesEmpty.push("Password");} 

        if(numOfEmptyBoxes <= 0){
            this.props.signup(username, password);
        }else{
            //this.signUpToastError(numOfEmptyBoxes, inputBoxesEmpty)
            alert("Missing inputs" ,numOfEmptyBoxes, inputBoxesEmpty);
        }

        


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

    render(){

        let { username, passwordme } = this.state;
        let {user} = this.props;
        //Check if user is signed in
        if(user.loggedIn) return <Redirect to="/dashboard" />
        return(

        <div>
            <h1>Driver Signup</h1>
        </div>
        )
    };

}

function mapStateToProps(state){
    return {user: state.user};
}

export default connect(mapStateToProps, {driverSignup})(DriverSignup);