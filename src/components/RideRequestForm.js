import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";


class RideRequestForm extends Component{

    goBack = () => {
        this.props.history.goBack()
    }
    
    requestRide = () => {
        console.log('Request was sent, redirecting to requests outstanding page in 2 seconds!')
        setTimeout( () => {
            this.props.history.push('/rider-dashboard/ride-requests')
        }, 2000)
    }

    render(){
        
        let { user } = this.props;
        if(!user.loggedIn){
            return <Redirect to="/" />
        }

        return(
        
            <div>
                <header>
                    <button onClick={this.goBack}>{`<Back`}</button>
                    <h1>Enter information here to send request to drivers</h1>
                    <button onClick={this.requestRide}>Request Your Ride</button> 
                </header>
            </div>
        );
    };
}

function mapStateToProps(state){
    return state.user
  }

  export default connect(mapStateToProps, null)(withRouter(RideRequestForm));