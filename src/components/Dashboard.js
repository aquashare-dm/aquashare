import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { logout } from "../redux/userReducer.js";


class Dashboard extends Component{

    logout = async () => {
        await this.props.logout();
    }

    render(){
        
        let { user } = this.props;
        if(!user.loggedIn){
            return <Redirect to="/" />
        }

        return(

            <div>

                <section>
                    <h1>Welcome to the Dashboard</h1>
                    <button onClick={this.logout}>Log out</button>
                    
                </section>
            </div>
        );
    };
}

function mapStateToProps(state){
    return state.user
  }

  export default connect(mapStateToProps, { logout })(Dashboard);