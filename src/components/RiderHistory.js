import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";


class RiderHistory extends Component{

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
                    <h1>This view will list all of the past user trips and will allow riders to rate the driver</h1>
                    <button onClick={this.goToSearchPage}>Search for a New Ride</button> 
                </header>
            </div>
        );
    };
}

function mapStateToProps(state){
    return state.user
  }

  export default connect(mapStateToProps, null)(withRouter(RiderHistory));