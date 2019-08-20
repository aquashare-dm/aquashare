import React, { Component } from "react";
import { connect } from "react-redux";
import { driverLogin } from "../redux/userReducer.js";
import { Redirect, Link } from "react-router-dom";

class DriverLogin extends Component{

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

    loginDriver = () => {
        let {username, password} = this.state;
        this.props.driverLogin(username, password);
    }

    render(){
        let {user} = this.props;
        let {username, password} = this.state;
        console.log(this.props);
        //Check if user is logged in
        if(user){
            if(user.loggedIn) return <Redirect to="/driver-dashboard" />
        }

        return(

            <div>

                <section>
                    <h1>Driver Login Page</h1>
                    <input placeholder="Username" type="text" value={username} name="username" onChange={this.handleChange} />
                    <input placeholder="Password" type="password" value={password} name="password" onChange={this.handleChange} />
                    <button className="login-entry-btn" onClick={this.loginDriver}>Login</button>
                </section>
            </div>
        );
    };
}

function mapStateToProps(state){
    return state.user;
}

export default connect(mapStateToProps, {driverLogin})(DriverLogin);