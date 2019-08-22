import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import "./coreStyling.css";
import "./mainEntryAuth.css";

class Login extends Component{

    render(){
        
        // let {username, password} = this.state;
        // let {user} = this.props;
        // //Check if user is logged in
        // if(user.loggedIn) return <Redirect to="/dashboard" />

        return(

            <div className="mainAppWindow">

                <section section className="fullScreenContainerStartPages">
                    <div className="startPageLogoContainer">
                        <h1 className="logoH1">AQUASHARE</h1>
                    </div>
                    <div className="doubleInputCont">
                        <Link to="login/rider-login" className="fluid ui inverted blue button">
                            <p>I am a Rider</p>
                        </Link>
                        <Link to="login/driver-login" className="fluid ui inverted blue button">
                            <p>I am a Driver</p>
                        </Link>
                    </div>
                    
                </section>
            </div>
        );
    };
}

export default Login;