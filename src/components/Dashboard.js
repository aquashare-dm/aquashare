import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";


class Dashboard extends Component{

    render(){
        
        // let {username, password} = this.state;
        // let {user} = this.props;
        // //Check if user is logged in
        // if(user.loggedIn) return <Redirect to="/dashboard" />

        return(

            <div>

                <section>
                    <h1>Welcome to the Dashboard</h1>

                    
                </section>
            </div>
        );
    };
}

export default Dashboard;