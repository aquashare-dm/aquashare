import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import "./coreStyling.css";
import "./mainEntryAuth.css";

class Login extends Component{

    render(){
        let { user } = this.props
        if(user){
            if(user.loggedIn && !user.isDriver) return <Redirect to="/rider-dashboard/find-a-ride" />
            if(user.loggedIn && user.isDriver) return <Redirect to="/driver-dashboard/create-a-ride" />
        }
        return(
            <div className="mainAppWindow">

                <section className="fullScreenContainerStartPages">
                    <div className="startPageLogoContainer" style={{marginBottom: "28%"}}>
                        <h1 className="logoH1">AQUASHARE</h1>
                    </div>
                    <h2 className="startPagesH2" style={{marginBottom: "10%"}}>LOGIN AS A</h2>
                    <div className="doubleInputCont" >
                        
                        <Link to="login/rider-login" id="rider-login-button" data-cy-btn className="fluid ui button">
                            <p className="buttonInsideText">RIDER</p>
                        </Link>
                        <Link to="login/driver-login" data-cy-btn className="fluid ui blue button">
                            <p className="buttonInsideText">DRIVER</p>
                        </Link>
                    </div>
                    
                </section>
            </div>
        );
    };
}

function mapStateToProps(state){
    return state.user;
}

export default connect(mapStateToProps, null)(Login);