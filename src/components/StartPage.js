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
                    <div className="startPageLogoContainer" style={{marginBottom: "28%"}}>
                        <h1 className="logoH1">AQUASHARE</h1>
                    </div>
                    <h2 className="startPagesH2" style={{marginBottom: "10%"}}>WELCOME</h2>
                    <div className="doubleInputCont">
                        <Link to="/login" className="fluid ui inverted blue button">
                            <p className="buttonInsideText">LOGIN</p>
                        </Link>
                        <Link to="/signup" className="fluid ui inverted blue button">
                            <p className="buttonInsideText">SIGNUP</p>
                        </Link>
                    </div>

                </section>
            </section>
        );
    };
}

export default StartPage;