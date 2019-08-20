import React from 'react';
import ReactDOM from 'react-dom';


export class CurrentLocation extends React.Component {
  constructor(props) {
    super(props);

    let { lat, lng } = this.props.initialCenter;

    //Check if map coords need to be overwritten
    if(this.props.centerAroundDataBaseLocation){
      lat = this.props.lat;
      lng = this.props.lng;
    }

    this.state = {
      currentLocation: {
        lat: lat,
        lng: lng
      },
      map:{
        position: 'absolute',
        width: this.props.width,
        height: this.props.height
      },
      showMarker: false
    };
    


  }
  componentDidMount() {

    if (this.props.centerAroundCurrentLocation) {
      if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
          const coords = pos.coords;
          this.setState({
            currentLocation: {
              lat: coords.latitude,
              lng: coords.longitude
            }
          });
        });
      }
    }
    if(this.props.centerAroundDataBaseLocation){
      this.setState({showMarker: true});
    }
   
    this.loadMap();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
    if(prevProps.lat !== this.props.lat){
        this.setState({
            currentLocation: {lat: this.props.lat, lng: this.props.lng},
            showMarker: true
        })
    }
    if (prevState.currentLocation !== this.state.currentLocation) {
      this.recenterMap();
    }
  }

  loadMap() {
    if (this.props && this.props.google) {
      // checks if google is available
      const { google } = this.props;
      const maps = google.maps;

      const mapRef = this.refs.map;

      // reference to the actual DOM element
      const node = ReactDOM.findDOMNode(mapRef);

      let { zoom } = this.props;
      const { lat, lng } = this.state.currentLocation;
      const center = new maps.LatLng(lat, lng);
      const mapConfig = Object.assign(
        {},
        {
          center: center,
          zoom: zoom
        }
      );
      // maps.Map() is constructor that instantiates the map
      this.map = new maps.Map(node, mapConfig);
    }
  }

  recenterMap() {
    const map = this.map;
    const current = this.state.currentLocation;

    const google = this.props.google;
    const maps = google.maps;

    if (map) {
      let center = new maps.LatLng(current.lat, current.lng);
      map.panTo(center);
    }
  }

  renderChildren() {
    const { children } = this.props;
    if (!children) return;

    return React.Children.map(children, c => {
      if (!c && !this.state.showMarker) return;
      return React.cloneElement(c, {
        map: this.map,
        google: this.props.google,
        mapCenter: this.state.currentLocation
      });
    });
  }

  render() {
    const style = Object.assign({}, this.state.map);

    return (
      <div>
        <div style={style} ref="map">
          Loading map...
        </div>
        {this.renderChildren()}
      </div>
    );
  }
}
export default CurrentLocation;

CurrentLocation.defaultProps = {
  zoom: 14,
  initialCenter: {
    lat: 34,
    lng: -118
  },
  centerAroundCurrentLocation: false,
  visible: true
};