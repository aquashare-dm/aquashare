import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";


class DriverDashLandingPage extends Component{

    goToSearch = () => {
        //this.props.history.push('/driver-dashboard/find-a-ride')
    }

    render(){
        
        let { user } = this.props;
        if(!user.loggedIn){
            return <Redirect to="/" />
        }

        if(!user.registered) {
            return (<div></div>)
        } else {
            return(
                <div>
                    <header>
                        <h1>This will be the home page display on the driver dashboard if the driver has already registered</h1>
                        <div>We can remove this and route it directly to the search form if we want to</div>
                        {/* <button onClick={this.goToSearch}>Find a Ride</button>  */}
                    </header>
                </div>
            );
        }
    };
}

function mapStateToProps(state){
    return state.user
  }

  export default connect(mapStateToProps, null)(withRouter(DriverDashLandingPage));