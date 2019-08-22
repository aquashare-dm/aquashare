import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import {button} from "semantic-ui-react";
import "./coreStyling.css";
import "./mainEntryAuth.css";

class StartPage extends Component{

    render(){
        
        return(

            <section className="mainAppWindow">

                <section className="fullScreenContainerStartPages">
                    <div className="startPageLogoContainer">
                        <h1 className="logoH1">AQUASHARE</h1>
                    </div>
                    <div className="doubleInputCont">
                        <Link to="/login" className="fluid ui inverted blue button">
                            <p>Login</p>
                        </Link>
                        <Link to="/signup" className="fluid ui inverted blue button">
                            <p>Signup</p>
                        </Link>
                    </div>

                </section>
            </section>
        );
    };
}

export default StartPage;