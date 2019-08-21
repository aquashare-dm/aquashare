import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";


class RiderProfile extends Component {
    constructor(props) {
        super(props)
        console.log('prrrrrrrroooooooppppppps', props)
        this.state = {
            user: {},
            riderImage: '',
            riderRating: '',
            riderUsername: '',
            riderFirstName: '',
            riderLastName: '',
            riderEmail: ''
        }
    }


    goBack = () => {
        this.props.history.goBack()
    }

    render() {
        let { user } = this.props;
        if (!user.loggedIn) {
            return <Redirect to="/" />
        }


        return (

            <div>
                <header>
                    <button onClick={this.goBack}>{`<Back`}</button>
                </header>
                <section>
                    <img src={this.props.user.riderImage} />
                    <h3>{this.props.user.riderRating}</h3>
                    <h1>{this.props.user.riderUsername}</h1>
                    <h3>{this.props.user.riderFirst}</h3>
                    <h3>{this.props.user.riderLast}</h3>
                    <h3>{this.props.user.riderEmail}</h3>
                </section>
            </div>
        );
    };
}

function mapStateToProps(state) {
    return state.user
}

export default connect(mapStateToProps, null)(withRouter(RiderProfile));