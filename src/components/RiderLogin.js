import React, { Component } from "react";
import { connect } from "react-redux";
import { riderLogin } from "../redux/riderReducer.js";
import { Redirect, Link } from "react-router-dom";

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
        console.log(this.props);
        //Check if user is logged in
        if(user){
            if(user.loggedIn) return <Redirect to="/startpage" />
        }


        return(

            <div>

                <section>
                    <h1>Rider Login Page</h1>
                    <input placeholder="Username" type="text" value={username} name="username" onChange={this.handleChange} />
                    <input placeholder="Password" type="password" value={password} name="password" onChange={this.handleChange} />
                    <button className="login-entry-btn" onClick={this.loginRider}>Login</button>
                </section>
            </div>
        );
    };
}

function mapStateToProps(state){
    return {user: state.user};
}

export default connect(mapStateToProps, {riderLogin})(RiderLogin);