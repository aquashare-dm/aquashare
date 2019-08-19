import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";

class StartPage extends Component{

    render(){
        
        return(

            <div>

                <section>
                    <h1>AquaShare Start Page</h1>
                    <Link to="/login">
                        <button>Login</button>
                    </Link>
                    <Link to="/signup">
                        <button>Signup</button>
                    </Link>
                </section>
            </div>
        );
    };
}

export default StartPage;