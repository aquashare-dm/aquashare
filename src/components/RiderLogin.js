import React, { Component } from "react";
import { connect } from "react-redux";
import { riderLogin } from "../redux/userReducer.js";
import { Redirect, Link } from "react-router-dom";
import "./coreStyling.css";
import "./mainEntryAuth.css";

class RiderLogin extends Component{

    constructor(){
        super();
        this.state = {
            username: "",
            password: ""
        }
    }

    handleChange = (event) =>{
        let {name, value} = event.target;
        this.setState({[name]: value});
    };

    loginRider = () => {
        let {username, password} = this.state;
        this.props.riderLogin(username, password);
    }

    render(){
        let {user} = this.props;
        let {username, password} = this.state;
        //Check if user is logged in
        if(user){
            if(user.loggedIn && !user.isDriver) return <Redirect to="/rider-dashboard/find-a-ride" />
        }


        return(

        <section className="mainAppWindow">
            <section className="fullScreenContainerStartPages">
                <div className="startPageLogoContainer" style={{marginBottom: "15%"}}>
                    <h1 className="logoH1">AQUASHARE</h1>
                </div>
                <h2 className="startPagesH2" style={{marginBottom: "10%"}}>RIDER LOGIN</h2>
                <div className="doubleInputCont" style={{height: "20%"}}>
                    <div className="fluid ui icon input" style={{width: "100%"}}>
                        <input placeholder="Username" type="text" value={username} name="username" onChange={this.handleChange} />
                        <i className="fas fa-user icon" style={{color: "#337AB7"}}></i>
                    </div>
                    <div className="ui fluid icon input" style={{width: "100%"}}>
                        <input placeholder="Password" type="password" value={password} name="password" onChange={this.handleChange} />
                        <i className="fas fa-unlock icon" style={{color: "#337AB7"}}></i>
                    </div>
                    <button className="ui fluid inverted blue button" onClick={this.loginRider}>
                        <p className="buttonInsideText">LOGIN</p>
                    </button>
                </div>

                
            </section>
        </section>
        );
    };
}

function mapStateToProps(state){
    return state.user;
}

export default connect(mapStateToProps, {riderLogin})(RiderLogin);