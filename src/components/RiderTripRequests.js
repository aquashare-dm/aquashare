import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";


class RiderTripRequests extends Component{

    

    goBack = () => {
        this.props.history.goBack()
    }
    
    goToSearchPage = () => {
        this.props.history.push('/rider-dashboard/find-a-ride')
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
                    <h1>This view will list all of the outstanding requests from the rider</h1>
                    <button onClick={this.goToSearchPage}>Search for a New Ride</button> 
                </header>
            </div>
        );
    };
}

function mapStateToProps(state){
    return state.user
  }

  export default connect(mapStateToProps, null)(withRouter(RiderTripRequests));