import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Link, withRouter } from "react-router-dom";
import { logout } from "../redux/userReducer.js";
import { resetBoatStateOnLogout } from "../redux/boatReducer.js"
import DriverRegistrationForm from "./DriverRegistrationForm.js";


class DriverDashboard extends Component{
    constructor(props) {
        super(props)
        this.state = {
            registered: false,
        }
    }
    
    registrationFormSwitch = ()  =>{
        this.setState({ registered: true}, () => {
            this.props.history.push("/driver-dashboard/boat-register")
        })
    }
    
    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.render()
        }
    }

    logout = () => {
        this.props.logout();
        this.props.resetBoatStateOnLogout()
    }

    render(){
        console.log(this.props)
        let { user } = this.props.user;
        if(!user.loggedIn){
            return <Redirect to="/" />
        }

        if(!this.state.registered){
            return(
                <div>
                    <header style={{backgroundColor: "gray"}} >
                        <div>Profile Pic</div>
                        <div>First Name</div>
                        <div>Last Name</div>
                        <div>Driver Rating</div>

                        <button onClick={this.logout}>Log out</button> 
                    </header>
                    <DriverRegistrationForm registrationFormSwitch={this.registrationFormSwitch}/>
                </div>
            ); 
        } else {
            return(
                <div>
                    <header style={{backgroundColor: "gray"}} >
                        <h1>Welcome to the Driver Dashboard</h1>
                        <div>Profile Pic</div>
                        <div>First Name</div>
                        <div>Last Name</div>
                        <div>Driver Rating</div>

                        <button onClick={this.logout}>Log out</button> 
                    </header>
                </div>
            ); 
        }
    
    };
}

function mapStateToProps(state){
    return state
  }

  export default connect(mapStateToProps, { logout, resetBoatStateOnLogout })(withRouter(DriverDashboard));