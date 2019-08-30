import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { editBoat, getBoatInfo } from '../redux/boatReducer'
import UploadImage from './UploadImage'
import "./coreStyling.css";
import "./dashboardStyling.css";

class BoatProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {},
            boatId: this.props.boat.boat.boatId,
            newBoatName: this.props.boat.boat.boatName,
            newBoatDescription: this.props.boat.boat.boatDescription,
            newBoatLicense: this.props.boat.boat.boatLicense,
            newBoatRegistration: this.props.boat.boat.boatRegistration,
            newBoatMake: this.props.boat.boat.boatMake,
            newBoatModel: this.props.boat.boat.boatModel,
            newBoatSeatNumber: this.props.boat.boat.boatSeatNumber,
            newTubeSeatNumber: this.props.boat.boat.tubeSeatNumber,
            newTierId: this.props.boat.boat.tierId,
            newBoatImageOne: this.props.boat.boat.boatImageOne
        }
    }

    componentDidMount() {
        this.props.getBoatInfo(this.props.user.user.id)
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.render()
        }
    }

    handleChange = (event) => {
        let { name, value } = event.target;
        this.setState({
            [name]: value
        })
    };

    handleFormSubmit = (e) => {
        let { newBoatName, newBoatDescription, newBoatLicense, newBoatRegistration, newBoatMake, newBoatModel, newBoatSeatNumber, newBoatImageOne, newTubeSeatNumber, newTierId } = this.state
        console.log("this.props in Boat Profile", this.props)
        this.props.editBoat(this.props.user.user.id, newBoatName, newBoatDescription, newBoatLicense, newBoatRegistration, newBoatMake, newBoatModel, newBoatSeatNumber, newBoatImageOne, newTubeSeatNumber, newTierId)
    }

    handleUploadedImage = (imgUrl) => {
        this.setState({ editImage: true, boatImageOne: imgUrl })
    }

    flipEdit = () => this.setState({ editing: !this.state.editing })

    handleImage = (imageUrl) => {
        this.setState({ newBoatImageOne: imageUrl })
    }

    onSubmitClick = () => {
        this.handleFormSubmit()
        this.flipEdit()
    }

    render() {
        console.log("This.props on BoatProfile", this.props)
        let { boat } = this.props.boat;
        let { newBoatName, newBoatDescription, newBoatLicense, newBoatRegistration, newBoatMake, newBoatModel, newBoatSeatNumber, newBoatImageOne, newTubeSeatNumber, newTierId } = this.state
        return (
            <div className="mainAppWindow">
                <section className="normalPageContainer">
                    <section className="profilePageWhiteBox" style={{ height: "80%"}}>
                        {this.state.editing ? (
                            <div style={{visibility: !this.props.navMenuOpen?"visible":"hidden"}}>
                                <h2 className="mapPageContainerHeader">EDIT PROFILE</h2>
                                <div className="profilePageContainer">
                                    <div>
                                        <UploadImage action={this.props.handleImageUpload} handleImage={this.handleImage} newImageUrl={this.state.newBoatImageOne} />
                                    </div>
                                    <div className="ui labeled input labeledInputBox" style={{width: "100%", marginTop: "10%"}}>
                                        <div className="ui blue label">Boat Name</div>
                                        <input onChange={this.handleChange} type="text" name="newBoatName" value={newBoatName} placeholder="Boat Name"/>
                                    </div>
                                    <div className="ui labeled input labeledInputBox" style={{width: "100%"}}>
                                        <div className="ui blue label">Boat Description</div>
                                        <input onChange={this.handleChange} type="text" name="newBoatDescription" value={newBoatDescription} placeholder="Boat Description"/>
                                    </div>
                                    <div className="ui labeled input labeledInputBox" style={{width: "100%"}}>
                                        <div className="ui blue label">Operator License</div>
                                        <input onChange={this.handleChange} type="text" name="newBoatLicense" value={newBoatLicense} placeholder="Operator License"/>
                                    </div>
                                    <div className="ui labeled input labeledInputBox" style={{width: "100%"}}>
                                        <div className="ui blue label">Registration Number</div>
                                        <input onChange={this.handleChange} type="text" name="newBoatRegistration" value={newBoatRegistration} placeholder="Registration Number"/>
                                    </div>
                                    <div className="ui labeled input labeledInputBox" style={{width: "100%"}}>
                                        <div className="ui blue label">Boat Make</div>
                                        <input onChange={this.handleChange} type="text" name="newBoatMake" value={newBoatMake} placeholder="Make"/>
                                    </div>
                                    <div className="ui labeled input labeledInputBox" style={{width: "100%"}}>
                                        <div className="ui blue label">Boat Model</div>
                                        <input onChange={this.handleChange} type="text" name="newBoatModel" value={newBoatModel} placeholder="Model"/>
                                    </div>
                                    <div className="ui labeled input labeledInputBox" style={{width: "100%"}}>
                                        <div className="ui blue label">Total Boat Seating</div>
                                        <input onChange={this.handleChange} type="number" name="newBoatSeatNumber" value={+newBoatSeatNumber} placeholder="Total Boat Seating"/>
                                    </div>
                                    <div className="ui labeled input labeledInputBox" style={{width: "100%"}}>
                                        <div className="ui blue label">Total Tube Seats</div>
                                        <input onChange={this.handleChange} type="number" name="newTubeSeatNumber" value={+newTubeSeatNumber} placeholder="Total Tube Seating"/>
                                    </div>
                                    <div className="ui labeled input labeledInputBox" style={{width: "100%"}}>
                                        <div className="ui blue label">Tier Id</div>
                                        <input onChange={this.handleChange} type="number" name="newTierId" value={+newTierId} placeholder="Tier Id"/>
                                    </div>
                                    <div>
                                        <button className="ui inverted blue button" style={{marginTop:"5%"}} onClick={this.onSubmitClick}>SUBMIT</button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <h2 className="mapPageContainerHeader">BOAT INFORMATION</h2>
                                <div className="profilePageContainer">
                                    <img src={`${boat.boatImageOne}`} className="profilePageProfPic" style={{height: "20vh"}}/>
                                    <h2 className="profilePageH2">{boat.boatName}</h2>
                                    <div className="ui divided selection list" style={{ width: "75%" }}>
                                        <div className="profilePageContentCont">
                                            <a className="item" style={{ marginBottom: "1vh" }}>
                                                <div className="large ui blue horizontal label">Boat Description</div>
                                                {boat.boatDescription}
                                            </a>
                                            <a className="item" style={{ marginBottom: "1vh" }}>
                                                <div className="large ui blue horizontal label">Operator License</div>
                                                {boat.boatLicense}
                                            </a>
                                            <a className="item" style={{ marginBottom: "1vh" }}>
                                                <div className="large ui blue horizontal label">Boat Registration:</div>
                                                {boat.boatRegistration}
                                            </a>
                                            <a className="item" style={{ marginBottom: "1vh" }}>
                                                <div className="large ui blue horizontal label">Make:</div>
                                                {boat.boatMake}
                                            </a>
                                            <a className="item" style={{ marginBottom: "1vh" }}>
                                                <div className="large ui blue horizontal label">Model:</div>
                                                {boat.boatModel}
                                            </a>
                                            <a className="item" style={{ marginBottom: "1vh" }}>
                                                <div className="large ui blue horizontal label">Total Boat Seating:</div>
                                                {boat.boatSeatNumber}
                                            </a>
                                            <a className="item" style={{ marginBottom: "1vh" }}>
                                                <div className="large ui blue horizontal label">Total Tube Seating:</div>
                                                {boat.tubeSeatNumber}
                                            </a>
                                            <a className="item" style={{ marginBottom: "1vh" }}>
                                                <div className="large ui blue horizontal label">Tier Id:</div>
                                                {boat.tierId}
                                            </a>
                                        </div>
                                        <button className="ui inverted blue button" onClick={this.flipEdit} style={{ marginTop: "3%" }}>EDIT BOAT</button>
                                        <button className="ui inverted blue button" onClick={() => this.props.history.push('/driver-dashboard/driver-profile')} style={{ marginTop: "5%"}}>VIEW PROFILE INFO</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </section>
                </section>
            </div>
        );
    };
}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps, { editBoat, getBoatInfo })(withRouter(BoatProfile));