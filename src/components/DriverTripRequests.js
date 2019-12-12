import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { getAvailableRequests } from '../redux/requestReducer'
import DriverTripRequest from './DriverTripRequest'

class DriverTripRequests extends Component {

    componentDidMount() {
        this.props.getAvailableRequests(this.props.user.user.id)
    }

    goBack = () => {
        this.props.history.goBack()
    }

    goToSearchPage = () => {
        this.props.history.push('/driver-dashboard/create-a-ride')
    }

    render() {
        let { user } = this.props.user;
        let { requests } = this.props


        if (!user.loggedIn) {
            return <Redirect to="/" />
        }

        let requestsDisplay = requests.allRequests.map(request => (
            <DriverTripRequest key={request.request_id} {...request} />
        ))
        return (
            <div className="mainAppWindow">
                <section className="normalPageContainer">
                    <section className="normalPageWhiteBox">
                        <h2 className="mapPageContainerHeader">REQUESTED RIDES</h2>

                        <div className="availableRideContainer" style={{ backgroundColor: "white", height: "5vh" }}>
                            <div className="six wide column" style={{ marginLeft: "4%" }}>DATE</div>
                            <div className="one wide column" style={{ marginLeft: "7%" }}></div>
                            <div className="one wide column" style={{ marginLeft: "16%" }}>TIER</div>
                            <div className="eight wide column" style={{ overflowX: "auto", marginLeft: "5%" }}>LOCATION</div>
                        </div>
                        <div className="allAvailRidesContainer" >{
                            requests.allRequests.filter(function (request) {
                                if (JSON.stringify(request.request_end_time).length === 1) {
                                    let currentFlag = Date.parse(`${request.request_date} 00:0${JSON.stringify(request.request_end_time)}:00:00`) - Date.now()
                                    return currentFlag >= 0
                                } else {
                                    let currentFlag = Date.parse(`${request.request_date} 00:${JSON.stringify(request.request_end_time)}:00:00`) - Date.now()
                                    return currentFlag >= 0
                                }
                            })
                                .map(request => (
                                    <DriverTripRequest key={request.request_id} {...request} eventTypes={["click"]} />
                                ))
                        }</div>
                    </section>
                </section>
            </div>
        );
    };
}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps, { getAvailableRequests })(withRouter(DriverTripRequests));

