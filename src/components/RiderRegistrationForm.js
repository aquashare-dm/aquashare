import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";


class RiderRegistrationForm extends Component{

    registerAccount = () => {
        let { user } = this.props
        console.log('Account information sent to DB to be updated!')
        user.registered = true
        this.props.history.push('/rider-dashboard')
    }

    render(){
        
        let { user } = this.props;
        if(!user.loggedIn){
            return <Redirect to="/" />
        }

        return(
        
            <div>
                <header>
                    <h1>This is the registration form for the rider</h1>
                    <div>I suggest adding a field in the database called registered that will be called on mountand will render this form if it is null</div>
                    <button onClick={this.registerAccount}>Register Your Account</button> 
                </header>
            </div>
        );
    };
}

function mapStateToProps(state){
    return state.user
  }

  export default connect(mapStateToProps, null)(withRouter(RiderRegistrationForm));