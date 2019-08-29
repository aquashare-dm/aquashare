import React, {Component} from 'react'
import { connect } from "react-redux"
import axios from 'axios'
import { requestAccepted } from '../redux/requestReducer'

class SMSForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            message: {
                to: `1${props.requester_cell_number}`,
                body: `Hi, ${props.rider_first_name}, A driver has accepted your request for a ride on ${props.request_date} at ${props.request_location}.  Login to AquaShare to see the details of this ride in the 'Upcoming Rides' section.  (Do not reply to this text).`
            },
            error: false,
            submitting: false, 
            show: false  
        }
    }

    componentDidUpdate(prevProps) {
        if(prevProps !== this.props) {
            this.render()
        }
    }
    
    onHandleChange= (event) => {
        const name = event.target.getAttribute('name');
        this.setState({
          message: { ...this.state.message, [name]: event.target.value }
        });
      }


      onSubmit = (event) => {
        let { request_id } = this.props
        event.preventDefault();
        this.setState({ submitting: true });
        fetch('/api/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.state.message)
        })
          .then(res => res.json())
          .then(data => {
            if (data.success) {
              alert("Text sent successfully! ")
            //   return this.props.closeModal
            } else {
              this.setState({
                error: true,
                submitting: false
              });
            }
          })
          // this.notify()
          // alert("Text sent successfully! ")
          //   return this.props.closeModal
        this.props.requestAccepted(this.props.request_id)
      }

    handleShow=()=> {
        this.setState({show: !this.state.show})   
    }
   
    render() {
      return (
        <div>
          <form 
            onSubmit={this.onSubmit}
            className={this.state.err? 'err sms-form': 'sms-form'}
          >
            <button
                type="submit"
                disabled={this.state.submitting}
            >Accept Request and Send Notification
            </button>
          </form>
        </div>
      );
    }
}

function mapStateToProps(state){
  return state
}

export default connect(mapStateToProps, { requestAccepted })(SMSForm)