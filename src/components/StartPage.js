import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Link, withRouter } from "react-router-dom";
import { button } from "semantic-ui-react";
import "./coreStyling.css";
import "./mainEntryAuth.css";

class StartPage extends Component {
    render() {
        let { user } = this.props
        if (!user.loggedIn) {
            return (
                <section className="mainAppWindow">
                    <section className="fullScreenContainerStartPages">
                        <div className="startPageLogoContainer" style={{ marginBottom: "28%" }}>
                            <h1 className="logoH1">AQUASHARE</h1>
                        </div>
                        <h2 className="startPagesH2" style={{ marginBottom: "10%" }}>WELCOME</h2>
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
        } else if (!user.isDriver && user.loggedIn) {
            return <Redirect to="/rider-dashboard" />
        } else if (user.isDriver && user.loggedIn) {
            return <Redirect to="/driver-dashboard" />
        }
    };
}

function mapStateToProps(state) {
    return state.user
}

export default connect(mapStateToProps, null)(withRouter(StartPage));