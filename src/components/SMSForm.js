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
            show: false  
        }
    }

    componentDidUpdate(prevProps) {
        console.log()
        if(prevProps !== this.props) {
            console.log('these are the current props:', this.props)
            const { request_date, request_location, requester_cell_number, rider_first_name}= this.props
            
            this.setState({
               message: {...this.state.message, body: `Hi, ${rider_first_name}, 
               A driver has accepted your request for a ride on ${request_date} at ${request_location}.  Login to AquaShare to see the details of this ride in the 'Upcoming Rides' section.  (Do not reply to this text).`, 
               to: `1${requester_cell_number}`}
            })
        }
    }
    
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

      handleShow=()=> {
        this.setState({show: !this.state.show})   
    }
   
    render() {
      console.log('to', this.state.message.to)
      console.log('sendtexts', this.props)
      const {show} = this.state
      const {request_first_name, request_date, request_location, requester_cell_number}= this.props
      
      console.log(request_first_name, request_date, request_location, requester_cell_number)
      return (
        <div>
            {show ? (
        <form 
          onSubmit={this.onSubmit}
          className={this.state.err? 'err sms-form': 'sms-form'}
        >
          <div >
            
            <label htmlFor="to">To:</label>
            <input 
               type="tel"
               name="to"
               id="to"
               value={requester_cell_number}
               onChange={this.onHandleChange}
            />
          
          <div>
            <label htmlFor="body">Body:</label><br/>
            <textarea name="body" id="body"
              value={this.state.message.body}
              onChange={this.onHandleChange}
              
            ></textarea>
          </div>
          </div>
          <button 
              
              type="submit"
              disabled={this.state.submitting}
          >Accept Request and Send Notification
          </button>
        </form>
            ): (
              <button onClick={() => this.handleShow()}>Accept Request</button>    
            )}
        </div>
        );
      }
}



export default SMSForm