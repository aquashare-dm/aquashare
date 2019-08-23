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

                <section className="fullScreenContainerStartPages">
                    <div className="startPageLogoContainer" style={{marginBottom: "28%"}}>
                        <h1 className="logoH1">AQUASHARE</h1>
                    </div>
                    <h2 className="startPagesH2" style={{marginBottom: "10%"}}>LOGIN AS A</h2>
                    <div className="doubleInputCont" >
                        
                        <Link to="login/rider-login" className="fluid ui button">
                            <p className="buttonInsideText">RIDER</p>
                        </Link>
                        <Link to="login/driver-login" className="fluid ui blue button">
                            <p className="buttonInsideText">DRIVER</p>
                        </Link>
                    </div>
                    
                </section>
            </div>
        );
    };
}

export default Login;