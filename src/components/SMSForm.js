import React, {Component} from 'react'

class SMSForm extends Component {
    constructor(props) {
        super()
        this.state = {
            message: {
                to: '',
                body: ''
            },
            error: false,
            submitting: false,   
        }
    }

    // componentDidUpdate(prevProps) {
    //     console.log()
    //     if(prevProps !== this.props) {
    //         console.log('these are the current props:', this.props)
    //         const { request_date, request_location, request_phone, rider_first_name}= this.props
            
    //         this.setState({
    //            message: {...this.state.message, body: `Hi, ${rider_first_name}, 
    //            A driver has accepted your request for a ride on ${request_date} at ${request_location}.  Login to AquaShare to see the details of this ride in the 'Upcoming Rides' section.  (Do not reply to this text).`, 
    //            to: `1${requester_cell_number}`}
    //         })
    //     }
    // }
    
    onHandleChange= (event) => {
        const name = event.target.getAttribute('name');
        this.setState({
          message: { ...this.state.message, [name]: event.target.value }
        });
        
      }


      onSubmit = (event) => {
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
              this.setState({
                error: false,
                submitting: false,
                message: {
                  to: '',
                  body: ''
                }
              })
              alert("Text sent successfully! ")
            //   return this.props.closeModal
            } else {
              this.setState({
                error: true,
                submitting: false
              });
            }
          });
      }
   
    render() {
        
        return (
            <form>
            <div>
              <label htmlFor="to">To:</label>
              <input
                type="tel"
                name="to"
                id="to"
                value={this.state.message.to}
                onChange={this.onHandleChange}
              />
            </div>
            <div>
              <label htmlFor="body">Body:</label>
              <textarea
                name="body"
                id="body"
                value={this.state.message.body}
                onChange={this.onHandleChange}
              />
            </div>
            <button onClick={this.onSubmit}>Accept Request and Send Notification</button>
          </form>
        );
      }
}



export default SMSForm