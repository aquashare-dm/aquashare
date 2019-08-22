import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Link, withRouter } from "react-router-dom";
import { logout } from "../redux/userReducer.js";
import DriverRegistrationForm from "./DriverRegistrationForm.js";
import DriverDashLandingPage from "./DriverDashLandingPage.js";


class DriverDashboard extends Component{
    
    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.render()
        }
    }

    logout = async () => {
        await this.props.logout();
    }

    render(){
        let { user } = this.props;
        if(!user.loggedIn){
            return <Redirect to="/" />
        }

        if(!user.registered){
            return(
                <div>
                    <header style={{backgroundColor: "gray"}} >
                        <div>Profile Pic</div>
                        <div>First Name</div>
                        <div>Last Name</div>
                        <div>Driver Rating</div>

                        <button onClick={this.logout}>Log out</button> 
                    </header>
                    <DriverRegistrationForm/>
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
    return state.user
  }

  export default connect(mapStateToProps, { logout })(withRouter(DriverDashboard));