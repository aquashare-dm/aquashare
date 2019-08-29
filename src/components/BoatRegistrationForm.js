import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { createBoat, connectBoatIdToDriver } from '../redux/boatReducer.js'
import UploadImage from './UploadImage'
import { setTimeout } from "timers";
import Select from "react-select";
import "./coreStyling.css";
import "./dashboardStyling.css";
// import { triggerAsyncId } from "async_hooks";


class BoatRegistrationForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            boatName: '',
            tierId: 0,
            boatDescription: '',
            boatLicense: '',
            boatRegistration: '',
            boatMake: '',
            boatModel: '',
            boatSeatNum: 0,
            tubeSeatNum: 0,
            boatImage: '',
        }
    }

    handleChange = (event) => {
        let { name, value } = event.target;
        this.setState({
            [name]: value
        })
    };
    handleDropDownChange = (event) => {
        let {name, value} = event;
        this.setState({
            [name]: value
        })
    };

    createBoat = () => {
        let { boatName, tierId, boatDescription, boatLicense, boatRegistration, boatMake, boatModel,
            boatSeatNum, tubeSeatNum, boatImage } = this.state
        this.props.createBoat(boatName, tierId, boatDescription, boatLicense, boatRegistration, boatMake, boatModel,
            boatSeatNum, tubeSeatNum, boatImage, this.props.user.id)
        this.props.history.push("/driver-dashboard/create-a-ride")
    }

    handleImage = (imgUrl) => {
        this.setState({ boatImage: imgUrl })
    }

    render() {
        let { user } = this.props;
        //Drop Down Selection Variables
        let tierIdOptions = [
            {label:"Tier 1", value: 1, name: "tierId"},
            {label:"Tier 2", value: 2, name: "tierId"},
            {label:"Tier 3", value: 3, name: "tierId"},
            {label:"Tier 4", value: 4, name: "tierId"}
        ];

        return (

            // <div>
            //     <h1>{user.riderUsername}</h1>
            //     <div>
            //         <UploadImage action={this.props.handleUploadedImage} handleImage={this.handleImage} newImageUrl={this.state.boatImage} />
            //     </div>
            //     <form>
            //         <input type="number" name="boatSeatNum" onChange={this.handleChange} value={this.state.boatSeatNum} placeholder="Seats" />
            //         <input type="number" name="tubeSeatNum" onChange={this.handleChange} value={this.state.tubeSeatNum} placeholder="Tube Seats" />
            //         <button onClick={(e) => { this.createBoat(e) }}>Submit</button>
            //     </form>
            // </div>

            <div className="mainAppWindow">
                <section className="normalPageContainer">
                    <section className="profilePageWhiteBox" style={{height: "90%"}}>
                            <div className="profilePageContentCont" style={{visibility: !this.props.navMenuOpen?"visible":"hidden", width: "94%"}}>
                                <h2 className="profilePageH2" style={{justifyContent: "center", alignItems: "center"}}>BOAT REGISTRATION</h2>
                                <div>
                                    <UploadImage action={this.props.handleUploadedImage} handleImage={this.handleImage} newImageUrl={this.state.driverImage} />
                                </div>
                                <div className="ui labeled input labeledInputBox" style={{width: "100%", marginTop: "20%"}}>
                                    <div className="ui blue label">Boat Name</div>
                                    <input onChange={this.handleChange} type="text" name="boatName" value={this.state.boatName} placeholder="SS Buttercup"/>
                                </div>
                                <div className="ui labeled input labeledInputBox" style={{width: "100%"}}>
                                    <div className="ui blue label">Boat Description</div>
                                    <input onChange={this.handleChange} type="text" name="boatDescription" value={this.state.boatDescription} placeholder="A fast vehicle, with a striking paint job."/>
                                </div>
                                <div className="rowContainerSpaceBetween">
                                    <Select className="ui search dropdown dropdownBoxContainer" placeholder="Tier" label="tierId" options={tierIdOptions} onChange={this.handleDropDownChange}></Select>
                                </div>
                                <div className="ui labeled input labeledInputBox" style={{width: "100%"}}>
                                    <div className="ui blue label">Boat License</div>
                                    <input onChange={this.handleChange} type="text" name="boatLicense" value={this.state.boatLicense} placeholder="Boat License Number"/>
                                </div>
                                <div className="ui labeled input labeledInputBox" style={{width: "100%"}}>
                                    <div className="ui blue label">Boat Registration</div>
                                    <input onChange={this.handleChange} type="text" name="boatRegistration" value={this.state.boatRegistration} placeholder="Registration Number"/>
                                </div>
                                <div className="ui labeled input labeledInputBox" style={{width: "100%"}}>
                                    <div className="ui blue label">Boat Make</div>
                                    <input onChange={this.handleChange} type="text" name="boatMake" value={this.state.boatMake} placeholder="Mastercraft"/>
                                </div>
                                <div className="ui labeled input labeledInputBox" style={{width: "100%"}}>
                                    <div className="ui blue label">Boat Model</div>
                                    <input onChange={this.handleChange} type="text" name="boatModel" value={this.state.boatModel} placeholder="XT"/>
                                </div>
                                <div className="ui labeled input labeledInputBox" style={{width: "100%"}}>
                                    <div className="ui blue label">Boat Seats</div>
                                    <input onChange={this.handleChange} type="number" name="boatSeatNum" value={this.state.boatSeatNum} placeholder="4"/>
                                </div>
                                <div className="ui labeled input labeledInputBox" style={{width: "100%"}}>
                                    <div className="ui blue label">Tube Seats</div>
                                    <input onChange={this.handleChange} type="number" name="tubeSeatNum" value={this.state.tubeSeatNum} placeholder="2"/>
                                </div>
                                
                                
                                <div>
                                    <button className="ui inverted blue button" onClick={this.createBoat}>SUBMIT</button> 
                                </div>
                            </div>
                    </section>
                </section>        
            </div>
        );
    };
}

function mapStateToProps(state) {
    return state.user
}

export default connect(mapStateToProps, { createBoat })(withRouter(BoatRegistrationForm));
