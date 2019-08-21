import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Link, withRouter } from "react-router-dom";
import { logout } from "../redux/userReducer.js";
import RiderRegistrationForm from "./RiderRegistrationForm.js";


class RiderDashboard extends Component{
    
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
        // if(!user.loggedIn){
        //     return <Redirect to="/" />
        // }

        if(user.riderRating < 0 || !user.riderRating){
            return(
                <div>
                    <header style={{backgroundColor: "gray"}} >
                        <div>Profile Pic</div>
                        <div>First Name</div>
                        <div>Last Name</div>
                        <div>Rider Rating</div>
                        <Link to="/rider-dashboard/find-a-ride">
                            <div>Find a Ride</div>
                        </Link>
                        <Link to="/rider-dashboard/ride-requests">
                            <div>Ride Requests</div>
                        </Link>
                        <Link to="/rider-dashboard/ride-history">
                            <div>Ride History</div>
                        </Link>
                        <Link to="/rider-dashboard/rider-profile">
                            <div>Edit Profile</div>
                        </Link>
                        <button onClick={this.logout}>Log out</button> 
                    </header>
                    <RiderRegistrationForm/>
                </div>
            ); 
        } else {
            return(
                <div>
                    <header style={{backgroundColor: "gray"}} >
                        <h1>Welcome to the Rider Dashboard</h1>
                        <div>Profile Pic</div>
                        <div>First Name</div>
                        <div>Last Name</div>
                        <div>Rider Rating</div>
                        <Link to="/rider-dashboard/find-a-ride">
                            <div>Find a Ride</div>
                        </Link>
                        <Link to="/rider-dashboard/ride-requests">
                            <div>Ride Requests</div>
                        </Link>
                        <Link to="/rider-dashboard/ride-history">
                            <div>Ride History</div>
                        </Link>
                        <Link to="/rider-dashboard/rider-profile">
                            <div>Edit Profile</div>
                        </Link>
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

  export default connect(mapStateToProps, { logout })(withRouter(RiderDashboard));