import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";


class Login extends Component{

    render(){
        
        // let {username, password} = this.state;
        // let {user} = this.props;
        // //Check if user is logged in
        // if(user.loggedIn) return <Redirect to="/dashboard" />

        return(

            <div>

                <section>
                    <h1>Login Page</h1>
                    <Link to="login/rider-login">
                        <button>I am a rider</button>
                    </Link>
                    <Link to="login/driver-login">
                        <button>I am a Driver</button>
                    </Link>
                    
                </section>
            </div>
        );
    };
}

export default Login;